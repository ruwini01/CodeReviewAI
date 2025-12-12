package com.ruwini01.java_backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PythonService {

    private final RestTemplate restTemplate;
    
    @Value("${python.api.url}")
    private String pythonBaseUrl;

    public Object analyzeCode(String language, String code) {
        String url = pythonBaseUrl + "/api/analyze";
        return makeRequest(url, language, code);
    }

    public Object fixCode(String language, String code) {
        String url = pythonBaseUrl + "/api/fix";
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