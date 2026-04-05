# Sprint Maven — Complete Build Plan

Everything left to build, organized by priority and dependency order.
Reordered: operational readiness first, then features.

---

## Phase 0: Ship What You Have (Week 1)

### 0A. Dockerfiles
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

### 0B. Password Reset
- `POST /auth/forgot-password` → sends reset email with token
- `POST /auth/reset-password` → token + new password
- Frontend: `/auth/forgot-password` and `/auth/reset-password?token=...` pages
- Token expires in 1 hour, single-use

### 0C. Email Verification
- On signup, send verification email
- `POST /auth/verify-email?token=...`
- Block certain actions (create workspace, invite members) until verified
- Resend button on dashboard banner

### 0D. Profile / Account Settings
- `/settings` page with tabs:
  - **Profile:** name, email, avatar (S3 upload), timezone
  - **Security:** change password, 2FA setup/disable, active sessions
  - **Notifications:** email preferences, digest frequency
  - **Danger zone:** delete account, export data

### 0E. Cron Jobs
All three exist in the database but have no runner:

**Recurring Card Creator:**
- Runs every minute
- Queries `card_recurrences WHERE is_active = true AND next_run_at <= now()`
- Creates a card from the recurrence config
- Updates `last_run_at` and calculates `next_run_at` from cron expression
- Uses robfig/cron Go library for cron parsing

**Daily Stats Snapshot:**
- Runs once daily at midnight UTC
- For each workspace: count cards_created, cards_completed, cards_archived, active_members
- Upserts into `workspace_daily_stats`

**Email Digest Sender:**
- Runs daily at 8am UTC (for daily) and Monday 8am (for weekly)
- Queries `workspace_users WHERE digest_frequency = 'daily'` (or 'weekly')
- Sends via EmailService.SendDigest

---

## Phase 1: Stabilize (Week 2)

### 1A. Backend Tests
- Go table-driven tests for core flows:
  - Auth (signup, login, token refresh, TOTP)
  - Card CRUD + ordering
  - Sprint lifecycle (create → start → complete)
  - Permission checks (owner bypass, role-based, board-level)
  - Billing guard (plan limits, feature gating)
  - Retro phases (writing → reveal → vote → discuss → close)
  - Slug resolution middleware
- Target: 60%+ coverage on critical paths

### 1B. Frontend Tests
- Vitest + React Testing Library for:
  - Card creation flow
  - Filter/sort logic (pure function tests)
  - Retro phase UI (state transitions)
  - Description editor save/load
  - Auth forms
- Target: critical user flows covered

### 1C. CI/CD Pipeline
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

### 1D. Error Monitoring
- Sentry for both Go backend and Next.js frontend
- Source maps uploaded during CI
- Release tracking per deploy

---

## Phase 2: Projects & Docs (Weeks 3-4)

### 2A. Projects

Projects are the top-level container that groups boards, docs, and tasks under a single initiative.

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

### 2B. Documents / Wiki

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

### 2C. Gantt Chart (Project-level)

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

## Phase 3: ClickUp-Parity Features (Weeks 5-6)

### 3A. Everything View

A single page showing ALL cards across ALL boards/projects in the workspace. ClickUp's killer feature.

**Backend:**
```
GET /workspaces/{wID}/cards/all?assignee=X&priority=Y&status=Z&project=P&board=B&due=overdue&sort=due_date&limit=50&offset=0
```

Query across all boards/lists/cards in the workspace with filters. Returns flat list with board_name, list_name, project_name attached.

**Frontend:**
- `/organization/{slug}/everything` — table view with sortable columns
- Columns: title, status (list name), board, project, assignee, priority, due date, points, type
- Filter bar (reuse existing `BoardFilterBar` concept, expanded for cross-board)
- Pagination
- Click row → opens card detail sheet
- Add to sidebar nav

---

### 3B. Custom Task Statuses

Instead of relying on list names as implicit statuses, boards define an explicit status state machine.

**Database:**
```sql
-- board_statuses: define the status workflow per board
board_statuses (
    id TEXT PK,
    board_id TEXT FK → boards,
    name TEXT NOT NULL,
    color TEXT NOT NULL,               -- hex color for badges
    category TEXT DEFAULT 'in_progress', -- not_started, in_progress, done, cancelled
    "order" INT NOT NULL,
    is_default BOOLEAN DEFAULT false,  -- new cards get this status
    is_done BOOLEAN DEFAULT false,     -- cards here count as completed
    created_at TIMESTAMPTZ
)

ALTER TABLE cards ADD COLUMN status_id TEXT FK → board_statuses;
```

Lists still exist for physical board layout, but status is decoupled — a card can be "In Review" status while sitting in any list.

