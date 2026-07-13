# Code Standards

## General

- Keep modules small and single-purpose.
- Fix root causes — do not layer workarounds.
- Do not mix unrelated concerns in one component or route.
- Respect the system boundaries defined in `architecture-context.md`.

## TypeScript

- Strict mode is required throughout the project.
- Avoid `any`; use explicit interfaces or narrowly scoped types.
- Validate unknown external input at system boundaries before trusting it.
- Use `interface` for object contracts.

## React.js

- Single Responsibility Principle (SRP)
  - Each React component should have a single, clearly defined responsibility.
  - Avoid creating large components that handle multiple concerns such as UI rendering, business logic, API calls, and state management together.
  - Separate presentation logic, data handling, and business logic where appropriate.
- Component Reusability
  - Components should be designed as reusable building blocks.
  - Avoid duplicating UI logic across multiple components.
  - Create shared components for common UI patterns, forms, tables, modals, buttons, inputs, and other reusable elements.
  - Components should accept configurable props to support different use cases.
- SOLID Principles
  - Follow SOLID design principles when structuring React components, hooks, services, and application logic.
  - Keep components, hooks, and utility functions loosely coupled and easy to extend.
  - Avoid unnecessary dependencies between modules.
  - Design the codebase to support future feature additions without major refactoring.
- Maintainable React Architecture
  - Separate concerns by organizing components, hooks, API services, utilities, types, and state management into appropriate modules.
  - Prefer composition over creating complex component hierarchies.
  - Keep components small, readable, and easy to test.
  - Follow consistent naming conventions and project structure throughout the application.
- If possible avoid depending on parent component

## Styling

- Use CSS custom property tokens defined in `index.css` — no raw Tailwind color classes like `zinc-*` or hardcoded hex values.
- Reference tokens through their Tailwind utility names: `bg-base`, `text-copy-primary`, `border-surface-border`, `text-brand`, etc.
- Maintain the border radius scale: `rounded-xl` for small elements, `rounded-2xl` for cards, `rounded-3xl` for modals.

## File Organization

- `src/components` — resuable react UI components.
- `src/utilts` — all utility helper functions.
- `src/store` — redux store
- `src/store/service` - redux toolkit react queries/mutation (API Services).
- Name files after the responsibility they contain, not the technology.
