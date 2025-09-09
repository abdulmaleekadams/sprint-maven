# 🛠 Sprint Maven – Clean Architecture (Frontend)

This project is a **Trello-like project management tool** built with **Next.js** following a **Clean Architecture** setup.
The backend is handled in a separate service – this repo is **frontend-only**.

---

## 📂 Project Structure

```plaintext
src/
├── application/        # Application logic (use-cases, validation, DTOs, hooks)
│   ├── use-cases/      # Business rules (e.g., createCard, moveCard)
│   ├── validation/     # Form validation schemas (Zod, Yup, etc.)
│   ├── hooks/          # App-specific hooks (state + logic)
│   └── services/       # API calls / client-side service logic
│
├── domain/             # Enterprise-wide business rules
│   ├── entities/       # Core entities (Card, Board, List, User)
│   ├── types/          # Type definitions (CardTypes, BoardTypes, etc.)
│   └── value-objects/  # (Optional) Value objects like CardId, UserId
│
├── infrastructure/     # External frameworks/services
│   ├── api/            # API clients (REST, GraphQL, tRPC, etc.)
│   ├── storage/        # Local storage, cache, Zustand/Redux persistence
│   └── config/         # Environment configs
│
├── presentation/       # UI layer
│   ├── components/     # Reusable UI components (Button, InputField)
│   ├── features/       # Feature-based UI (Card, Board, Auth)
│   ├── pages/          # Next.js pages
│   └── layouts/        # App layouts (DashboardLayout, AuthLayout)
│
└── shared/             # Shared utilities/helpers
    ├── utils/          # Helpers (date formatting, camelToSnakeCase, etc.)
    └── constants/      # App constants
```

---

## 🧩 Example: Card Entity

`src/domain/entities/card.entity.ts`

```ts
export class Card {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string,
    public listId: string,
    public boardId: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  moveToList(newListId: string) {
    this.listId = newListId;
    this.updatedAt = new Date();
  }
}
```

---

## 🧩 Example: Card Types

`src/domain/types/card.types.ts`

```ts
export interface CardProps {
  id: string;
  title: string;
  description?: string;
  listId: string;
  boardId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🚀 Why Clean Architecture?

- **Separation of Concerns** – Keep UI, business rules, and infrastructure independent.
- **Testability** – Each layer can be tested in isolation.
- **Scalability** – Easy to extend features like analytics, drag-and-drop, or notifications.
- **Flexibility** – Swap API clients or state management libraries without breaking core logic.

---

## 📖 Where to Put Things

- **Entities & Types** → `src/domain/`
- **Use Cases (business logic)** → `src/application/use-cases/`
- **Validation (Zod schemas, etc.)** → `src/application/validation/`
- **API Calls (fetch, axios, GraphQL)** → `src/infrastructure/api/`
- **UI Components** → `src/presentation/components/`
- **Feature Components (Card, Board, etc.)** → `src/presentation/features/`
- **Utils & Constants** → `src/shared/`

---

## ⚡ Tech Stack

- **Next.js** – React framework
- **TypeScript** – Strong typing
- **Zustand / Redux** – State management
- **Zod** – Schema validation
- **TailwindCSS** – Styling

---

## 🧪 Example Flow

1. **User creates a card** in the UI → `presentation/features/cards/CreateCardForm.tsx`
2. Form data is validated → `application/validation/card.schema.ts`
3. Use case runs → `application/use-cases/createCard.ts`
4. API request is made → `infrastructure/api/cardApi.ts`
5. Response maps back to **domain entity** → `domain/entities/Card.ts`
6. UI updates with new card.

---

## ✅ Rules (GOD mode, no feelings)

- **No repositories in frontend** – API calls go directly in `infrastructure/api`.
- **Domain is pure** – no imports from other layers.
- **Application knows Domain, but not Presentation.**
- **Presentation depends on Application + Domain.**
- **Infrastructure can be swapped anytime.**

---
