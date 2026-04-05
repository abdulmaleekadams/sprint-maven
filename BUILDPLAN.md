# Sprint Maven — Complete Build Plan

Everything left to build, organized by priority and dependency order.

---

## Phase 1: Projects & Docs (Core New Features)

### 1A. Projects

Projects are the top-level container that groups boards, docs, and tasks under a single initiative. Think: "Mobile App Rewrite" or "Q3 Product Launch."

**Data model:**
```
Workspace
  └── Project
        ├── Boards (existing, add project_id FK)
        ├── Documents (new)
        ├── Tasks/Cards (existing, add project_id FK)
        ├── Milestones (new, for Gantt)
        └── Members (subset of workspace members)
```

**Database tables:**
```sql
-- projects: top-level container
projects (
    id TEXT PK,
    slug TEXT UNIQUE NOT NULL,
    workspace_id TEXT FK → workspaces,
    name TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'active',       -- active, on_hold, completed, archived
    color TEXT,                          -- hex for sidebar/badge
    icon TEXT,                           -- emoji or icon name
    start_date DATE,
    target_date DATE,
    owner_id TEXT FK → users,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
)

-- project_members: who has access to this project
project_members (
    id TEXT PK,
    project_id TEXT FK → projects,
    user_id TEXT FK → users,
    role TEXT DEFAULT 'member',         -- owner, admin, member, viewer
    joined_at TIMESTAMPTZ,
    UNIQUE(project_id, user_id)
)

-- milestones: key dates for Gantt chart
milestones (
    id TEXT PK,
    project_id TEXT FK → projects,
    title TEXT NOT NULL,
    description TEXT,
    due_date DATE NOT NULL,
    status TEXT DEFAULT 'pending',      -- pending, in_progress, completed
    color TEXT,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
)

-- Link existing entities to projects
ALTER TABLE boards ADD COLUMN project_id TEXT FK → projects;
ALTER TABLE cards ADD COLUMN project_id TEXT FK → projects;
```

**API endpoints (under /workspaces/{workspaceID}):**
```
POST   /projects                          → create project
GET    /projects                          → list projects
GET    /projects/{projectID}              → get project (with stats)
PATCH  /projects/{projectID}              → update project
DELETE /projects/{projectID}              → archive project
GET    /projects/{projectID}/boards       → boards in this project
GET    /projects/{projectID}/cards        → all cards across boards in project
GET    /projects/{projectID}/milestones   → milestones
POST   /projects/{projectID}/milestones   → create milestone
PATCH  /projects/{projectID}/milestones/{id} → update milestone
DELETE /projects/{projectID}/milestones/{id} → delete milestone
POST   /projects/{projectID}/members      → add member
DELETE /projects/{projectID}/members/{id} → remove member
GET    /projects/{projectID}/gantt        → Gantt data (milestones + cards with dates)
GET    /projects/{projectID}/stats        → progress stats
```

**Gantt chart data shape:**
```json
{
  "milestones": [
    { "id": "...", "title": "MVP Launch", "due_date": "2026-05-15", "status": "pending" }
  ],
  "cards": [
    {
      "id": "...", "title": "Auth flow", "start_date": "2026-04-01",
      "due_date": "2026-04-10", "status": "in_progress", "assignees": [...],
      "dependencies": ["card_id_1"],
      "board_name": "Sprint Board", "list_name": "In Progress"
    }
  ],
  "sprints": [
    { "id": "...", "name": "Sprint 4", "start_date": "...", "end_date": "..." }
  ]
}
```

**Frontend pages:**
- `/organization/{slug}/projects` — project list with cards (name, status, progress bar, member avatars, date range)
- `/organization/{slug}/projects/{projectSlug}` — project overview (boards, recent activity, stats, milestones)
- `/organization/{slug}/projects/{projectSlug}/gantt` — full Gantt chart
- `/organization/{slug}/projects/{projectSlug}/docs` — docs list
- Add "Projects" to sidebar nav

---

### 1B. Documents / Wiki

Full rich-text documents attached to workspaces or projects. Like Notion pages or ClickUp Docs.

**Data model:**
```sql
-- documents: rich text pages
documents (
    id TEXT PK,
    slug TEXT NOT NULL,
    workspace_id TEXT FK → workspaces,
    project_id TEXT FK → projects,       -- NULL = workspace-level doc
    parent_id TEXT FK → documents,       -- nested pages (tree structure)
    title TEXT NOT NULL,
    content JSONB,                       -- Plate JSON (same as card descriptions)
    content_markdown TEXT,               -- auto-generated markdown mirror
    icon TEXT,                           -- emoji
    cover_image TEXT,
    is_template BOOLEAN DEFAULT false,
    created_by TEXT FK → users,
    last_edited_by TEXT FK → users,
    published BOOLEAN DEFAULT false,     -- drafts vs published
    archived_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    UNIQUE(workspace_id, slug)
)

-- document_collaborators: who's currently editing (for presence)
document_collaborators (
    document_id TEXT FK → documents,
    user_id TEXT FK → users,
    last_seen_at TIMESTAMPTZ,
    PRIMARY KEY(document_id, user_id)
)
```

