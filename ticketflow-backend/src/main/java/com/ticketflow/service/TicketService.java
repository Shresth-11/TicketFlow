package com.ticketflow.service;

import com.ticketflow.dto.*;
import com.ticketflow.entity.*;
import com.ticketflow.exception.ResourceNotFoundException;
import com.ticketflow.exception.UnauthorizedAccessException;
import com.ticketflow.repository.TicketRepository;
import com.ticketflow.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
    private final CategoryService categoryService;
    private final UserRepository userRepository;
    private final AiTriageService aiTriageService;

    @Transactional
    public TicketResponse createTicket(TicketCreateRequest request, User currentUser) {
        Category category = categoryService.getCategoryEntityById(request.getCategoryId());
        Priority initialPriority = request.getPriority() != null ? request.getPriority() : Priority.MEDIUM;

        Ticket ticket = Ticket.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .status(Status.OPEN)
                .priority(initialPriority)
                .category(category)
                .createdBy(currentUser)
                .build();

        // Run automated categorization fallback wrapper
        try {
            List<CategoryResponse> categories = categoryService.getAllCategories();
            List<String> categoryNames = categories.stream().map(CategoryResponse::getName).toList();

            AiTriageResponse aiTriage = aiTriageService.triageTicket(
                    request.getTitle(),
                    request.getDescription(),
                    categoryNames
            );

            if (aiTriage != null) {
                ticket.setAiSuggestedPriority(aiTriage.getPriority());
                ticket.setAiSuggestedResponse(aiTriage.getSuggestedResponse());

                if (request.getPriority() == null && aiTriage.getPriority() != null) {
                    ticket.setPriority(aiTriage.getPriority());
                }

                if (aiTriage.getCategoryName() != null) {
                    categories.stream()
                            .filter(c -> c.getName().equalsIgnoreCase(aiTriage.getCategoryName()))
                            .findFirst()
                            .ifPresent(matchedCategory -> {
                                Category aiCat = categoryService.getCategoryEntityById(matchedCategory.getId());
                                ticket.setAiSuggestedCategory(aiCat);
                            });
                }
            }
        } catch (Exception e) {
            // Ticket persistence remains safe if classification is unavailable
        }

        Ticket savedTicket = ticketRepository.save(ticket);
        return mapToResponse(savedTicket);
    }

    public List<TicketResponse> getTicketsForUser(User currentUser, Status status, Priority priority, Long assignedToId, Long categoryId) {
        Long createdById = null;
        
        // Limit query scope to the requesting user if role is employee
        if (currentUser.getRole() == Role.EMPLOYEE) {
            createdById = currentUser.getId();
        }

        List<Ticket> tickets = ticketRepository.findWithFilters(createdById, status, priority, assignedToId, categoryId);
        return tickets.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public TicketResponse getTicketById(Long id, User currentUser) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found with ID: " + id));

        validateTicketAccess(ticket, currentUser);

        return mapToResponse(ticket);
    }

    @Transactional
    public TicketResponse updateTicketStatus(Long id, Status newStatus, User currentUser) {
        if (currentUser.getRole() == Role.EMPLOYEE) {
            throw new UnauthorizedAccessException("Employees are not authorized to update ticket status");
        }

        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found with ID: " + id));

        ticket.setStatus(newStatus);
        Ticket updated = ticketRepository.save(ticket);
        return mapToResponse(updated);
    }

    @Transactional
    public TicketResponse assignTicket(Long id, Long assignedToUserId, User currentUser) {
        if (currentUser.getRole() == Role.EMPLOYEE) {
            throw new UnauthorizedAccessException("Employees are not authorized to assign tickets");
        }

        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found with ID: " + id));

        if (assignedToUserId == null) {
            ticket.setAssignedTo(null);
        } else {
            User assignee = userRepository.findById(assignedToUserId)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + assignedToUserId));

            if (assignee.getRole() == Role.EMPLOYEE) {
                throw new UnauthorizedAccessException("Tickets can only be assigned to AGENT or ADMIN users");
            }

            ticket.setAssignedTo(assignee);
        }

        Ticket updated = ticketRepository.save(ticket);
        return mapToResponse(updated);
    }

    @Transactional
    public TicketResponse updateTicket(Long id, TicketUpdateRequest request, User currentUser) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found with ID: " + id));

        validateTicketAccess(ticket, currentUser);

        if (request.getTitle() != null && !request.getTitle().isBlank()) {
            ticket.setTitle(request.getTitle());
        }
        if (request.getDescription() != null && !request.getDescription().isBlank()) {
            ticket.setDescription(request.getDescription());
        }
        if (request.getCategoryId() != null) {
            Category category = categoryService.getCategoryEntityById(request.getCategoryId());
            ticket.setCategory(category);
        }
        if (request.getPriority() != null) {
            ticket.setPriority(request.getPriority());
        }

        if (currentUser.getRole() != Role.EMPLOYEE) {
            if (request.getStatus() != null) {
                ticket.setStatus(request.getStatus());
            }
            if (request.getAssignedToId() != null) {
                User assignee = userRepository.findById(request.getAssignedToId())
                        .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + request.getAssignedToId()));
                ticket.setAssignedTo(assignee);
            }
        }

        Ticket updated = ticketRepository.save(ticket);
        return mapToResponse(updated);
    }

    @Transactional
    public void deleteTicket(Long id, User currentUser) {
        if (currentUser.getRole() == Role.EMPLOYEE) {
            throw new UnauthorizedAccessException("Employees are not authorized to delete tickets");
        }

        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found with ID: " + id));

        ticketRepository.delete(ticket);
    }

    public Ticket getTicketEntityById(Long id) {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found with ID: " + id));
    }

    @Transactional
    public void saveTicketEntity(Ticket ticket) {
        ticketRepository.save(ticket);
    }

    private void validateTicketAccess(Ticket ticket, User currentUser) {
        if (currentUser.getRole() == Role.EMPLOYEE && !ticket.getCreatedBy().getId().equals(currentUser.getId())) {
            throw new UnauthorizedAccessException("You are not authorized to view or modify this ticket");
        }
    }

    public TicketResponse mapToResponse(Ticket ticket) {
        if (ticket == null) return null;

        UserResponse createdBy = UserResponse.builder()
                .id(ticket.getCreatedBy().getId())
                .email(ticket.getCreatedBy().getEmail())
                .fullName(ticket.getCreatedBy().getFullName())
                .role(ticket.getCreatedBy().getRole())
                .build();

        UserResponse assignedTo = ticket.getAssignedTo() != null ? UserResponse.builder()
                .id(ticket.getAssignedTo().getId())
                .email(ticket.getAssignedTo().getEmail())
                .fullName(ticket.getAssignedTo().getFullName())
                .role(ticket.getAssignedTo().getRole())
                .build() : null;

        return TicketResponse.builder()
                .id(ticket.getId())
                .title(ticket.getTitle())
                .description(ticket.getDescription())
                .status(ticket.getStatus())
                .priority(ticket.getPriority())
                .category(categoryService.mapToResponse(ticket.getCategory()))
                .createdBy(createdBy)
                .assignedTo(assignedTo)
                .aiSuggestedPriority(ticket.getAiSuggestedPriority())
                .aiSuggestedCategory(categoryService.mapToResponse(ticket.getAiSuggestedCategory()))
                .aiSuggestedResponse(ticket.getAiSuggestedResponse())
                .createdAt(ticket.getCreatedAt())
                .updatedAt(ticket.getUpdatedAt())
                .build();
    }
}
