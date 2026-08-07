# TicketFlow — Enterprise IT Service Desk Platform

TicketFlow is a full-stack, enterprise-grade IT Service Desk & Support Ticketing Platform built with **Java 17 (Spring Boot 3)**, **React 18 (Vite + TailwindCSS v4)**, **PostgreSQL / H2**, and **OpenAI GPT-4o / Gemini API** for automated ticket triage.

Designed with a clean, professional **Zendesk / Linear Service Desk aesthetic** featuring **strict IDOR security controls**, **stateless JWT authentication**, **rate limiting**, and **slide-over drawer detail inspection**.

---

## 📐 System Architecture

```
                  ┌─────────────────────────────────────────┐
                  │      React 18 Service Desk Portal       │
                  │   TailwindCSS v4 + Axios + JWT Auth     │
                  └────────────────────┬────────────────────┘
                                       │ HTTP / REST API (Bearer JWT)
                                       ▼
                  ┌─────────────────────────────────────────┐
                  │    Spring Boot 3.3.x REST Backend API   │
                  │                                         │
                  │  ┌───────────────────────────────────┐  │
                  │  │  Spring Security + Rate Limiting   │  │
                  │  └─────────────────┬─────────────────┘  │
                  │                    │                    │
                  │  ┌─────────────────▼─────────────────┐  │
                  │  │   Ticket & Auth Service Layer     │  │
                  │  └────────┬──────────────────┬───────┘  │
                  └───────────┼──────────────────┼──────────┘
                              │                  │
           OpenAI / Gemini    │                  │  JPA Repository
            Structured JSON   ▼                  ▼  (H2 / PostgreSQL)
                 ┌──────────────────┐      ┌──────────────────┐
                 │ OpenAI / Gemini  │      │ PostgreSQL / H2  │
                 │ AI Triage Service│      │    Database      │
                 └──────────────────┘      └──────────────────┘
```

---

## ✨ Enterprise Product Highlights

### 🎨 1. Professional Human-Centric UI (Linear / Zendesk Aesthetic)
- **Slide-over Drawer**: Inspect ticket details, activity streams, and properties in a modern right-hand drawer.
- **Enterprise Service Desk Layout**: Clean typography, status indicators, reporter/assignee user avatars, and KPI metric cards.
- **Role-Aware Views**: Dedicated queues for Employees (`My Tickets`) vs Support Staff (`Staff Queue`).

### 🤖 2. Automated Smart Triage Engine
- **Priority & Department Classification**: Analyzes incoming tickets and suggests urgency (`Low`, `Medium`, `High`, `Critical`) and category (*Hardware*, *Software*, *Network*, *Access*).
- **Drafted Support Agent Responses**: Auto-generates polite, context-aware first responses that support agents can copy with 1 click.
- **Graceful Fallback**: Ticket creation **never fails** if the LLM API is unreachable or rate-limited.

### 🛡️ 3. Security & IDOR Prevention
- **IDOR Protection**: Data access restrictions are enforced at both JPA service query level and API level. Employees can strictly view and edit **only their own** submitted tickets.
- **Role-Based Authorization (RBAC)**: Fine-grained authority checks (`EMPLOYEE`, `AGENT`, `ADMIN`). Status updates and agent assignments are restricted to staff.
- **Stateless JWT Auth**: Signed JWT bearer tokens with BCrypt password encryption.
- **Rate Limiting**: Integrated `RateLimitingFilter` prevents ticket creation endpoint spamming.

---

## ⚡ Quick Start & Local Setup

### 1. Start Backend API (Spring Boot)
```powershell
cd ticketflow-backend

# Run Spring Boot (Starts at http://localhost:8080)
.\mvnw.cmd spring-boot:run
```

### 2. Start Frontend App (React / Vite)
```powershell
cd ticketflow-frontend

# Run Vite dev server (Starts at http://localhost:5173)
npm run dev
```

---

## ⚡ Demo Credentials

| Role | Email | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Employee** | `employee@ticketflow.com` | `TicketFlow2026!` | Create tickets, view & track own submitted tickets |
| **Support Agent** | `agent@ticketflow.com` | `TicketFlow2026!` | View all organization tickets, accept smart triage, assign agents, update status |
| **Administrator** | `admin@ticketflow.com` | `TicketFlow2026!` | Full system control and department management |


---

## 📄 License
MIT License. Built as a senior portfolio application.
