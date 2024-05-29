package com.badminton.greetingdemo.exception;

import lombok.Data;

@Data
public class CustomErrorResponse {
    private long timestamp;
    private int status;
    private String error;
    private String message;

    // Getters and setters...
}

