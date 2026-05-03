package com.robinsonir.fittrack.exception;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.net.URI;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);
    private static final String ERROR_BASE_MESSAGE = "https://fit-track.api/errors/";


    @ApiResponse(responseCode = "404", description = "Resource not found")
    @ExceptionHandler(ResourceNotFoundException.class)
    public ProblemDetail handleNotFound(ResourceNotFoundException ex) {
        return problem(HttpStatus.NOT_FOUND, "Resource not found", ex.getMessage(), "not-found");

    }

    @ApiResponse(responseCode = "409", description = "Resource already exists")
    @ExceptionHandler(DuplicateResourceException.class)
    public ProblemDetail handleDuplicate(DuplicateResourceException ex) {
        return problem(HttpStatus.CONFLICT, "Resource already exists", ex.getMessage(), "conflict");
    }

    @ApiResponse(responseCode = "400", description = "Invalid request")
    @ExceptionHandler(RequestValidationException.class)
    public ProblemDetail handleBadRequest(RequestValidationException ex) {
        return problem(HttpStatus.BAD_REQUEST, "Invalid Request", ex.getMessage(), "bad-request");
    }

    @ApiResponse(responseCode = "400", description = "Validation failed")
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleBeanValidation(MethodArgumentNotValidException ex) {
        String detail = ex.getBindingResult().getFieldErrors().stream()
                .map(err -> err.getField() + ": " + err.getDefaultMessage())
                .collect(java.util.stream.Collectors.joining("; "));

        return problem(HttpStatus.BAD_REQUEST, "Validation Failed", detail, "validation");
    }

    @ApiResponse(responseCode = "404", description = "Endpoint not found")
    @ExceptionHandler(NoResourceFoundException.class)
    public ProblemDetail handleNotFound(NoResourceFoundException ex) {
        return problem(HttpStatus.NOT_FOUND, "Endpoint not found", ex.getResourcePath(), "no-endpoint");
    }

    @ApiResponse(responseCode = "401", description = "Unauthorized")
    @ExceptionHandler(AuthenticationException.class)
    public ProblemDetail handleAuth(AuthenticationException ex) {
        LOGGER.warn("Authentication failed", ex);
        return problem(HttpStatus.UNAUTHORIZED, "Unauthorized", ex.getMessage(), "unauthorized");
    }

    @ApiResponse(responseCode = "403", description = "Forbidden")
    @ExceptionHandler(AccessDeniedException.class)
    public ProblemDetail handleAccessDenied(AccessDeniedException ex) {
        LOGGER.warn("Forbidden", ex);
        return problem(HttpStatus.FORBIDDEN, "Forbidden", ex.getMessage(), "forbidden");
    }

    @ApiResponse(responseCode = "500", description = "Internal server error")
    @ExceptionHandler(FileUploadException.class)
    public ProblemDetail handleFileUploadException(FileUploadException ex) {
        return problem(HttpStatus.INTERNAL_SERVER_ERROR, "File Upload Failed", ex.getMessage(), "file-upload");
    }

    @ExceptionHandler(Exception.class)
    public ProblemDetail handleGeneric(Exception ex) {
        LOGGER.error("Unhandled exception", ex);
        return problem(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error", "An unexpected error occurred", "internal");
    }

    private ProblemDetail problem(HttpStatus status, String title, String detail, String typeSlug) {
        ProblemDetail pd = ProblemDetail.forStatusAndDetail(status, detail);
        pd.setTitle(title);
        pd.setType(URI.create(ERROR_BASE_MESSAGE + typeSlug));

        return pd;
    }
}
