# SK Portfolio Admin

## Overview

Build an administrative dashboard named SK Portfolio Admin for managing the content of the SK Portfolio website. The administrator must be able to create, view, update, and delete the portfolio owner’s profile information, work experience entries, social media links, content cards, and card categories. The system should provide a secure interface for authenticated admin users to manage all portfolio data efficiently.

## Goals

1. Authenticate email and password, store jwt token in localstorage.
2. Let authenticated users create and manage Portfolio content.
3. Provides CRUD opearation for each entity in the system.

## Core User Flow

1. Provide a sign-in page for administrators.
2. Upon successful authentication, save the returned JWT access token in the browser’s local storage.
3. After login succeeds, automatically redirect the user to the `/home` route.
4. Only authenticated users may access the dashboard. Authenticated administrators can select any portfolio content entity (profile, work experience, social media links, content cards, and card categories) and perform the appropriate management operations (create, read, update, and delete).

## Features

### Authentication:

- Implement user sign-in functionality with JWT-based authentication.
- Protect application routes so that only authenticated users can access the admin dashboard.
- Restrict portfolio content management features to authenticated users only.
- Unauthenticated users attempting to access protected routes should be redirected to the sign-in page.
- Authenticated users should have permission to manage portfolio content entities, including creating, viewing, updating, and deleting content.

### Portfolio Content Management:

- Authorized users should be able to select a portfolio content entity they want to manage.
- Based on the selected entity, dynamically display the relevant form fields required to create or update that entity.
- The form should support entity-specific input handling and data submission.
- Implement proper form validation to ensure all required fields are completed and entered data follows the expected format before submission.
- Display meaningful validation messages to help users correct invalid or missing inputs.

### API Integration and Data Handling:

- After successful form validation, trigger the appropriate API request based on the selected operation (create, read, or update).
- Handle API responses properly and provide meaningful success messages when an operation is completed successfully.
- After a successful create or update operation, trigger a single read/get API request to fetch the latest entity data and update the UI with the most up-to-date information.
- Prevent unnecessary duplicate API calls after successful operations.
- Handle API failures gracefully by displaying meaningful error messages that explain the issue and help the user understand what went wrong.
- Maintain proper loading states during API requests to provide clear feedback to the user.

## Scope

### Core Application Features:

- Authentication and Route Protection
  - Implement secure user authentication using JWT-based authentication.
  - Protect admin dashboard routes and allow access only to authenticated users.
  - Redirect unauthenticated users to the sign-in page.
- Portfolio Content Entity Management
  - Allow authenticated users to manage portfolio content entities.
  - Support viewing, creating, updating, and managing different content types such as profile information, work experience, social media links, content cards, and card categories.
- Portfolio Content Display
  - Display portfolio content dynamically based on the selected entity.
  - Load and present entity-specific data in an organized and user-friendly interface.
- Create and Update Forms
  - Provide dynamic forms based on the selected portfolio entity.
  - Support creating new content and updating existing content.
  - Implement field-level validation, error handling, loading states, and user feedback messages.

## Success Criteria

1. User Authentication
   - Users can successfully sign in using a valid email address and password.
   - After successful sign-in, the user is authenticated and granted access to the admin dashboard.
   - Protected routes are accessible only to authenticated users.
2. Portfolio Content Management
   - Authenticated users can manage portfolio content entities.
   - Users can select, view, create, and update portfolio content based on their selected entity.
3. Content Entity Selection and Display
   - Users can select a portfolio content entity from the side navigation panel.
   - The selected entity's data is displayed in a structured table format.
   - The displayed data is always synchronized with the latest backend data.
4. Create and Update Content
   - Users can open a dynamic form based on the selected content entity.
   - The form displays the correct fields required for the selected entity.
   - Users can enter and submit valid data.
   - API requests are triggered only after successful form validation.
5. API Handling and User Feedback
   - Successful create or update operations display meaningful success messages.
   - After a successful create or update operation, the latest entity data is fetched once and displayed in the UI.
   - API failures display meaningful error messages to the user.
   - The application provides proper loading states during API operations.
