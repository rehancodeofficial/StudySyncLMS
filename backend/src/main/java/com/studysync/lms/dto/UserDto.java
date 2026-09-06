package com.studysync.lms.dto;

import com.studysync.lms.domain.User;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private List<String> roles;
    private Long organizationId;
    private String organizationName;
    private Boolean active;
    private LocalDateTime createdAt;

    public static UserDto from(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setActive(user.getActive());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setRoles(user.getRoles().stream()
                .map(r -> r.getName().name())
                .collect(Collectors.toList()));
        if (user.getOrganization() != null) {
            dto.setOrganizationId(user.getOrganization().getId());
            dto.setOrganizationName(user.getOrganization().getName());
        }
        return dto;
    }
}
