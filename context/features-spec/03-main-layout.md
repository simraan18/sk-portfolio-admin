Read and follow the instructions in `AGENTS.md` before making any changes.

### Task

Implement the main application layout using separate, reusable React components

### Left Navigation Panel

- Create a dedicated component for the left navigation panel.
- The panel should occupy approximately 30% of the viewport width when open.
- By default, the panel must be hidden.
- Provide a toggle button that opens and closes the panel.
- Use the `PanelRightClose` icon from lucide-react as the button to open the panel.
- Use the `PanelRightOpen` icon from lucide-react as the button to close the panel.
- The panel must appear as an overlay above the main content and must not cause the content area to shift or resize.
- Add a visible right border to the panel to clearly separate it from the content area.

### Main Content Area

- Create a dedicated component for the main content area.
- The content area should occupy the full viewport height (100vh).
- Display a title and a brief description explaining the purpose of the SK Portfolio Admin application.

### Implementation Requirements

- Follow the Single Responsibility Principle by keeping layout concerns separated into focused, reusable components.
- Use semantic HTML elements (`nav`, `main`, `button`, etc.) where appropriate.
- Apply only the minimal HTML structure and CSS classes necessary to achieve the required layout and behavior.
- Ensure all interactive elements are keyboard accessible and include appropriate accessibility attributes.

### Acceptance Criteria

- All components import and compile successfully.
- The project contains no TypeScript or linting errors.
- Running `npm run build` completes successfully without errors.
