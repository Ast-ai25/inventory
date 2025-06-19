# UI Component Flow and Architecture

This document outlines the architectural approach for developing the HeartChain Admin Dashboard UI, focusing on centralized components, role-based access, data integration, and a professional design aesthetic.

## 1. Centralized UI Components

The UI will be built using a component-based approach, even without a full-fledged frontend framework (like React/Flutter). This means:

*   **Modular Design:** Each distinct UI element (e.g., Header, Sidebar, Card, Table, Button, Form, Modal) will be conceptually treated as a reusable component.
*   **Separation of Concerns:** HTML structure, CSS styling, and JavaScript logic for each component will be organized logically, even if they reside in separate files or distinct sections within larger files.
*   **Reusability:** Components will be designed to be generic and configurable, allowing them to be used across different parts of the dashboard with minimal modification.

**Directory Structure for UI:**

```
public/
├── index.html                // Main entry point
└── src/
    ├── theme/                // Global styles, theme logic, and utility scripts
    │   ├── style.css         // Core CSS for global styles, typography, palette, and responsive breakpoints
    │   └── script.js         // Global JS for theme switching, utility functions
    └── components/           // Individual UI components (conceptual or actual files)
        ├── Header/
        │   ├── header.html   // HTML snippet for the header
        │   └── header.css    // Specific styles for the header
        │   └── header.js     // Logic for header elements (e.g., logo, user avatar, quick actions)
        ├── Sidebar/
        │   ├── sidebar.html
        │   ├── sidebar.css
        │   └── sidebar.js    // Logic for navigation, role-based menu rendering
        ├── Card/
        │   ├── card.html
        │   ├── card.css
        │   └── card.js       // Generic card structure for data display
        ├── Table/
        │   ├── table.html
        │   ├── table.css
        │   └── table.js      // Responsive table with sorting, filtering, bulk actions
        ├── Button/
        │   ├── button.html
        │   ├── button.css
        │   └── button.js     // Styled buttons with role-based action handling
        └── ... (other components like Form, Modal, AnalyticsCard, ChatWindow, etc.)
```

## 2. Role-Based Access Control in UI

UI components and menu items will dynamically render based on the user's assigned role, which is obtained from the JWT token upon successful authentication.

*   **JWT Payload:** The JWT will contain the user's `role` (e.g., 'admin', 'moderator', 'business_manager', 'pro_user', 'user').
*   **Frontend Logic:** JavaScript will read the user's role from the decoded JWT (stored securely, e.g., in `localStorage` or `sessionStorage` after validation).
*   **Conditional Rendering:**
    *   **Sidebar Menus:** Navigation links in the sidebar will be conditionally displayed based on a mapping of roles to allowed menu items (as defined in `Readme.md`).
    *   **Component Visibility:** Specific UI components or features within components (e.g., "Role Manager" panel, "Ban User" button) will only be visible or enabled if the user's role permits.
    *   **API Interaction:** Frontend actions (e.g., form submissions, button clicks) will only trigger backend API calls if the user's role is authorized for that specific action, preventing unauthorized requests.

## 3. Data Handling and Flow

Data will be fetched from the backend APIs and rendered by the UI components.

*   **Centralized API Calls:** All API interactions will go through a centralized utility or service layer in JavaScript (e.g., `public/src/utils/api.js` - *to be created*). This ensures consistent error handling, authentication header management (JWT), and request/response processing.
*   **Component Data Loading:** Components will be responsible for fetching their own data (or receiving it via a parent component) and rendering it.
*   **Dynamic Updates:** For real-time data (e.g., chat, notifications), WebSockets (if implemented on backend) or periodic polling will be used.

### 3.1 User Data Integration (Completed)

*   **User Listing:** The `users.html` page now fetches real user data from the `/api/users` endpoint using `public/src/theme/script.js`. The `users-table-body` is dynamically populated with this data, replacing dummy content.
*   **User Creation:** The "Add User" functionality is implemented as a modal (`#add-user-modal` in `users.html`). The form within this modal submits data to the `/api/users` endpoint (POST request) via `public/src/theme/script.js`. Form validation is also handled client-side.

## 4. Dynamic Page Loading and Centralized Templates

To achieve a "multi-page" experience within a single-page application (SPA) paradigm, `public/src/utils/uiLoader.js` will be used.

