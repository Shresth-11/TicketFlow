package com.ticketflow.dto;

import com.ticketflow.entity.Priority;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AiTriageResponse {
    private Priority priority;
    private String categoryName;
    private String suggestedResponse;
}
