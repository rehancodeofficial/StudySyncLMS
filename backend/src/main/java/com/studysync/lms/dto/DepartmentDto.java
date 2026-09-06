package com.studysync.lms.dto;

import com.studysync.lms.domain.Department;
import lombok.Data;

@Data
public class DepartmentDto {
    private Long id;
    private String name;
    private String code;
    private String description;
    private Long organizationId;

    public static DepartmentDto from(Department d) {
        DepartmentDto dto = new DepartmentDto();
        dto.setId(d.getId());
        dto.setName(d.getName());
        dto.setCode(d.getCode());
        dto.setDescription(d.getDescription());
        if (d.getOrganization() != null) dto.setOrganizationId(d.getOrganization().getId());
        return dto;
    }
}
