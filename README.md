# TicketFlow

A full-stack IT service desk and support ticketing application built with Java 17 (Spring Boot 3) and React 18. Includes role-based access control, smart ticket triage suggestions, and a responsive retro UI.

Live Demo: [https://ticket-flow-woad.vercel.app](https://ticket-flow-woad.vercel.app)

---

## Features

- **Role-Based Workflows**: Separate views and permissions for Employees, Support Agents, and Admins.
- **Data Scoping & Security**: JPA query filtering ensures employees only see tickets they created.
- **Automated Triage Suggestions**: Evaluates incoming tickets to suggest urgency levels, categories, and initial responses using LLM APIs.
- **Linear-Style Inspector Drawer**: Side drawer for inspecting details, updating ticket status, and assigning agents.
- **Rate Limiting**: Built-in servlet filter to prevent API spamming on ticket submission endpoints.

---

## Tech Stack

- **Backend**: Java 17, Spring Boot 3.3, Spring Security 6, Spring Data JPA, H2 / PostgreSQL
- **Frontend**: React 18, Vite, TailwindCSS v4, Lucide Icons
- **Deployment**: Render (Backend), Vercel (Frontend)

---

## Test Accounts

| Role | Email | Password |
| :--- | :--- | :--- |
| **Employee** | `employee@ticketflow.com` | `TicketFlow2026!` |
| **Support Agent** | `agent@ticketflow.com` | `TicketFlow2026!` |
| **Administrator** | `admin@ticketflow.com` | `TicketFlow2026!` |

---

## Quick Start (Local Setup)

### Prerequisites
- JDK 17+
- Node.js 18+

### 1. Backend Setup
```bash
cd ticketflow-backend
./mvnw spring-boot:run
```
The API server runs at `http://localhost:8080`.

### 2. Frontend Setup
```bash
cd ticketflow-frontend
npm install
npm run dev
```
The React app runs at `http://localhost:5173`.
