# 📝 Collaborative Notes App

> A modern, real-time collaborative note-taking application built with **Next.js**, **Convex**, and **Better Auth**. Work together with your team — edit notes simultaneously, see who's online, and keep everything in sync instantly.

---

## 🚀 Live Demo

[🌐 View Live Demo](https://notes-app-dun-eight.vercel.app/)

---

## ✨ Features

### 🤝 Collaboration

- **Real-time Collaborative Editing** — Multiple users can edit the same note simultaneously using ProseMirror sync.
- **Live Presence Indicators** — See avatars of all users currently viewing or editing a note, powered by `@convex-dev/presence`.
- **Team-based Workspaces** — Create and manage teams; notes are scoped to their team workspace.

### 📓 Notes

- **Rich Text Editor** — Full-featured block-based editing powered by **BlockNote** (built on ProseMirror/TipTap).
- **Instant Sync** — All note changes are reflected in real-time across every connected client via Convex's reactive database.
- **Smart Timestamps** — Notes show relative "time ago" last-updated indicators.
- **Full-text Search** — Search notes by title using Convex's built-in search index.
- **Create & Delete** — Create notes within a team, delete them (restricted to note author or team owner).

### 👥 Teams

- **Create Teams** — Users can create uniquely named teams.
- **Join Requests** — Users can request to join any team by name; the team owner approves or rejects requests.
- **Member Management** — View team members with their roles (`owner` / `member`).
- **Team Settings** — Rename a team or permanently delete it (with cascading deletion of all notes and members).

### 🔐 Authentication

- **Email & Password** — Sign up and sign in with email/password via **Better Auth**.
- **Username Support** — Users register with a username for display across the app.
- **Protected Routes** — All app routes are guarded; unauthenticated users are redirected to sign-in.
- **Theme Support** — Light, Dark, and System themes via `next-themes`.

### 🎨 UI / UX

- **Responsive Design** — Mobile-friendly layout that adapts across screen sizes.
- **Shadcn/UI Components** — Polished, accessible UI primitives built on Radix UI.
- **Toast Notifications** — Real-time feedback for actions using **Sonner**.
- **Loading States** — Skeleton loaders for async content.

---

## 🛠️ Tech Stack

| Category                  | Technology                                                                       | Version  |
| ------------------------- | -------------------------------------------------------------------------------- | -------- |
| **Framework**             | [Next.js](https://nextjs.org/) (App Router)                                      | 16.1.6   |
| **Runtime**               | [React](https://react.dev/)                                                      | 19.2.3   |
| **Backend / DB**          | [Convex](https://www.convex.dev/)                                                | ^1.31.7  |
| **Authentication**        | [Better Auth](https://www.better-auth.com/)                                      | 1.4.9    |
| **Convex Auth Adapter**   | [@convex-dev/better-auth](https://www.npmjs.com/package/@convex-dev/better-auth) | ^0.10.10 |
| **Rich Text Editor**      | [BlockNote](https://www.blocknotejs.org/)                                        | ^0.46.2  |
| **Collaborative Editing** | [@convex-dev/prosemirror-sync](https://convex.dev/components/prosemirror-sync)   | ^0.2.1   |
| **Presence**              | [@convex-dev/presence](https://convex.dev/components/presence)                   | ^0.3.0   |
| **Styling**               | [Tailwind CSS v4](https://tailwindcss.com/)                                      | ^4       |
| **UI Components**         | [Shadcn/UI](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)      | —        |
| **Forms**                 | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)        | —        |
| **Icons**                 | [Lucide React](https://lucide.dev/)                                              | ^0.563.0 |
| **Toasts**                | [Sonner](https://sonner.emilkowal.ski/)                                          | ^2.0.7   |
| **Fonts**                 | Geist Sans & Geist Mono (Google Fonts)                                           | —        |
| **Language**              | TypeScript                                                                       | ^5       |

---

## 🗂️ Project Structure

```
notes_app/
├── app/                            # Next.js App Router
│   ├── (auth)/                     # Auth route group
│   │   └── auth/
│   │       ├── signin/page.tsx     # Sign-in page
│   │       └── signup/page.tsx     # Sign-up page
│   ├── (sharedLayout)/             # Main app route group (protected)
│   │   ├── layout.tsx              # Shared layout with Header
│   │   ├── loading.tsx             # Loading skeleton UI
│   │   ├── page.tsx                # Dashboard — lists notes for active team
│   │   ├── create-note/            # Create note page
│   │   ├── create-team/            # Create team page
│   │   ├── note/[id]/              # Note editor page (real-time collaborative)
│   │   └── team/[id]/              # Team settings / management page
│   ├── api/                        # API routes (Better Auth handler)
│   ├── context/                    # React contexts
│   │   └── teamContext.tsx         # Active team state (global)
│   ├── hooks/                      # Custom React hooks
│   ├── schemas/                    # Zod validation schemas
│   ├── actions.ts                  # Next.js Server Actions
│   ├── ConvexClientProvider.tsx    # Convex + Better Auth client wrapper
│   ├── layout.tsx                  # Root layout (fonts, providers, toaster)
│   └── globals.css                 # Global styles & Tailwind tokens
│
├── components/
│   ├── app/                        # Feature-level components
│   │   ├── collaborativeEditor.tsx # BlockNote editor with ProseMirror sync
│   │   ├── deleteButton.tsx        # Confirm-to-delete note button
│   │   ├── header.tsx              # Top navigation bar
│   │   ├── notes.tsx               # Notes list table rows
│   │   ├── presence.tsx            # Live user presence avatars
│   │   ├── profile.tsx             # User profile dropdown
│   │   ├── searchBar.tsx           # Full-text note search UI
│   │   ├── teamEdit.tsx            # Team settings panel (rename, members, requests)
│   │   ├── teams.tsx               # Team list sidebar / switcher
│   │   ├── theme-provider.tsx      # next-themes provider wrapper
│   │   ├── themeToggle.tsx         # Light/Dark/System toggle button
│   │   └── user.tsx                # User info display component
│   └── ui/                         # Shadcn/UI primitives (button, input, table, etc.)
│
├── convex/                          # Convex backend (serverless functions + schema)
│   ├── schema.ts                   # Database schema (notes, teams, members)
│   ├── auth.ts                     # Better Auth integration & user helpers
│   ├── auth.config.ts              # Better Auth configuration
│   ├── convex.config.ts            # Convex component registrations
│   ├── http.ts                     # HTTP action handlers (Better Auth routes)
│   ├── notes.ts                    # Notes queries & mutations
│   ├── team.ts                     # Team queries & mutations
│   ├── members.ts                  # Member queries
│   ├── presence.ts                 # Presence heartbeat / list / disconnect
│   ├── document.ts                 # ProseMirror document helpers
│   └── _generated/                 # Auto-generated Convex types & API
│
├── lib/
│   ├── auth-client.ts              # Better Auth browser client
│   ├── auth-server.ts              # Better Auth server client
│   ├── time.ts                     # Relative time-ago formatting utilities
│   └── utils.ts                    # cn() Tailwind class merge helper
│
├── public/                         # Static assets (favicon, etc.)
├── next.config.ts                  # Next.js configuration
├── tsconfig.json                   # TypeScript configuration
├── components.json                 # Shadcn/UI configuration
└── package.json
```

---

## 🗃️ Database Schema

The backend is powered by **Convex** with the following tables:

### `notes`

| Field       | Type                              | Description                           |
| ----------- | --------------------------------- | ------------------------------------- |
| `title`     | `string`                          | Note title (full-text search indexed) |
| `team`      | `id<teams>`                       | Team this note belongs to             |
| `content`   | `{ type: "doc", content: any[] }` | BlockNote/ProseMirror document        |
| `author`    | `string`                          | Display name of the creator           |
| `authorId`  | `string`                          | User ID of the creator                |
| `updatedAt` | `number`                          | Unix timestamp of last edit           |

**Indexes:** `by_team`, `search_title` (full-text)

### `teams`

| Field      | Type       | Description                         |
| ---------- | ---------- | ----------------------------------- |
| `name`     | `string`   | Unique team name                    |
| `ownerId`  | `string`   | User ID of the owner                |
| `requests` | `string[]` | User IDs with pending join requests |

**Indexes:** `by_owner`, `by_name`, `by_owner_name`

### `members`

| Field    | Type                  | Description               |
| -------- | --------------------- | ------------------------- |
| `teamId` | `id<teams>`           | Team reference            |
| `userId` | `string`              | User reference            |
| `role`   | `"owner" \| "member"` | Member's role in the team |

**Indexes:** `by_team`, `by_user`, `by_user_team`

---

## ⚙️ Convex API Reference

### Notes (`convex/notes.ts`)

| Function              | Type     | Description                                 |
| --------------------- | -------- | ------------------------------------------- |
| `getNotes`            | query    | Get all notes for a team                    |
| `getNoteById`         | query    | Get a single note by ID                     |
| `searchNotes`         | query    | Full-text search notes by title             |
| `createNote`          | mutation | Create a new note in a team (auth required) |
| `deleteNote`          | mutation | Delete a note (author or team owner only)   |
| `updateNoteTimestamp` | mutation | Patch the `updatedAt` field on edit         |

### Teams (`convex/team.ts`)

| Function         | Type     | Description                                           |
| ---------------- | -------- | ----------------------------------------------------- |
| `getUserTeams`   | query    | Get all teams the current user belongs to             |
| `getTeamById`    | query    | Get a team and its pending requests with user details |
| `getTeamByName`  | query    | Find a team by its name                               |
| `getTeamMembers` | query    | List all members of a team                            |
| `createTeam`     | mutation | Create a new team (creator becomes owner)             |
| `createRequest`  | mutation | Request to join a team by name                        |
| `acceptRequest`  | mutation | Owner accepts a join request                          |
| `rejectRequest`  | mutation | Owner rejects a join request                          |
| `deleteTeam`     | mutation | Delete team + all its notes and members (owner only)  |
| `changeTeamName` | mutation | Rename the team (owner only)                          |

### Presence (`convex/presence.ts`)

| Function     | Type     | Description                                  |
| ------------ | -------- | -------------------------------------------- |
| `list`       | query    | List active users in a room with avatar URLs |
| `heartbeat`  | mutation | Keep a user session alive in a room          |
| `disconnect` | mutation | Remove a user session from a room            |
| `getUserId`  | query    | Get the current authenticated user's ID      |

---

## 🚦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/) (recommended) or npm
- A [Convex](https://dashboard.convex.dev/) account

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/notes_app.git
cd notes_app
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Convex

```bash
npx convex dev
```

Follow the prompts to create or link a Convex project. This will generate your `NEXT_PUBLIC_CONVEX_URL`.

### 4. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# Your Convex deployment URL (from `npx convex dev` output)
NEXT_PUBLIC_CONVEX_URL=https://<your-deployment>.convex.cloud

# The public URL of your app (used by Better Auth)
SITE_URL=http://localhost:3000

# Better Auth secret key (generate a random string)
BETTER_AUTH_SECRET=your-secret-key-here
```

### 5. Run the Development Server

In separate terminals:

```bash
# Terminal 1 — Next.js dev server
pnpm dev

# Terminal 2 — Convex backend (if not already running)
npx convex dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Script  | Command      | Description                      |
| ------- | ------------ | -------------------------------- |
| `dev`   | `pnpm dev`   | Start Next.js development server |
| `build` | `pnpm build` | Build for production             |
| `start` | `pnpm start` | Start production server          |
| `lint`  | `pnpm lint`  | Run ESLint                       |

---

## 🔒 Authorization Rules

| Action                        | Who Can Perform               |
| ----------------------------- | ----------------------------- |
| Create a note                 | Any authenticated team member |
| Delete a note                 | Note author **or** team owner |
| Rename / delete team          | Team owner only               |
| Accept / reject join requests | Team owner only               |
| View notes & members          | Any team member               |

---

## 📦 Key Dependencies

```json
{
  "next": "16.1.6",
  "react": "19.2.3",
  "convex": "^1.31.7",
  "better-auth": "1.4.9",
  "@convex-dev/better-auth": "^0.10.10",
  "@convex-dev/prosemirror-sync": "^0.2.1",
  "@convex-dev/presence": "^0.3.0",
  "@blocknote/react": "^0.46.2",
  "tailwindcss": "^4",
  "zod": "^4.3.6",
  "react-hook-form": "^7.71.1",
  "sonner": "^2.0.7",
  "lucide-react": "^0.563.0",
  "next-themes": "^0.4.6"
}
```

---

## 🌐 Deployment

This project is deployed on **Vercel**. To deploy your own instance:

1. Push your repository to GitHub.
2. Import it into [Vercel](https://vercel.com/).
3. Set the same environment variables from `.env.local` in the Vercel project settings.
4. Deploy — Convex handles the backend automatically.

> [!NOTE]
> Make sure to set `SITE_URL` to your production Vercel domain (e.g., `https://your-app.vercel.app`) in both Vercel environment variables and your Convex deployment settings.

---

## 👤 Author

**Mohamad Abou Hamoud**

---

> [!TIP]
> This project uses Convex's reactive database, which means all connected clients automatically receive updates without any polling or manual refresh needed. The combination of `@convex-dev/prosemirror-sync` and `@convex-dev/presence` provides a Google Docs–like real-time collaboration experience.
