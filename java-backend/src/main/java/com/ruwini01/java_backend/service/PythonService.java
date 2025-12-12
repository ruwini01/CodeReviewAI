package com.ruwini01.java_backend.service;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;
import java.util.Map;

@Service
public class PythonService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String PYTHON_BASE_URL = "http://localhost:8000";

    public Object analyzeCode(String language, String code) {
        String url = PYTHON_BASE_URL + "/api/analyze";
        return makeRequest(url, language, code);
    }

    public Object fixCode(String language, String code) {
        String url = PYTHON_BASE_URL + "/api/fix";
        return makeRequest(url, language, code);
    }

    private Object makeRequest(String url, String language, String code) {
        try {
            Map<String, String> requestBody = new HashMap<>();
            requestBody.put("language", language);
            requestBody.put("code", code);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestBody, headers);

            ResponseEntity<Object> response = restTemplate.postForEntity(url, entity, Object.class);
            return response.getBody();
        } catch (RestClientException e) {
            throw new RuntimeException("Failed to connect to Python service: " + e.getMessage(), e);
        }
    }
}