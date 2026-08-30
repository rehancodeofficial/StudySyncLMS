package com.studysync.lms.dto;
import jakarta.validation.constraints.*;
import lombok.Data;
import java.util.Set;
@Data public class SignupRequest {
    @NotBlank private String name;
    @NotBlank @Email private String email;
    private Set<String> roles;
    @NotBlank @Size(min = 6, max = 40) private String password;
}
