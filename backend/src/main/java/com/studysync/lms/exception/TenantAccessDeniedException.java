package com.studysync.lms.exception;

public class TenantAccessDeniedException extends RuntimeException {
    public TenantAccessDeniedException() {
        super("You do not have permission to access this organization's data");
    }
    public TenantAccessDeniedException(String message) {
        super(message);
    }
}