**API:**
```
GET    /boards/{boardID}/statuses          → list statuses
POST   /boards/{boardID}/statuses          → create status
PATCH  /boards/{boardID}/statuses/{id}     → update (name, color, order)
DELETE /boards/{boardID}/statuses/{id}     → delete
```

**Frontend:**
- Board settings tab for status configuration (color picker, drag-to-reorder, mark as "done")
- Status badge on cards (colored dot + name)
- Swimlane view can group by status
- Filter by status in filter bar

---

### 3C. Time Estimates

Add estimated hours alongside actual tracked time.

**Database:**
```sql
ALTER TABLE cards ADD COLUMN estimated_hours DECIMAL(10,2);
```

**Frontend:**
- Estimate input in card detail (next to time tracking)
- Estimated vs Actual column in table view
- Progress indicator: `4h / 8h estimated` with bar
- Analytics: estimate accuracy over time

---

### 3D. Portfolios / Multi-Project Overview

A dashboard showing all projects with rollup stats.

**Backend:**
```
GET /workspaces/{wID}/portfolio → list of projects with rollup stats:
  - total cards, completed cards, % complete
  - overdue count
  - health indicator (on_track, at_risk, behind)
  - next milestone
  - member count
  - active sprint name
```

Health auto-calculated:
- `on_track`: >80% of scheduled cards complete
- `at_risk`: 50-80%
- `behind`: <50% or has overdue milestone

**Frontend:**
- `/organization/{slug}/portfolio` — grid/table of project health cards
- Each card: project name, progress bar, health badge, next milestone, team avatars
- Sort by health/progress/due date
- Add to sidebar nav

---

### 3E. Proofing / Annotations

Image and PDF markup for design review.

**Database:**
```sql
-- annotations: comments pinned to coordinates on attachments
annotations (
    id TEXT PK,
    attachment_id TEXT FK → attachments,
    card_id TEXT FK → cards,
    user_id TEXT FK → users,
    content TEXT NOT NULL,
    x_percent DECIMAL(5,2),           -- position as % of image width
    y_percent DECIMAL(5,2),           -- position as % of image height
    page_number INT,                  -- for PDFs
    resolved BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
)
```

**API:**
```
POST   /cards/{cardID}/attachments/{attID}/annotations  → create
GET    /cards/{cardID}/attachments/{attID}/annotations  → list
PATCH  /annotations/{id}                                → resolve/update
DELETE /annotations/{id}                                → delete
```

**Frontend:**
- Image viewer overlay with clickable annotation pins
- Click anywhere on image → create annotation at that coordinate
- Annotation list sidebar with resolve toggle
- PDF viewer with page-specific annotations
- Numbered markers on the image (1, 2, 3) linked to comments

---

### 3F. Email-to-Task

Each board gets a unique inbound email address. Forward an email → creates a card.

**Setup:**
- Use Resend inbound webhook OR Cloudflare Email Workers
- Each board has a generated email: `{board-slug}@inbound.sprintmaven.com`
- Webhook receives email → parses subject (card title), body (description), attachments (S3 upload)
- Creates card in the board's first list

**Database:**
```sql
ALTER TABLE boards ADD COLUMN inbound_email TEXT UNIQUE;
```

**API:**
```
POST /webhooks/inbound-email  → receives parsed email payload
GET  /boards/{boardID}/inbound-email → shows the board's inbound address
POST /boards/{boardID}/inbound-email/regenerate → generates new address
```

**Frontend:**
- Board settings shows inbound email address with copy button
- "Email a task to this board" info card

---

### 3G. Notepad / Scratch Pad

Personal quick notes per user, not tied to any project.

**Database:**
```sql
notepads (
    id TEXT PK,
    user_id TEXT FK → users,
    workspace_id TEXT FK → workspaces,
    title TEXT DEFAULT 'Untitled',
    content JSONB,                    -- Plate JSON (reuse editor)
    pinned BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
)
```

**API:**
```
GET    /workspaces/{wID}/notepads     → list user's notepads
POST   /workspaces/{wID}/notepads     → create
PATCH  /notepads/{id}                 → update
DELETE /notepads/{id}                 → delete
```

**Frontend:**
- Floating notepad button (bottom-right corner, like chat widget)
- Opens a mini Plate editor panel
- Pin to keep open
- Quick capture without leaving current page

---

## Phase 4: Enterprise Features (Weeks 7-8)

### 4A. SSO/SAML
- SAML 2.0 SP implementation using crewjam/saml Go library
- Workspace settings page to configure IdP metadata URL
- Auto-provision users from SAML assertions
- Gated to Business plan

### 4B. Custom Dashboards
- Drag-and-drop widget builder
- Widgets: card count by status, sprint progress, velocity chart, burndown, member workload, overdue cards, custom field aggregation, project health
- Saved per user per workspace
- `/organization/{slug}/dashboard` page

