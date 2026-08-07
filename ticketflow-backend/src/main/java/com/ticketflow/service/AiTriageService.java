package com.ticketflow.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ticketflow.dto.AiTriageResponse;
import com.ticketflow.entity.Priority;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class AiTriageService {

    @Value("${openai.api-key:${OPENAI_API_KEY:}}")
    private String openAiApiKey;

    @Value("${openai.model:gpt-4o-mini}")
    private String openAiModel;

    @Value("${gemini.api-key:${GEMINI_API_KEY:}}")
    private String geminiApiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Categorizes incoming support requests and drafts an initial reply.
     * Falls back safely to manual triage if no API key is provided or if network fails.
     */
    public AiTriageResponse triageTicket(String title, String description, List<String> availableCategories) {
        if (!StringUtils.hasText(openAiApiKey) && !StringUtils.hasText(geminiApiKey)) {
            log.info("LLM provider API key not configured. Skipping automated categorization.");
            return null;
        }

        try {
            if (StringUtils.hasText(openAiApiKey)) {
                return callOpenAiTriage(title, description, availableCategories);
            } else {
                return callGeminiTriage(title, description, availableCategories);
            }
        } catch (Exception e) {
            log.warn("Automated ticket categorization failed: {}. Continuing with manual queue routing.", e.getMessage());
            return null;
        }
    }

    private AiTriageResponse callOpenAiTriage(String title, String description, List<String> availableCategories) throws Exception {
        String categoriesListStr = String.join(", ", availableCategories);

        String systemPrompt = "Analyze the IT support request. Return JSON only with fields:\n" +
                "{\n" +
                "  \"priority\": \"LOW\" | \"MEDIUM\" | \"HIGH\" | \"CRITICAL\",\n" +
                "  \"categoryName\": \"<Must match one of: " + categoriesListStr + ">\",\n" +
                "  \"suggestedResponse\": \"<Helpful initial response for helpdesk agent>\"\n" +
                "}";

        String userPrompt = "Subject: " + title + "\nDescription: " + description;

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", openAiModel);
        requestBody.put("response_format", Map.of("type", "json_object"));
        requestBody.put("temperature", 0.2);

        List<Map<String, String>> messages = List.of(
                Map.of("role", "system", "content", systemPrompt),
                Map.of("role", "user", "content", userPrompt)
        );
        requestBody.put("messages", messages);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(openAiApiKey.trim());

        HttpEntity<String> entity = new HttpEntity<>(objectMapper.writeValueAsString(requestBody), headers);
        String url = "https://api.openai.com/v1/chat/completions";

        ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);

        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            JsonNode rootNode = objectMapper.readTree(response.getBody());
            String jsonContent = rootNode.path("choices").get(0).path("message").path("content").asText();
            return parseAiJsonResponse(jsonContent);
        }

        return null;
    }

    private AiTriageResponse callGeminiTriage(String title, String description, List<String> availableCategories) throws Exception {
        String categoriesListStr = String.join(", ", availableCategories);

        String prompt = "Categorize the IT ticket and return JSON only:\n" +
                "{\n" +
                "  \"priority\": \"LOW\" | \"MEDIUM\" | \"HIGH\" | \"CRITICAL\",\n" +
                "  \"categoryName\": \"<Must match one of: " + categoriesListStr + ">\",\n" +
                "  \"suggestedResponse\": \"<Initial draft response>\"\n" +
                "}\n\n" +
                "Subject: " + title + "\n" +
                "Details: " + description;

        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(Map.of("text", prompt)))
                )
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + geminiApiKey.trim();
        HttpEntity<String> entity = new HttpEntity<>(objectMapper.writeValueAsString(requestBody), headers);

        ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);

        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            JsonNode rootNode = objectMapper.readTree(response.getBody());
            String text = rootNode.path("candidates").get(0).path("content").path("parts").get(0).path("text").asText();
            if (text.contains("```json")) {
                text = text.substring(text.indexOf("```json") + 7);
                if (text.contains("```")) {
                    text = text.substring(0, text.indexOf("```"));
                }
            } else if (text.contains("```")) {
                text = text.substring(text.indexOf("```") + 3);
                if (text.contains("```")) {
                    text = text.substring(0, text.indexOf("```"));
                }
            }
            return parseAiJsonResponse(text.trim());
        }

        return null;
    }

    private AiTriageResponse parseAiJsonResponse(String jsonString) {
        try {
            JsonNode node = objectMapper.readTree(jsonString);
            String priorityStr = node.path("priority").asText("MEDIUM").toUpperCase();
            String categoryName = node.path("categoryName").asText(null);
            String suggestedResponse = node.path("suggestedResponse").asText(null);

            Priority priority;
            try {
                priority = Priority.valueOf(priorityStr);
            } catch (Exception e) {
                priority = Priority.MEDIUM;
            }

            return AiTriageResponse.builder()
                    .priority(priority)
                    .categoryName(categoryName)
                    .suggestedResponse(suggestedResponse)
                    .build();
        } catch (Exception e) {
            log.warn("Unable to parse automated response JSON: {}", jsonString);
            return null;
        }
    }
}
