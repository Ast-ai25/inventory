class Sidebar {
  static async init() {
    // Inject sidebar HTML
    this.menuItems = [
      {
        title: 'Dashboard',
        icon: 'fa-home',
        route: '/dashboard.html',
        permission: 'read_dashboard'
      },
      {
        title: 'User Management',
        icon: 'fa-users',
        route: '/users.html',
        permission: 'user_management'
      },
      {
        title: 'Product Management',
        icon: 'fa-boxes',
        route: '/products.html',
        permission: 'product_management'
      },
      {
        title: 'Inventory',
        icon: 'fa-warehouse',
        route: '/inventory.html',
        permission: 'inventory_management'
      }
    ];

    this.renderMenu();
    this.bindEvents();
  }

  static renderMenu() {
    const menuEl = document.querySelector('.sidebar-menu');
    if (!menuEl) return;

    menuEl.innerHTML = this.menuItems
      .filter(item => Auth.hasPermission(item.permission))
      .map(item => `
        <li data-route="${item.route}">
          <i class="fas ${item.icon}"></i>
          <span>${item.title}</span>
        </li>
      `).join('');
  }

  static bindEvents() {
    document.addEventListener('click', (e) => {
      const li = e.target.closest('.sidebar-menu li');
      if (li) {
        const route = li.dataset.route;
        if (route) window.location.href = route;
      }
    });
  }
}

// Initialize sidebar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (Auth.getCurrentUser()) {
    Sidebar.init();
    // Add content padding to account for sidebar
    const content = document.querySelector('.content');
    if (content) {
      content.style.marginLeft = '250px';
      content.style.padding = '20px';
    }
  }
});
