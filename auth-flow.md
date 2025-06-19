# Authentication Flow Documentation

## Current Implementation

### Models
- `user.model.js`: Handles user CRUD operations and password verification
- `session.model.js`: Manages user sessions (currently unused)

### Controllers
- `auth.controller.js`: Handles login, register, logout, token refresh
- `user.controller.js`: Manages user profile operations

### Routes
- `auth.routes.js`: Routes for authentication endpoints
- `user.routes.js`: Routes for user profile operations

### Middleware
- `auth.js`: JWT verification middleware
- `errorHandler.js`: Centralized error handling

### Utilities
- `hashUtil.js`: Password hashing/verification
- `jwtUtil.js`: Token generation/verification

## Missing Components

1. **Registration**
   - POST /api/auth/register
   - Validates input
   - Hashes password
   - Creates user record
   - Returns tokens

2. **Login**  
   - POST /api/auth/login
   - Verifies credentials
   - Generates tokens
   - Creates session record (TODO)

3. **Protected Routes**
   - Uses auth middleware
   - Verifies access token
   - Attaches user to request

4. **Token Refresh**
   - POST /api/auth/refresh-token
   - Verifies refresh token
   - Issues new access token

5. **Logout**
   - POST /api/auth/logout
   - Invalidates tokens (TODO)
   - Clears session (TODO)

## Role-Based Access Control (Implemented)

1. Role Verification Flow
   - Uses role.js middleware
   - Permission.js
   - Checks user roles from JWT
   - Protects admin routes
   - Required roles:
     - Admin: Full access
     - Moderator: Limited admin access

2. Protected Admin Routes
   - GET /api/admin/stats (admin role)
   - GET /api/admin/reports (admin/moderator roles)
   - Uses User and Report models for data

3. Implementation Details
   - Middleware: role.js
   - Models: user.model.js, report.model.js
   - Services: admin.service.js
   - Controllers: admin.controller.js
   - Routes: admin.routes.js



1. Session Management (Fully Implemented)
   - Working implementation in session.model.js
   - Successfully stores sessions in user_sessions table
   - Tracks device info, IP addresses and timestamps
   - Verified with test user (ID: 1)

2. Token Blacklisting (Partial)
   - Tokens invalidated via session deletion
   - No separate blacklist storage yet

3. Rate Limiting
   - Already have middleware but needs configuration
   - Should protect auth endpoints

4. Password Reset
   - Currently not implemented
   - Need email service integration

## Recommendations

1. Session management now fully implemented
2. Add token blacklist service
3. Configure rate limiting for auth routes
4. Add password reset functionality
5. Add comprehensive logging