**Document content:**
- Stored as Plate JSON (same format as card descriptions — reuse the same editor)
- Also stored as auto-generated Markdown (`content_markdown`) for export/API access
- Supports: headings, bold/italic/underline/strikethrough/code, lists, links, blockquotes, code blocks, tables, images (via S3 upload), horizontal rules, callout blocks
- Nested pages (parent_id) for wiki-style tree navigation
- Templates (is_template) for reusable doc structures (Meeting Notes, PRD, Design Brief, etc.)

**API endpoints:**
```
# Workspace-level docs
GET    /workspaces/{wID}/documents                    → list docs (tree)
POST   /workspaces/{wID}/documents                    → create doc
GET    /workspaces/{wID}/documents/{docID}             → get doc
PATCH  /workspaces/{wID}/documents/{docID}             → update doc (title, content, etc.)
DELETE /workspaces/{wID}/documents/{docID}             → archive doc
POST   /workspaces/{wID}/documents/{docID}/duplicate   → duplicate doc

# Project-scoped docs
GET    /workspaces/{wID}/projects/{pID}/documents      → docs for project
POST   /workspaces/{wID}/projects/{pID}/documents      → create doc in project

# Export
GET    /workspaces/{wID}/documents/{docID}/markdown     → export as .md
GET    /workspaces/{wID}/documents/{docID}/html         → export as .html

# Presence
POST   /workspaces/{wID}/documents/{docID}/presence     → heartbeat (I'm viewing)
GET    /workspaces/{wID}/documents/{docID}/presence     → who's viewing
```

**Frontend pages:**
- `/organization/{slug}/docs` — doc tree sidebar + editor (Notion-style)
- `/organization/{slug}/projects/{projectSlug}/docs` — project-scoped docs
- Doc editor: full-page Plate editor (reuse existing components, add table, image, callout blocks)
- Doc sidebar: tree navigation with nested pages, drag-to-reorder
- Doc templates: PRD, Meeting Notes, Design Brief, Sprint Review, Architecture Decision Record

**Markdown support:**
- Paste markdown → auto-converts to Plate JSON
- Export button → downloads .md file
- API endpoint returns raw markdown
- content_markdown column auto-synced on save (server-side JSON→MD conversion)

---

### 1C. Gantt Chart (Project-level)

Not just a timeline view — a proper Gantt with:
- Cards as bars (start_date → due_date)
- Dependency arrows between cards
- Milestones as diamond markers
- Sprint ranges as background bands
- Drag to reschedule (updates due_date via API)
- Zoom: day / week / month / quarter
- Critical path highlighting

**Frontend component:** `/features/project/components/gantt-chart.tsx`
- Built with CSS grid (not a library — keeps it lightweight)
- Each row = card, each column = time unit
- Bars rendered as positioned divs within the grid
- Dependencies drawn as SVG lines between bars
- Milestones as diamond shapes on their due_date column

**Data source:** `GET /projects/{projectID}/gantt` returns cards with dates + dependencies + milestones + sprints

---

## Phase 2: Operational Readiness

### 2A. Tests
- **Backend:** Go table-driven tests for core flows — auth, card CRUD, sprint lifecycle, permission checks, billing guard, retro phases
- **Frontend:** Vitest + React Testing Library for critical components — card creation, filter logic, retro phase UI, description editor
- Target: 60%+ coverage on critical paths

### 2B. CI/CD Pipeline
```yaml
# .github/workflows/ci.yml
on: [push, pull_request]
jobs:
  backend:
    - go vet ./...
    - go test ./... -race -coverprofile=coverage.out
    - go build ./...
  frontend:
    - npm ci
    - npm run lint
    - npm run test
    - npm run build
  deploy:
    needs: [backend, frontend]
    if: github.ref == 'refs/heads/main'
    # Deploy to Fly.io / Railway / AWS
```

### 2C. Dockerfile + Deploy
```dockerfile
# Backend: multi-stage Go build
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.* ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o server ./cmd/api

FROM alpine:3.19
COPY --from=builder /app/server /server
COPY --from=builder /app/db/migrations /migrations
EXPOSE 8080
CMD ["/server"]
```

