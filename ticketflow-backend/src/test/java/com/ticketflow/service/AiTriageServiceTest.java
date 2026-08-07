package com.ticketflow.service;

import com.ticketflow.dto.AiTriageResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class AiTriageServiceTest {

    private AiTriageService aiTriageService;

    @BeforeEach
    void setUp() {
        aiTriageService = new AiTriageService();
    }

    @Test
    void triageTicket_WithoutApiKey_ReturnsNullGracefully() {
        AiTriageResponse response = aiTriageService.triageTicket(
                "Cannot access VPN",
                "Connection timeout when connecting to corporate VPN",
                List.of("Network & VPN", "Software & Applications")
        );

        // When no API key is set, it logs a warning and returns null without crashing ticket creation
        assertNull(response);
    }
}
