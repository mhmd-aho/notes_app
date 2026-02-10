# 📝 Collaborative Notes App

A modern, real-time collaborative note-taking application built with **Next.js**, **Convex**, and **Better Auth**.

---

## 🚀 Live Demo

[View Live Demo](https://notes-app-dun-eight.vercel.app/)

---

## ✨ Features

- **Real-time Collaboration**: Edit notes simultaneously with other users using a powerful rich-text editor.
- **Live Presence**: See who's currently viewing or editing a note with built-in presence indicators.
- **Rich Text Editing**: Full-featured editing experience powered by **BlockNote**.
- **Instant Sync**: Blazing fast data synchronization across all clients via **Convex**.
- **Secure Authentication**: Robust user management and authentication using **Better Auth**.
- **Search & Organize**: Find your notes quickly with integrated search indexing.
- **Responsive Design**: Beautiful, mobile-friendly interface built with **Tailwind CSS** and **Radix UI**.
- **Smart Timestamps**: Relative time-ago indicators for note updates.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Backend/Database**: [Convex](https://www.convex.dev/) (Real-time Backend as a Service)
- **Authentication**: [Better Auth](https://www.better-auth.com/)
- **Editor**: [BlockNote](https://www.blocknotejs.org/) / [ProseMirror Sync](https://convex.dev/components/prosemirror-sync)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn/UI](https://ui.shadcn.com/) (Radix UI)
- **Validation**: [Zod](https://zod.dev/) & [React Hook Form](https://react-hook-form.com/)

---

## 📂 Project Structure

- `/app`: Next.js App Router pages and layouts.
- `/convex`: Convex backend schema, queries, mutations, and actions.
- `/components`: Reusable UI components (Shared & Feature-specific).
- `/lib`: Utility functions and auth configuration.
- `/public`: Static assets.

---

> [!NOTE]
> This project is designed for high-performance real-time interactions, leveraging Convex's reactive database for a seamless user experience.
