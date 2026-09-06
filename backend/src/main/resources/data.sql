-- ============================================================
-- StudySync LMS — Seed Data
-- Realistic multi-tenant development data
-- ============================================================

-- Roles (SaaS roles)
INSERT INTO roles (name) VALUES ('ROLE_SUPER_ADMIN') ON CONFLICT DO NOTHING;
INSERT INTO roles (name) VALUES ('ROLE_ORG_ADMIN') ON CONFLICT DO NOTHING;
INSERT INTO roles (name) VALUES ('ROLE_INSTRUCTOR') ON CONFLICT DO NOTHING;
INSERT INTO roles (name) VALUES ('ROLE_STUDENT') ON CONFLICT DO NOTHING;

-- ============================================================
-- PLATFORM SUPER ADMIN (no organization)
-- Email: superadmin@studysync.com | Password: Admin@1234
-- ============================================================
INSERT INTO users (name, email, password, active, created_at, updated_at)
VALUES ('Platform Super Admin', 'superadmin@studysync.com',
        '$2a$10$GbmqIj6JaxzJVMdmJYqFg.MbBqHUXEcbVANzFIy4MNRHWLEIJkLUW',
        true, NOW(), NOW())
ON CONFLICT DO NOTHING;

INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id FROM users u, roles r
WHERE u.email = 'superadmin@studysync.com' AND r.name = 'ROLE_SUPER_ADMIN'
ON CONFLICT DO NOTHING;

-- ============================================================
-- ORGANIZATION 1: Harvard Demo University
-- ============================================================
INSERT INTO organizations (name, slug, email, phone, address, website, description, status, subscription_plan,
                            student_limit, instructor_limit, course_limit, created_at, updated_at)
