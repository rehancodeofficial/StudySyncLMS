-- Insert Roles
INSERT INTO roles (name) VALUES ('ROLE_ADMIN') ON CONFLICT DO NOTHING;
INSERT INTO roles (name) VALUES ('ROLE_INSTRUCTOR') ON CONFLICT DO NOTHING;
INSERT INTO roles (name) VALUES ('ROLE_STUDENT') ON CONFLICT DO NOTHING;

-- Insert Admin User (password is 'password123' bcrypt encoded)
INSERT INTO users (id, name, email, password) 
VALUES (1, 'System Admin', 'admin@studysync.com', '$2a$10$wY1yQ0z.5Rj9Y9C2K8u4Ou0sLz/Z1/N7rM3bF8q.z7tZ1aQk/D7hG') 
ON CONFLICT DO NOTHING;
INSERT INTO user_roles (user_id, role_id) VALUES (1, 1) ON CONFLICT DO NOTHING;

-- Insert Instructor User
INSERT INTO users (id, name, email, password) 
VALUES (2, 'Jane Smith', 'instructor@studysync.com', '$2a$10$wY1yQ0z.5Rj9Y9C2K8u4Ou0sLz/Z1/N7rM3bF8q.z7tZ1aQk/D7hG') 
ON CONFLICT DO NOTHING;
INSERT INTO user_roles (user_id, role_id) VALUES (2, 2) ON CONFLICT DO NOTHING;

-- Insert Student User
INSERT INTO users (id, name, email, password) 
VALUES (3, 'John Doe', 'student@studysync.com', '$2a$10$wY1yQ0z.5Rj9Y9C2K8u4Ou0sLz/Z1/N7rM3bF8q.z7tZ1aQk/D7hG') 
ON CONFLICT DO NOTHING;
INSERT INTO user_roles (user_id, role_id) VALUES (3, 3) ON CONFLICT DO NOTHING;

-- Insert sample courses
INSERT INTO courses (id, title, code, description, instructor_id, category, credits, status, created_date, updated_date)
VALUES (1, 'Introduction to Computer Science', 'CS101', 'Learn the basics of computer science and programming.', 2, 'Computer Science', 3, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

INSERT INTO courses (id, title, code, description, instructor_id, category, credits, status, created_date, updated_date)
VALUES (2, 'Data Structures and Algorithms', 'CS201', 'Advanced topics in data structures and algorithm analysis.', 2, 'Computer Science', 4, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

-- Reset sequence to avoid conflicts with manual insertions (if supported)
-- SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
-- SELECT setval('courses_id_seq', (SELECT MAX(id) FROM courses));
