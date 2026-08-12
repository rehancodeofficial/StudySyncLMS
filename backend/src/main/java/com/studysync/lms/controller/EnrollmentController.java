package com.studysync.lms.controller;

import com.studysync.lms.domain.Enrollment;
import com.studysync.lms.repository.EnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {
    @Autowired EnrollmentRepository enrollmentRepository;

    @GetMapping("/student/{studentId}")
    @PreAuthorize("hasRole('STUDENT') or hasRole('ADMIN')")
    public List<Enrollment> getStudentEnrollments(@PathVariable Long studentId) {
        return enrollmentRepository.findByStudentId(studentId);
    }

    @PostMapping
    @PreAuthorize("hasRole('STUDENT') or hasRole('ADMIN')")
    public Enrollment enroll(@RequestBody Enrollment enrollment) {
        return enrollmentRepository.save(enrollment);
    }
}