VALUES ('Harvard Demo University', 'harvard-demo', 'admin@harvard-demo.edu', '+1-617-495-1000',
        'Cambridge, MA 02138, United States', 'https://harvard-demo.edu',
        'A world-class research university offering excellence in education.',
        'ACTIVE', 'ENTERPRISE', 10000, 500, 1000, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Org 1 Admin (Email: admin@harvard-demo.edu | Password: Admin@1234)
INSERT INTO users (name, email, password, active, organization_id, created_at, updated_at)
SELECT 'Dr. Sarah Mitchell', 'admin@harvard-demo.edu',
       '$2a$10$GbmqIj6JaxzJVMdmJYqFg.MbBqHUXEcbVANzFIy4MNRHWLEIJkLUW',
       true, o.id, NOW(), NOW()
FROM organizations o WHERE o.slug = 'harvard-demo'
ON CONFLICT DO NOTHING;

INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id FROM users u, roles r
WHERE u.email = 'admin@harvard-demo.edu' AND r.name = 'ROLE_ORG_ADMIN'
ON CONFLICT DO NOTHING;

-- Org 1 Instructor 1 (Email: instructor1@harvard-demo.edu | Password: Admin@1234)
INSERT INTO users (name, email, password, active, organization_id, created_at, updated_at)
SELECT 'Prof. James Carter', 'instructor1@harvard-demo.edu',
       '$2a$10$GbmqIj6JaxzJVMdmJYqFg.MbBqHUXEcbVANzFIy4MNRHWLEIJkLUW',
       true, o.id, NOW(), NOW()
FROM organizations o WHERE o.slug = 'harvard-demo'
ON CONFLICT DO NOTHING;

INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id FROM users u, roles r
WHERE u.email = 'instructor1@harvard-demo.edu' AND r.name = 'ROLE_INSTRUCTOR'
ON CONFLICT DO NOTHING;

-- Org 1 Student 1 (Email: student1@harvard-demo.edu | Password: Admin@1234)
INSERT INTO users (name, email, password, active, organization_id, created_at, updated_at)
SELECT 'Alex Johnson', 'student1@harvard-demo.edu',
       '$2a$10$GbmqIj6JaxzJVMdmJYqFg.MbBqHUXEcbVANzFIy4MNRHWLEIJkLUW',
       true, o.id, NOW(), NOW()
FROM organizations o WHERE o.slug = 'harvard-demo'
ON CONFLICT DO NOTHING;

INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id FROM users u, roles r
WHERE u.email = 'student1@harvard-demo.edu' AND r.name = 'ROLE_STUDENT'
ON CONFLICT DO NOTHING;

-- ============================================================
-- ORGANIZATION 2: Karachi Academy
-- ============================================================
INSERT INTO organizations (name, slug, email, phone, address, website, description, status, subscription_plan,
                            student_limit, instructor_limit, course_limit, created_at, updated_at)
VALUES ('Karachi Academy', 'karachi-academy', 'admin@karachi-academy.edu', '+92-21-1234567',
        'Karachi, Sindh, Pakistan', 'https://karachi-academy.edu',
        'A premier educational institution in South Asia.',
        'ACTIVE', 'PRO', 2000, 100, 200, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Org 2 Admin (Email: admin@karachi-academy.edu | Password: Admin@1234)
INSERT INTO users (name, email, password, active, organization_id, created_at, updated_at)
SELECT 'Dr. Ahmed Khan', 'admin@karachi-academy.edu',
       '$2a$10$GbmqIj6JaxzJVMdmJYqFg.MbBqHUXEcbVANzFIy4MNRHWLEIJkLUW',
       true, o.id, NOW(), NOW()
FROM organizations o WHERE o.slug = 'karachi-academy'
ON CONFLICT DO NOTHING;

INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id FROM users u, roles r
WHERE u.email = 'admin@karachi-academy.edu' AND r.name = 'ROLE_ORG_ADMIN'
ON CONFLICT DO NOTHING;

-- Org 2 Instructor 1
INSERT INTO users (name, email, password, active, organization_id, created_at, updated_at)
SELECT 'Ms. Fatima Malik', 'instructor1@karachi-academy.edu',
       '$2a$10$GbmqIj6JaxzJVMdmJYqFg.MbBqHUXEcbVANzFIy4MNRHWLEIJkLUW',
       true, o.id, NOW(), NOW()
FROM organizations o WHERE o.slug = 'karachi-academy'
ON CONFLICT DO NOTHING;

INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id FROM users u, roles r
WHERE u.email = 'instructor1@karachi-academy.edu' AND r.name = 'ROLE_INSTRUCTOR'
ON CONFLICT DO NOTHING;

-- Org 2 Student 1
INSERT INTO users (name, email, password, active, organization_id, created_at, updated_at)
SELECT 'Usman Raza', 'student1@karachi-academy.edu',
       '$2a$10$GbmqIj6JaxzJVMdmJYqFg.MbBqHUXEcbVANzFIy4MNRHWLEIJkLUW',
       true, o.id, NOW(), NOW()
FROM organizations o WHERE o.slug = 'karachi-academy'
ON CONFLICT DO NOTHING;

INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id FROM users u, roles r
WHERE u.email = 'student1@karachi-academy.edu' AND r.name = 'ROLE_STUDENT'
ON CONFLICT DO NOTHING;

-- Departments for Harvard Demo
INSERT INTO departments (name, code, description, organization_id, created_at)
SELECT 'Computer Science', 'CS', 'Department of Computer Science & Engineering', o.id, NOW()
FROM organizations o WHERE o.slug = 'harvard-demo'
ON CONFLICT DO NOTHING;

INSERT INTO departments (name, code, description, organization_id, created_at)
SELECT 'Business Administration', 'BA', 'Department of Business & Economics', o.id, NOW()
FROM organizations o WHERE o.slug = 'harvard-demo'
ON CONFLICT DO NOTHING;

-- Departments for Karachi Academy
INSERT INTO departments (name, code, description, organization_id, created_at)
SELECT 'Software Engineering', 'SE', 'Department of Software Engineering', o.id, NOW()
FROM organizations o WHERE o.slug = 'karachi-academy'
ON CONFLICT DO NOTHING;

-- Courses for Harvard Demo
INSERT INTO courses (title, code, description, category, credits, capacity, status, organization_id, instructor_id, department_id, created_at, updated_at)
SELECT 'Advanced Database Systems', 'CS-501', 'Covers advanced concepts in relational and non-relational database systems, query optimization, and data modeling.',
       'Computer Science', 3, 50, 'PUBLISHED',
       o.id,
       (SELECT u.id FROM users u WHERE u.email = 'instructor1@harvard-demo.edu'),
       (SELECT d.id FROM departments d WHERE d.code = 'CS' AND d.organization_id = o.id),
       NOW(), NOW()
FROM organizations o WHERE o.slug = 'harvard-demo'
ON CONFLICT DO NOTHING;

INSERT INTO courses (title, code, description, category, credits, capacity, status, organization_id, instructor_id, department_id, created_at, updated_at)
SELECT 'Software Architecture Patterns', 'CS-602', 'Design patterns, microservices, event-driven architecture, and SOLID principles.',
       'Computer Science', 3, 40, 'PUBLISHED',
       o.id,
       (SELECT u.id FROM users u WHERE u.email = 'instructor1@harvard-demo.edu'),
       (SELECT d.id FROM departments d WHERE d.code = 'CS' AND d.organization_id = o.id),
       NOW(), NOW()
FROM organizations o WHERE o.slug = 'harvard-demo'
ON CONFLICT DO NOTHING;

-- Enroll student1 in both harvard courses
INSERT INTO enrollments (student_id, course_id, status, progress, enrolled_at)
SELECT
    (SELECT u.id FROM users u WHERE u.email = 'student1@harvard-demo.edu'),
    c.id,
    'ACTIVE', 0.0, NOW()
FROM courses c
WHERE c.code IN ('CS-501', 'CS-602')
  AND c.organization_id = (SELECT o.id FROM organizations o WHERE o.slug = 'harvard-demo')
ON CONFLICT DO NOTHING;
