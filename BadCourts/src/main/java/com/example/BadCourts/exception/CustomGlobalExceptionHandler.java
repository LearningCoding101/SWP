package com.example.BadCourts.exception;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class CustomGlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(com.example.BadCourts.exception.ResourceNotFoundException.class)
    public ResponseEntity<com.example.BadCourts.exception.CustomErrorResponse> handleResourceNotFound(com.example.BadCourts.exception.ResourceNotFoundException ex) {
        com.example.BadCourts.exception.CustomErrorResponse errorResponse = new com.example.BadCourts.exception.CustomErrorResponse();
        errorResponse.setTimestamp(System.currentTimeMillis());
        errorResponse.setStatus(HttpStatus.NOT_FOUND.value());
        errorResponse.setError("Not Found");
        errorResponse.setMessage(ex.getMessage());

        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    // Other exception handlers...

}

