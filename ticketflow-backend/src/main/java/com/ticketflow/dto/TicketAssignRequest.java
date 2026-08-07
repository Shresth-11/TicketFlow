package com.ticketflow.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TicketAssignRequest {
    private Long assignedToUserId; // Nullable to allow unassigning
}
