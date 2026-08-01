# 🎓 StudySync LMS — Learning Management System (Academic Project)

**Stack:** Java 21, Spring Boot, Spring Security, Spring Data JPA, Hibernate, PostgreSQL, Redis, React, Docker

## 🚀 Key Features

* Built a Spring Boot REST API supporting course management, enrollments, assignments, assessments, and student progress.
* Implemented role-based access for administrators, instructors, and students using Spring Security and JWT authentication.
* Designed PostgreSQL persistence with Spring Data JPA/Hibernate and built the React frontend around the backend API.
* Containerized the application architecture with Docker.

## 🛠️ Technology Stack

StudySync is designed as a highly scalable modern web application using a decoupled monorepo approach.

### Frontend

* **Core:** React 18, TypeScript, Vite
* **Styling:** Tailwind CSS v4 (Custom brand palette & semantic design system)
* **Routing:** React Router v6
* **State & Data Fetching:** TanStack Query (React Query), Axios
* **Forms & Validation:** React Hook Form, Zod
* **UI & Visualization:** Recharts, Lucide React icons

### Backend

* **Core:** Node.js, Express.js, TypeScript
* **Database ORM:** Prisma
* **Database Engine:** PostgreSQL (Supabase / Local)
* **Security:** bcryptjs, jsonwebtoken (JWT), CORS

---

## 📂 Project Structure

```text
StudySync/
├── frontend/                 # Vite + React + TS Application
│   ├── src/
│   │   ├── api/              # Axios client and API utilities
│   │   ├── components/       # Reusable UI elements (Buttons, DataTables, Cards)
│   │   ├── hooks/            # Custom React hooks (e.g., useAuth)
│   │   ├── layouts/          # Role-based AppShell layouts (Admin, Teacher, Student)
│   │   ├── pages/            # 35+ Route components organized by domain
│   │   ├── types/            # Global TypeScript definitions
│   │   └── utils/            # Shared utility functions (auth, formatting)
│   └── index.html    
│
└── backend/                  # Node + Express + TS API
    ├── prisma/               # Prisma schema and migrations
    ├── src/
    │   ├── config/           # Environment and DB config
    │   ├── controllers/      # Route logic handlers
    │   ├── middleware/       # Auth, RBAC, and error handlers
    │   ├── routes/           # Express router definitions
    │   └── services/         # Core business logic
    └── package.json
```


## 🎨 Design System

StudySync utilizes a premium, custom Tailwind CSS configuration designed to feel like a modern, high-end commercial SaaS product. The palette features Deep Navy (`#0B1F3A`), Royal Blue (`#155EEF`), and Soft Slate for a clean, data-dense, yet approachable aesthetic. All components emphasize clear typography, subtle shadows, and distinct visual hierarchies.

## 📄 License

StudySync is proprietary software. All rights reserved.