### 4C. Forms / Intake
- Public form builder attached to a board
- Form fields map to card fields (title, description, priority, custom fields)
- Submissions create cards automatically in specified list
- Public URL: `app.sprintmaven.com/forms/{formId}`
- Embeddable via iframe
- Submission notifications to board members

### 4D. Goals / OKRs
- Objectives with measurable Key Results
- Key Results linked to epics, projects, or manual progress
- Progress auto-calculated from linked work
- `/organization/{slug}/goals` page
- Supports: company goals → team goals hierarchy

---

## Phase 5: Polish & Scale (Ongoing)

### 5A. Card Activity History
- "Who changed what when" on individual cards
- Stored as activity_logs with entity_type = 'card'
- Timeline view in card detail sidebar

### 5B. Advanced Automations
- More trigger types: card created, due date passed, label added, assignee changed, status changed, sprint started/completed
- More action types: send Slack message, send email, move to board, add label, set custom field, create subtask, assign user
- Condition builders (if priority = high AND label = bug → auto-assign to QA lead)
- Automation templates gallery

### 5C. Slack 2-Way Sync
- Inbound: `/sprint create [title]` Slack command → creates card
- Inbound: Slack reactions → update card status
- Outbound: card changes → Slack channel (already exists)
- Thread sync: Slack thread ↔ card comments

### 5D. Native Mobile App (React Native)
- Board view (simplified)
- Card detail + edit
- Notifications + push
- Sprint overview
- Offline support (queue actions, sync on reconnect)

---

## Build Order (Final)

```
PHASE 0 — Ship (Week 1)
  1. Dockerfiles (backend + frontend)
  2. Password reset flow
  3. Email verification
  4. Profile/account settings page
  5. Cron jobs (recurring cards, stats, digest)
  6. Deploy to production

PHASE 1 — Stabilize (Week 2)
  7. Backend tests (core flows)
  8. Frontend tests (critical components)
  9. CI/CD pipeline
  10. Sentry error monitoring

PHASE 2 — Projects & Docs (Weeks 3-4)
  11. Projects (migration + backend + frontend)
  12. Documents/Wiki (migration + backend + editor + pages)
  13. Gantt chart (frontend component + backend endpoint)
  14. Link boards/cards to projects
  15. Project sidebar nav + pages

PHASE 3 — ClickUp Parity (Weeks 5-6)
  16. Everything view (all cards across workspace)
  17. Custom task statuses (decoupled from lists)
  18. Time estimates (estimated vs actual)
  19. Portfolios (multi-project health overview)
  20. Proofing/annotations (image + PDF markup)
  21. Email-to-task (inbound email → card)
  22. Notepad (personal scratch pad)

PHASE 4 — Enterprise (Weeks 7-8)
  23. SSO/SAML
  24. Custom dashboards (widget builder)
  25. Forms/intake (public form → card)
  26. Goals/OKRs

PHASE 5 — Polish (Ongoing)
  27. Card activity history
  28. Advanced automations (conditions, templates)
  29. Slack 2-way sync
  30. Native mobile app
```

---

## Entity Relationship (Final State)

```
Workspace
  ├── Projects
  │     ├── Boards → Lists → Cards (with statuses, estimates)
  │     ├── Documents (nested tree, Plate JSON + Markdown)
  │     ├── Milestones (for Gantt)
  │     └── Members
  ├── Boards (can be project-less)
  │     ├── Statuses (custom state machine)
  │     └── Inbound Email
  ├── Documents (workspace-level wiki)
  ├── Notepads (personal per user)
  ├── Goals / OKRs
  │     └── Key Results → linked to Epics/Projects
  ├── Teams
  ├── Roles & Permissions
  ├── Forms (public intake)
  ├── Custom Dashboards (per user)
  ├── Billing (Plans/Subscriptions)
  └── Settings (SSO, integrations, webhooks)
```

---

## Feature Count Summary

| Category | Built | Planned | Total |
|---|---|---|---|
| Core PM (boards, cards, sprints) | 18 | 0 | 18 |
| Collaboration (comments, mentions, real-time) | 6 | 0 | 6 |
| Retro ceremony | 1 | 0 | 1 |
| Auth & security | 3 | 3 | 6 |
| Billing | 2 | 0 | 2 |
| Integrations (GitHub, Slack, webhooks) | 3 | 2 | 5 |
| AI | 1 | 0 | 1 |
| Analytics & reporting | 3 | 1 | 4 |
| Projects + Docs + Gantt | 0 | 3 | 3 |
| ClickUp parity | 0 | 7 | 7 |
| Enterprise (SSO, dashboards, forms, OKRs) | 0 | 4 | 4 |
| Polish (automations, mobile) | 0 | 4 | 4 |
| Operational (tests, CI, Docker, Sentry) | 0 | 5 | 5 |
| **Total** | **37** | **29** | **66** |
