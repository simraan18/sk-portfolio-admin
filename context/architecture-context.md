# Architecture Context

## Stack

| Layer            | Technology                      | Role                              |
| ---------------- | ------------------------------- | --------------------------------- |
| Library          | React.js 16 + Vite + TypeScript | Interactive User Interface        |
| UI               | Tailwind + shadcn/ui            | Component composition and styling |
| State management | Redux + React Redux Toolkit     | Manage state globally             |
| API client       | React Redux Toolkit Query       | Trigger mutation api and query    |
| API              | REST API + Nestjs               | Scalable REST API                 |

## System Boundaries

- `src/components` — Resuable react UI components.
- `src/page` — Contain pages belongs to specfic route. `eg: / - home page`.
- `src/store` — Redux store, and api services.
- `src/utils` — Helper utility functions.

## Auth and Access Model

- User authenticate using email and password
- Only authenticated user can manage portofolio content entity

## Invariants

1. Code base does not contain any unused import or states or functions
2. Should pass the `es-lint`.
3. Should not contain security vulunrable codes
