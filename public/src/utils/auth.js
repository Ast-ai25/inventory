class Auth {
  static async checkAuth() {
    const authHeader = localStorage.getItem('token');
    if (!authHeader) {
      this.redirectToLogin();
      return false;
    }

    try {
      console.log('Auth Header:', authHeader);
      const response = await fetch('/api/auth/verify', {
        headers: { 
          'Authorization': authHeader,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        console.error('Auth verification failed with status:', response.status);
        this.clearSession();
        this.redirectToLogin();
        return false;
      }
      const data = await response.json();
      console.log('Auth verification success:', data);
      if (data.user && data.user.Role && data.user.Role.Permissions) {
        localStorage.setItem('permissions', JSON.stringify(data.user.Role.Permissions.map(p => p.name)));
        return true;
      }
      console.error('Invalid user data structure:', data);
      this.clearSession();
      this.redirectToLogin();
      return false;
    } catch (error) {
      console.error('Auth verification failed:', error);
      this.clearSession();
      this.redirectToLogin();
      return false;
    }
  }

  static clearSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('permissions');
  }

  static redirectToLogin() {
    window.location.href = '/';
  }

  static hasPermission(requiredPermission) {
    const permissions = JSON.parse(localStorage.getItem('permissions') || '[]');
    // Check both singular and plural forms for backward compatibility
    if (permissions.includes(requiredPermission)) {
      return true;
    }
    // Handle plural/singular variations
    if (requiredPermission.endsWith('s')) {
      const singular = requiredPermission.slice(0, -1);
      return permissions.includes(singular);
    } else {
      const plural = requiredPermission + 's';
      return permissions.includes(plural);
    }
  }

  static getCurrentUser() {
    const authHeader = localStorage.getItem('token');
    if (!authHeader) return null;

    try {
      const token = authHeader.replace('Bearer ', '');
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.id,
        email: payload.email,
        role: payload.role
      };
    } catch (error) {
      console.error('Failed to parse token:', error);
      return null;
    }
  }
}

// Initialize auth check on dashboard load
document.addEventListener('DOMContentLoaded', async () => {
  if (window.location.pathname !== '/' && !await Auth.checkAuth()) {
    return;
  }
});
