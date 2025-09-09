This will explain the philosophy, folder structure, and how to work with entities, use-cases, and APIs.

---

# 🏗️ Sprint Maven – Clean Architecture (Frontend)

This project is a **Project management tool** built with **Next.js**, designed using **Clean Architecture principles**.
The backend lives in a separate service. This repo focuses **only on the frontend** (presentation, application, domain, infrastructure).

---

## 🎯 Goals

- **Separation of concerns** – UI, business rules, and data access are strictly separated.
- **Testability** – business logic can be tested without React or API dependencies.
- **Flexibility** – swap UI libraries, API clients, or backend endpoints without breaking core logic.
- **Scalability** – clear folder structure for growing features (boards, lists, cards, comments, workspaces).

---

## 📂 Project Structure

```plaintext
src/
├── domain/                # Entities & types (core business models)
│   ├── board/
│   │   ├── board.entity.ts
│   │   └── board.types.ts
│   ├── card/
│   │   ├── card.entity.ts
│   │   └── card.types.ts
│   └── ...
│
├── application/           # Business rules (use cases, validation)
│   ├── use-cases/
│   │   ├── board/
│   │   │   ├── createBoard.ts
│   │   │   ├── deleteBoard.ts
│   │   │   └── updateBoard.ts
│   │   ├── card/
│   │   │   ├── moveCard.ts
│   │   │   ├── reorderCards.ts
│   │   │   └── updateCard.ts
│   │   └── ...
│   └── validation/
│       ├── board.schema.ts
│       ├── card.schema.ts
│       └── ...
│
├── infrastructure/        # Communication with backend APIs
│   └── api/
│       ├── client.ts       # axios/fetch wrapper
│       ├── board.api.ts
│       ├── card.api.ts
│       └── ...
│
├── presentation/          # UI (React components, hooks, pages)
│   ├── components/
│   │   ├── board/
│   │   │   ├── BoardView.tsx
│   │   │   ├── ListColumn.tsx
│   │   │   └── CardItem.tsx
│   │   └── ui/             # shared UI atoms (buttons, inputs, modals)
│   ├── hooks/
│   └── pages/              # Next.js pages
│
└── styles/                 # global styles (Tailwind, etc.)
```

---

## 🔑 Layer Responsibilities

### **Domain**

- Pure business models (`CardEntity`, `BoardEntity`).
- Contains rules & invariants (e.g., _“card title must be at least 3 chars”_).
- No external dependencies (framework-agnostic).

### **Application**

- Use cases (e.g., `moveCard`, `createBoard`, `reorderLists`).
- Form validation (`zod` schemas).
- Orchestrates domain + infrastructure but doesn’t know about UI.

### **Infrastructure**

- Talks to backend API via REST/GraphQL.
- Example: `card.api.ts` → `moveCardApi()`.
- Can be swapped without touching business logic.

### **Presentation**

- React/Next.js components, hooks, pages.
- Handles user interactions (drag-and-drop, forms, modals).
- Calls **application use-cases** to enforce rules.

---

## ⚡ Example Flow (Move Card)

1. **UI (presentation)** → user drags a card in `BoardView.tsx`.
2. **Use case (application)** → `moveCard.ts` checks rules, updates state.
3. **API (infrastructure)** → `card.api.ts` persists the move to backend.
4. **Entity (domain)** → `CardEntity` ensures the card remains valid.

---

## ✅ Advantages

- Business rules live in **one place** (not spread across UI).
- Easy to test entities and use-cases without running Next.js.
- Backend swap? Just replace `infrastructure/api` layer.
- UI swap (e.g., React → React Native)? Keep domain + application the same.

---

## 🛠️ Tech Stack

- **Next.js 14 (App Router)** – frontend framework.
- **TypeScript** – type safety.
- **Zod** – form validation.
- **React Query / TanStack Query** – API state management.
- **TailwindCSS + ShadCN** – UI components.
- **React Beautiful DnD** – drag-and-drop (for Trello-like behavior).

---

## 🚀 Getting Started

```bash
# install deps
yarn

# run dev server
yarn dev

# build
yarn build
```

---
