package com.ticketflow.dto;

import com.ticketflow.entity.Priority;
import com.ticketflow.entity.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TicketUpdateRequest {
    private String title;
    private String description;
    private Long categoryId;
    private Priority priority;
    private Status status;
    private Long assignedToId;
}
