# UI Architecture Documentation

## 1. Application Structure

### Layout Components
- **Main Layout**: `public/layout.html`
  - Dynamic content injection via `{{content}}`
  - Core scripts loaded: auth, sidebar, header, footer, table, modal

- **App Initialization**: `public/src/main.js`
  - Component initialization order: Sidebar → Header → Footer
  - Layout structure:
    ```html
    <div class="main-wrapper">
      ${sidebarEl.outerHTML}
      <div id="content" class="flex-grow-1">
        ${headerEl.outerHTML}
        <div class="container-fluid">
          ${mainContent}
        </div>
        ${footerEl.outerHTML}
      </div>
    </div>
    ```

## 2. Authentication System

### Frontend (`public/src/utils/auth.js`)
- JWT token storage in localStorage
- Permission checking via `hasPermission(requiredPermission)`
- Current user extraction from JWT payload
- Automatic redirect to login when unauthorized

### Backend (`src/middleware/authMiddleware.js`)
- JWT verification with `process.env.JWT_SECRET`
- User lookup with Role and Permission associations
- Permission checking middleware:
  ```javascript
  exports.checkPermission = (requiredPermission) => {
    return async (req, res, next) => {
      const hasPermission = req.user.Role.Permissions.some(rp => 
        rp.Permission.name === requiredPermission
      );
      if (!hasPermission) return res.status(403).json(...);
      next();
    };
  };
  ```

## 3. Navigation & Permissions

### Sidebar (`public/src/components/Sidebar/sidebar.js`)
- Menu items structure:
  ```javascript
  {
    title: 'Dashboard',
    icon: 'fa-home',
    route: '/dashboard.html',
    permission: 'read_dashboard'
  }
  ```
- Permission filtering: `Auth.hasPermission(item.permission)`
- Active page highlighting based on current route

## 4. Countries Page Implementation

### Frontend (`public/countries.html`)
- Main components:
  - TableComponent for data display
  - ModalComponent for add/edit forms
- Data flow:
  1. Fetch countries from `/api/countries`
  2. Render via TableComponent
  3. Handle CRUD operations through API calls

### Backend (`src/controllers/countryController.js`)
- Standard CRUD operations:
  - `createCountry`
  - `getAllCountries`
  - `getCountryById`
  - `updateCountry`
  - `deleteCountry`

## 5. Data Display Patterns

### TableComponent (`public/src/components/Table/TableComponent.js`)
- Features:
  - Configurable columns with accessor paths
  - Built-in search functionality
  - Edit/delete action handlers
  - Real-time data updates via `updateData()`

### ModalComponent Usage
- Form handling pattern:
  ```javascript
  modal = new ModalComponent('country-modal', 'Country', [
    { id: 'country-name', label: 'Country Name', type: 'text' },
    { id: 'country-code', label: 'Country Code', type: 'text' }
  ], handleSave);
  ```

## 6. Key Integration Points

1. **Authentication Flow**:
   - Frontend: Stores token and permissions
   - Backend: Validates token and checks permissions

2. **Data Flow**:
   - API calls → Controller → Model → Response → TableComponent

3. **Permission System**:
   - Role-Permission associations
   - Middleware protection on routes
   - Frontend menu filtering

## 7. Important Patterns to Maintain

1. **Component Initialization**:
   - Wait for `app:layout-ready` event
   - Follow main.js initialization sequence

2. **Error Handling**:
   - Consistent API error responses
   - Frontend error logging

3. **State Management**:
   - JWT in localStorage
   - Permission caching
   - Real-time data updates
