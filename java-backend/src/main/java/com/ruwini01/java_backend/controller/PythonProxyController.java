package com.ruwini01.java_backend.controller;

import com.ruwini01.java_backend.dto.CodeRequest;
import com.ruwini01.java_backend.service.PythonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/code")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PythonProxyController {

    private final PythonService pythonService;

    @PostMapping("/analyze")
    public ResponseEntity<Object> analyze(@RequestBody CodeRequest request) {
        try {
            Object result = pythonService.analyzeCode(request.getLanguage(), request.getCode());
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                new ErrorResponse("Failed to analyze code: " + e.getMessage())
            );
        }
    }

    @PostMapping("/fix")
    public ResponseEntity<Object> fix(@RequestBody CodeRequest request) {
        try {
            Object result = pythonService.fixCode(request.getLanguage(), request.getCode());
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                new ErrorResponse("Failed to fix code: " + e.getMessage())
            );
        }
    }

    // Inner class for error responses
    @lombok.Data
    @lombok.AllArgsConstructor
    public static class ErrorResponse {
        private String error;
    }
}