# ResolvIT — Enterprise IT Service Desk Platform

ResolvIT is a full-stack, enterprise-grade IT Service Desk & Support Ticketing Platform built with **Java 17 (Spring Boot 3)**, **React 18 (Vite + TailwindCSS v4)**, **PostgreSQL / H2**, and **OpenAI GPT-4o / Gemini API** for automated ticket triage.

Designed with a vintage 1984 **Macintosh / Editorial Neubrutalist aesthetic** featuring **strict IDOR security controls**, **stateless JWT authentication**, **rate limiting**, and **slide-over drawer detail inspection**.

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
                  │  │  OpenAI / Gemini Automated Triage │  │
                  │  └─────────────────┬─────────────────┘  │
                  │                    │                    │
                  │  ┌─────────────────▼─────────────────┐  │
                  │  │  Spring Data JPA + IDOR Security  │  │
                  │  └─────────────────┬─────────────────┘  │
                  └────────────────────┼────────────────────┘
                                       │
                                       ▼
                  ┌─────────────────────────────────────────┐
                  │     Database (H2 / PostgreSQL 15)       │
                  └─────────────────────────────────────────┘
```

---

## 🚀 Key Technical Features

1. **Stateless JWT Security Architecture**:
   - Secure authentication pipeline via Spring Security 6 with stateless session management.
   - JWT tokens signed with HMAC-SHA256 and 24-hour expiration window.

2. **OWASP IDOR Data Isolation**:
   - Explicit query-level scoping (`@Query("SELECT t FROM Ticket t WHERE t.createdBy.id = :userId")`) ensuring non-privileged employees can only access their own support requests.

3. **Rate Limiting & Threat Protection**:
   - Servlet filter enforcing sliding-window request limits (20 req/min for ticket creation) per client IP address.

4. **Multi-Model AI Triage Pipeline**:
   - Automated ticket categorization and urgency estimation using OpenAI `gpt-4o-mini` with fallback to Google Gemini `gemini-1.5-flash`.

5. **Linear / Macintosh Slide-Over Inspector**:
   - Right-side drawer for quick ticket inspection, status updates, agent assignment, and automated response drafting.

---

## 🔑 Pre-Seeded Demo Accounts

| Role | Email | Password | Access Scope |
| :--- | :--- | :--- | :--- |
| **Employee** | `employee@ticketflow.com` | `TicketFlow2026!` | Create tickets, view & track own submitted tickets |
| **Support Agent** | `agent@ticketflow.com` | `TicketFlow2026!` | View all organization tickets, accept smart triage, assign agents, update status |
| **Administrator** | `admin@ticketflow.com` | `TicketFlow2026!` | Full system control and department management |

---

## 🛠️ Technology Stack

- **Backend Framework**: Java 17, Spring Boot 3.3.4, Spring Security 6, Spring Data JPA
- **Frontend Framework**: React 18, Vite 5, TailwindCSS v4, Lucide React
- **Database**: H2 (In-memory for development/testing), PostgreSQL (Production ready)
- **AI Integrations**: OpenAI GPT-4o API, Google Gemini API
- **Deployment**: Render (Native Java Web Service), Vercel (SPA Frontend)