*   **`uiLoader.js` Role:** This utility fetches HTML partials from `public/src/components/` based on navigation clicks and injects them into the `<main class="content"></main>` area of `index.html`.
*   **HTML Partials:** Each "page" (e.g., Dashboard, Users, Analytics) will have its own HTML file (e.g., `dashboard.html`, `users.html`) located in `public/src/components/`. These files contain only the content specific to that page, not the full `html`, `head`, or `body` tags.
*   **Shared Structure:** The `header`, `sidebar`, and global `style.css`/`script.js` (from `public/src/theme/`) remain consistent across all dynamically loaded content, acting as a "centralized template".
*   **Navigation:** Sidebar links use `data-page` attributes (e.g., `data-page="dashboard"`) which `uiLoader.js` reads to determine which HTML partial to load.

## 5. Admin Data Display and Usage

Admin data will be displayed and managed through the dynamically loaded components.

*   **Data Fetching:** When a page (e.g., `users.html`) is loaded, its associated JavaScript (which might be inline within the HTML partial or a separate script loaded by `uiLoader.js`) will trigger API calls to the backend (via `public/src/utils/api.js`).
*   **Data Rendering:** The fetched JSON data will be used to populate HTML elements within the component. For tables, this means dynamically generating `tbody` rows. For cards, updating `p` tags with statistics.
*   **User Interaction:** Forms and buttons within components will capture user input and send it back to the backend via API calls for actions like creating, updating, or deleting data.
*   **Live Search:** The `table-search` input will filter the *currently displayed* table data using client-side JavaScript. For large datasets, this would ideally be integrated with a backend API for server-side filtering.
*   **Role-Based Data Access:** While the UI controls visibility, the backend (via `middleware/role.js`) remains the ultimate authority on what data a user can access or modify. Frontend components will only attempt to display data that the current user's role is expected to access.

## 6. Professional and Attractive UI Design

The UI will aim for a "Meta business dashboard" aesthetic with a "glossy look," focusing on:

*   **Unified Theme:** `public/src/theme/style.css` will define a consistent color palette, typography, spacing, and component-level styling.
*   **Materialistic Design Principles:** Use of shadows, subtle gradients, and clear visual hierarchy to create a sense of depth and professionalism.
*   **Responsive Design:** All components will be designed with mobile-first principles, ensuring optimal display and usability across various screen sizes (desktops, tablets, phones). Media queries will be extensively used.
*   **Dark/Light Theme:** The existing theme switcher will be enhanced with more refined dark mode styles, ensuring all components adapt seamlessly.
*   **Icons:** Integration of a professional icon library (e.g., Font Awesome, Material Icons) to enhance visual clarity and user experience.

### 6.1 UI Refinements (Completed)

*   **"Add User" Form Styling:** The form elements (inputs, selects, buttons) within the "Add User" modal have been styled to align with the glossy theme, including improved padding, rounded corners, subtle shadows, and focus effects.
*   **Search Input Styling:** The search input field in the user table has been refined for better alignment and a more modern, glossy appearance, consistent with the overall theme.

## 7. UI Component Implementation Details (Conceptual)

Each component will follow a similar pattern:

*   **HTML Structure:** Defined in a dedicated HTML partial (e.g., `public/src/components/dashboard.html`).
*   **CSS Styling:** Component-specific styles can be added directly to `public/src/theme/style.css` or, for more complex components, in a dedicated CSS file within `public/src/components/[ComponentName]/style.css` (which would need to be dynamically loaded or bundled). For now, all component styles will reside in `public/src/theme/style.css`.
*   **JavaScript Logic:** Handles component state, user interactions, data fetching, and conditional rendering based on roles. This logic will be part of `public/src/theme/script.js` or dynamically loaded scripts within HTML partials.

**Example: Sidebar Component (Revisited)**

*   `public/index.html`: Contains the main `nav` and `ul` structure for the sidebar.
*   `public/src/theme/style.css`: Styles for the sidebar, menu items, and hover effects.
*   `public/src/theme/script.js`:
    *   Handles mobile menu toggle.
    *   Attaches click listeners to navigation links (`data-page`).
    *   Calls `window.uiLoader.loadContent(page)` to load the appropriate HTML partial.
    *   Fetches user role from `localStorage` and dynamically shows/hides menu items based on a role-permission map.

This architectural approach ensures a scalable, maintainable, and visually appealing UI that aligns with the project's objectives and security requirements.
