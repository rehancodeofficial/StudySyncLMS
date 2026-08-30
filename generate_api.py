import os

BASE_DIR = "backend/src/main/java/com/studysync/lms"

def write_file(path, content):
    full_path = os.path.join(BASE_DIR, path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w") as f:
        f.write(content.strip() + "\n")

write_file("controller/CourseController.java", """
package com.studysync.lms.controller;

import com.studysync.lms.domain.Course;
import com.studysync.lms.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/courses")
public class CourseController {
    @Autowired CourseRepository courseRepository;

    @GetMapping
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR')")
    public Course createCourse(@RequestBody Course course) {
        return courseRepository.save(course);
    }
}
""")

write_file("controller/EnrollmentController.java", """
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
""")

print("Generated API controllers")