```dockerfile
# Frontend: Next.js standalone
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

### 2D. Error Monitoring
- Sentry for both Go backend and Next.js frontend
- Source maps uploaded during CI
- Release tracking per deploy

---

## Phase 3: Auth & Account

### 3A. Password Reset
- `POST /auth/forgot-password` → sends reset email with token
- `POST /auth/reset-password` → token + new password
- Frontend: `/auth/forgot-password` and `/auth/reset-password?token=...` pages
- Token expires in 1 hour, single-use

### 3B. Email Verification
- On signup, send verification email
- `POST /auth/verify-email?token=...`
- Block certain actions (create workspace, invite members) until verified
- Resend button on dashboard banner

### 3C. Profile / Account Settings
- `/settings` page with tabs:
  - **Profile:** name, email, avatar (S3 upload), timezone
  - **Security:** change password, 2FA setup/disable, active sessions
  - **Notifications:** email preferences, digest frequency
  - **Danger zone:** delete account, export data

---

## Phase 4: Cron Jobs

All three exist in the database but have no runner:

### 4A. Recurring Card Creator
- Runs every minute
- Queries `card_recurrences WHERE is_active = true AND next_run_at <= now()`
- Creates a card from the recurrence config
- Updates `last_run_at` and calculates `next_run_at` from cron expression
- Uses robfig/cron Go library for cron parsing

### 4B. Daily Stats Snapshot
- Runs once daily at midnight UTC
- For each workspace: count cards_created, cards_completed, cards_archived, active_members for that day
- Upserts into `workspace_daily_stats`

### 4C. Email Digest Sender
- Runs daily at 8am UTC (for daily) and Monday 8am (for weekly)
- Queries `workspace_users WHERE digest_frequency = 'daily'` (or 'weekly')
- Fetches workspace stats for the period
- Sends via EmailService.SendDigest

---

## Phase 5: Remaining Competitive Features

### 5A. SSO/SAML (Enterprise)
- SAML 2.0 SP implementation using crewjam/saml Go library
- Workspace settings page to configure IdP metadata URL
- Auto-provision users from SAML assertions
- Gated to Business plan

### 5B. Custom Dashboards
- Drag-and-drop widget builder
- Widgets: card count, sprint progress, velocity chart, burndown, member activity, custom field aggregation
- Saved per user per workspace
- `/organization/{slug}/dashboard` page

### 5C. Forms / Intake
- Public form builder attached to a board
- Submissions create cards automatically
- Useful for bug reports, feature requests from non-team stakeholders
- Public URL: `app.sprintmaven.com/forms/{formId}`

### 5D. Goals / OKRs
- Objectives with measurable Key Results
- Key Results linked to epics or projects
- Progress auto-calculated from linked work
- `/organization/{slug}/goals` page

---

## Phase 6: Polish & Scale

### 6A. Card Activity History
- "Who changed what when" on individual cards
- Stored as activity_logs with entity_type = 'card'
- Timeline view in card detail sidebar

### 6B. Advanced Automations
- More trigger types: card created, due date passed, label added, assignee changed
- More action types: send Slack message, send email, move to board, add label, set custom field
- Condition builders (if priority = high AND label = bug)

### 6C. Slack 2-Way Sync
- Inbound: `/sprint create [title]` Slack command → creates card
- Inbound: Slack reactions → update card status
- Outbound: card changes → Slack channel (already exists)

### 6D. Native Mobile App (React Native)
- Board view (simplified)
- Card detail + edit
- Notifications
- Sprint overview
- Push notifications

---

## Build Order (Recommended)

```
PHASE 1 — New Features (2-3 weeks)
  1. Projects (migration + backend + frontend)
  2. Documents/Wiki (migration + backend + editor + pages)
  3. Gantt chart (frontend component + backend endpoint)
  4. Link boards/cards to projects
  5. Project sidebar nav + pages

PHASE 2 — Operational (1 week)
  6. Dockerfile (backend + frontend)
  7. CI/CD pipeline
  8. Backend tests (core flows)
  9. Frontend tests (critical components)
  10. Sentry integration

PHASE 3 — Auth (3-4 days)
  11. Password reset flow
  12. Email verification
  13. Profile/account settings page

PHASE 4 — Cron Jobs (2 days)
  14. Recurring card runner
  15. Daily stats snapshot
  16. Email digest sender

PHASE 5 — Competitive (1-2 weeks)
  17. SSO/SAML
  18. Custom dashboards
  19. Forms/intake
  20. Goals/OKRs

PHASE 6 — Polish (ongoing)
  21. Card activity history
  22. Advanced automations
  23. Slack 2-way
  24. Mobile app
```

---

## Entity Relationship (After Projects + Docs)

```
Workspace
  ├── Projects
  │     ├── Boards → Lists → Cards
  │     ├── Documents (nested tree)
  │     ├── Milestones
  │     └── Members
  ├── Boards (can be project-less)
  ├── Documents (workspace-level)
  ├── Teams
  ├── Roles & Permissions
  ├── Billing (Plans/Subscriptions)
  └── Settings
```
