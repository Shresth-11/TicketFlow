package com.ticketflow.service;

import com.ticketflow.dto.CategoryResponse;
import com.ticketflow.dto.TicketCreateRequest;
import com.ticketflow.dto.TicketResponse;
import com.ticketflow.entity.*;
import com.ticketflow.exception.UnauthorizedAccessException;
import com.ticketflow.repository.TicketRepository;
import com.ticketflow.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TicketServiceTest {

    @Mock
    private TicketRepository ticketRepository;

    @Mock
    private CategoryService categoryService;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private TicketService ticketService;

    private User employeeUser;
    private User otherEmployeeUser;
    private User agentUser;
    private Category testCategory;
    private CategoryResponse testCategoryResponse;
    private Ticket testTicket;

    @BeforeEach
    void setUp() {
        employeeUser = User.builder()
                .id(1L)
                .email("john@company.com")
                .fullName("John Doe")
                .role(Role.EMPLOYEE)
                .build();

        otherEmployeeUser = User.builder()
                .id(2L)
                .email("jane@company.com")
                .fullName("Jane Smith")
                .role(Role.EMPLOYEE)
                .build();

        agentUser = User.builder()
                .id(3L)
                .email("agent@company.com")
                .fullName("Support Agent")
                .role(Role.AGENT)
                .build();

        testCategory = Category.builder()
                .id(10L)
                .name("IT Hardware")
                .description("Hardware issues")
                .build();

        testCategoryResponse = CategoryResponse.builder()
                .id(10L)
                .name("IT Hardware")
                .description("Hardware issues")
                .build();

        testTicket = Ticket.builder()
                .id(100L)
                .title("Monitor broken")
                .description("Screen flickers violently")
                .status(Status.OPEN)
                .priority(Priority.MEDIUM)
                .category(testCategory)
                .createdBy(employeeUser)
                .build();
    }

    @Test
    void createTicket_Success() {
        TicketCreateRequest request = TicketCreateRequest.builder()
                .title("Monitor broken")
                .description("Screen flickers violently")
                .categoryId(10L)
                .priority(Priority.MEDIUM)
                .build();

        when(categoryService.getCategoryEntityById(10L)).thenReturn(testCategory);
        when(ticketRepository.save(any(Ticket.class))).thenReturn(testTicket);
        when(categoryService.mapToResponse(testCategory)).thenReturn(testCategoryResponse);

        TicketResponse response = ticketService.createTicket(request, employeeUser);

        assertNotNull(response);
        assertEquals(100L, response.getId());
        assertEquals("Monitor broken", response.getTitle());
        assertEquals(Status.OPEN, response.getStatus());
        verify(ticketRepository, times(1)).save(any(Ticket.class));
    }

    @Test
    void getTicketById_EmployeeAccessOwnTicket_Success() {
        when(ticketRepository.findById(100L)).thenReturn(Optional.of(testTicket));
        when(categoryService.mapToResponse(testCategory)).thenReturn(testCategoryResponse);

        TicketResponse response = ticketService.getTicketById(100L, employeeUser);

        assertNotNull(response);
        assertEquals(100L, response.getId());
        assertEquals("john@company.com", response.getCreatedBy().getEmail());
    }

    @Test
    void getTicketById_EmployeeAccessOtherUserTicket_ThrowsUnauthorizedAccessException() {
        when(ticketRepository.findById(100L)).thenReturn(Optional.of(testTicket));

        // otherEmployeeUser trying to access employeeUser's ticket (IDOR attack vector)
        assertThrows(UnauthorizedAccessException.class, () -> {
            ticketService.getTicketById(100L, otherEmployeeUser);
        });
    }

    @Test
    void getTicketById_AgentAccessAnyTicket_Success() {
        when(ticketRepository.findById(100L)).thenReturn(Optional.of(testTicket));
        when(categoryService.mapToResponse(testCategory)).thenReturn(testCategoryResponse);

        TicketResponse response = ticketService.getTicketById(100L, agentUser);

        assertNotNull(response);
        assertEquals(100L, response.getId());
    }

    @Test
    void updateTicketStatus_AgentRole_Success() {
        when(ticketRepository.findById(100L)).thenReturn(Optional.of(testTicket));
        when(ticketRepository.save(any(Ticket.class))).thenReturn(testTicket);
        when(categoryService.mapToResponse(testCategory)).thenReturn(testCategoryResponse);

        TicketResponse response = ticketService.updateTicketStatus(100L, Status.IN_PROGRESS, agentUser);

        assertNotNull(response);
        assertEquals(Status.IN_PROGRESS, testTicket.getStatus());
        verify(ticketRepository, times(1)).save(testTicket);
    }

    @Test
    void updateTicketStatus_EmployeeRole_ThrowsUnauthorizedAccessException() {
        assertThrows(UnauthorizedAccessException.class, () -> {
            ticketService.updateTicketStatus(100L, Status.RESOLVED, employeeUser);
        });
        verify(ticketRepository, never()).save(any(Ticket.class));
    }

    @Test
    void deleteTicket_AgentRole_Success() {
        when(ticketRepository.findById(100L)).thenReturn(Optional.of(testTicket));
        doNothing().when(ticketRepository).delete(testTicket);

        ticketService.deleteTicket(100L, agentUser);

        verify(ticketRepository, times(1)).delete(testTicket);
    }

    @Test
    void deleteTicket_EmployeeRole_ThrowsUnauthorizedAccessException() {
        assertThrows(UnauthorizedAccessException.class, () -> {
            ticketService.deleteTicket(100L, employeeUser);
        });
        verify(ticketRepository, never()).delete(any(Ticket.class));
    }
}

