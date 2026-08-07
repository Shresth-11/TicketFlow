package com.ticketflow.controller;

import com.ticketflow.dto.*;
import com.ticketflow.entity.Priority;
import com.ticketflow.entity.Status;
import com.ticketflow.entity.User;
import com.ticketflow.security.UserPrincipal;
import com.ticketflow.service.TicketService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tickets")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    @PostMapping
    public ResponseEntity<TicketResponse> createTicket(
            @Valid @RequestBody TicketCreateRequest request,
            @AuthenticationPrincipal UserPrincipal principal) {
        User currentUser = principal.getUser();
        TicketResponse response = ticketService.createTicket(request, currentUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<TicketResponse>> getTickets(
            @RequestParam(required = false) Status status,
            @RequestParam(required = false) Priority priority,
            @RequestParam(required = false) Long assignedToId,
            @RequestParam(required = false) Long categoryId,
            @AuthenticationPrincipal UserPrincipal principal) {
        User currentUser = principal.getUser();
        List<TicketResponse> tickets = ticketService.getTicketsForUser(currentUser, status, priority, assignedToId, categoryId);
        return ResponseEntity.ok(tickets);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TicketResponse> getTicketById(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal principal) {
        User currentUser = principal.getUser();
        TicketResponse ticket = ticketService.getTicketById(id, currentUser);
        return ResponseEntity.ok(ticket);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TicketResponse> updateTicket(
            @PathVariable Long id,
            @RequestBody TicketUpdateRequest request,
            @AuthenticationPrincipal UserPrincipal principal) {
        User currentUser = principal.getUser();
        TicketResponse updated = ticketService.updateTicket(id, request, currentUser);
        return ResponseEntity.ok(updated);
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('AGENT', 'ADMIN')")
    public ResponseEntity<TicketResponse> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody TicketStatusUpdateRequest request,
            @AuthenticationPrincipal UserPrincipal principal) {
        User currentUser = principal.getUser();
        TicketResponse updated = ticketService.updateTicketStatus(id, request.getStatus(), currentUser);
        return ResponseEntity.ok(updated);
    }

    @PatchMapping("/{id}/assign")
    @PreAuthorize("hasAnyRole('AGENT', 'ADMIN')")
    public ResponseEntity<TicketResponse> assignTicket(
            @PathVariable Long id,
            @Valid @RequestBody TicketAssignRequest request,
            @AuthenticationPrincipal UserPrincipal principal) {
        User currentUser = principal.getUser();
        TicketResponse updated = ticketService.assignTicket(id, request.getAssignedToUserId(), currentUser);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('AGENT', 'ADMIN')")
    public ResponseEntity<Void> deleteTicket(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal principal) {
        User currentUser = principal.getUser();
        ticketService.deleteTicket(id, currentUser);
        return ResponseEntity.noContent().build();
    }
}

