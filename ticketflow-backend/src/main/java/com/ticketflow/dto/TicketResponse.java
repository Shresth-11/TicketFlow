package com.ticketflow.dto;

import com.ticketflow.entity.Priority;
import com.ticketflow.entity.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TicketResponse {
    private Long id;
    private String title;
    private String description;
    private Status status;
    private Priority priority;
    private CategoryResponse category;
    private UserResponse createdBy;
    private UserResponse assignedTo;

    // AI Triage suggestions
    private Priority aiSuggestedPriority;
    private CategoryResponse aiSuggestedCategory;
    private String aiSuggestedResponse;

    private Instant createdAt;
    private Instant updatedAt;
}
