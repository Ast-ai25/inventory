class Sidebar {
    constructor() {
        this.menuItems = [
            { title: 'Dashboard', icon: 'fa-home', route: '/dashboard.html', permission: 'read_dashboard' },
            { title: 'Users', icon: 'fa-users', route: '/users.html', permission: 'read_user' },
            { title: 'Roles', icon: 'fa-user-tag', route: '/roles.html', permission: 'read_role' },
            { title: 'Permissions', icon: 'fa-shield-alt', route: '/permissions.html', permission: 'read_permission' },
            { title: 'Inventory', icon: 'fa-warehouse', route: '/inventories.html', permission: 'read_inventory' },
            { title: 'Brands', icon: 'fa-copyright', route: '/brands.html', permission: 'read_brand' },
            { title: 'Suppliers', icon: 'fa-truck', route: '/suppliers.html', permission: 'read_supplier' },
            { title: 'Sales', icon: 'fa-dollar-sign', route: '/sales.html', permission: 'read_sale' },
            { title: 'Purchases', icon: 'fa-shopping-cart', route: '/purchases.html', permission: 'read_purchase' },
            { title: 'Notifications', icon: 'fa-bell', route: '/notifications.html', permission: 'read_notification' },
            { title: 'Suppliers', icon: 'fa-truck', route: '/suppliers.html', permission: 'read_supplier' },
            { title: 'Companies', icon: 'fa-building', route: '/companies.html', permission: 'read_company' },
            { title: 'Company Branches', icon: 'fa-code-branch', route: '/company-branches.html', permission: 'read_company_branch' },
            { title: 'Expenses', icon: 'fa-receipt', route: '/expenses.html', permission: 'read_expense' },
            { title: 'Inventory Items', icon: 'fa-warehouse', route: '/inventories.html', permission: 'read_inventory' },
            { title: 'Invoices', icon: 'fa-file-invoice-dollar', route: '/invoices.html', permission: 'read_invoice' },
            { title: 'RMA', icon: 'fa-undo', route: '/rma.html', permission: 'read_rma' },
            { title: 'Portal Staff', icon: 'fa-user-shield', route: '/portal-staff.html', permission: 'read_portal_staff' },
            {
                title: 'Global',
                icon: 'fa-globe',
                permission: 'read_country',
                children: [
                    { title: 'Packages Details', icon: 'fa-globe', route: '/package_module_permissions.html', permission: 'read_package_module_permissions' },
                    { title: 'Modules', icon: 'fa-globe', route: '/modules.html', permission: 'read_module' },
                    { title: 'Packages', icon: 'fa-globe', route: '/packages.html', permission: 'read_package' },
                    { title: 'Services', icon: 'fa-globe', route: '/services.html', permission: 'read_service' },
                    { title: 'Deliveries', icon: 'fa-globe', route: '/deliveries.html', permission: 'read_delivery' },
                    { title: ' Payment Modes', icon: 'fa-globe', route: '/payment_modes.html', permission: 'read_payment_mode' },
                    { title: 'charges', icon: 'fa-globe', route: '/charges.html', permission: 'read_charge' },
                    { title: 'TAX', icon: 'fa-globe', route: '/taxes.html', permission: 'read_tax' },
                    { title: 'Measure Units', icon: 'fa-ruler-combined', route: '/measure_units.html', permission: 'read_measure_unit' },
                    { title: 'Package Units', icon: 'fa-box', route: '/package_units.html', permission: 'read_package_unit' },
                    { title: 'Products', icon: 'fa-boxes', route: '/products.html', permission: 'read_product' },
                    { title: 'Subcategories', icon: 'fa-layer-group', route: '/subcategory.html', permission: 'read_subcategory' },
                    { title: 'Categories', icon: 'fa-tags', route: '/categories.html', permission: 'read_category' },
                    { title: 'Company User Types', icon: 'fa-user-tag', route: '/company_user_types.html', permission: 'read_company_user_type' },
                    { title: 'Company Departments', icon: 'fa-sitemap', route: '/company_departments.html', permission: 'read_company_department' },
                    { title: 'Company Types', icon: 'fa-building', route: '/company_types.html', permission: 'read_company_type' },
                    { title: 'Assign Currencies', icon: 'fa-dollar-sign', route: '/currency-availabilities.html', permission: 'read_currency_availability' },
                    { title: 'Currencies', icon: 'fa-dollar-sign', route: '/currencies.html', permission: 'read_currency' },
                    { title: 'Assign Languages', icon: 'fa-language', route: '/language-availabilities.html', permission: 'read_language_availability' },
                    { title: 'Languages', icon: 'fa-language', route: '/languages.html', permission: 'read_language' },
                    { title: 'Cities', icon: 'fa-city', route: '/cities.html', permission: 'read_city' },
                    { title: 'States', icon: 'fa-map-marked-alt', route: '/states.html', permission: 'read_state' },
                    { title: 'Countries', icon: 'fa-globe', route: '/countries.html', permission: 'read_country' },

                ]
            },

        ];
    }

    async render() {
        const response = await fetch('/src/components/Sidebar/sidebar.html');
        const template = await response.text();
        const sidebarEl = document.createElement('div');
        sidebarEl.innerHTML = template;

        const menuEl = sidebarEl.querySelector('#sidebar-menu');
        const currentPage = window.location.pathname;

        menuEl.innerHTML = this.menuItems
            .filter(item => Auth.hasPermission(item.permission))
            .map(item => {
                if (item.children) {
                    const hasActiveChild = item.children.some(child =>
                        currentPage.includes(child.route) && Auth.hasPermission(child.permission)
                    );
                    return `
                        <li class="list-group-item">
                            <a href="#" data-bs-toggle="collapse" data-bs-target="#global-submenu" 
                               aria-expanded="${hasActiveChild ? 'true' : 'false'}" 
                               class="d-flex justify-content-between align-items-center">
                                <span><i class="fas ${item.icon} me-2"></i>${item.title}</span>
                                <i class="fas fa-chevron-${hasActiveChild ? 'up' : 'down'}"></i>
                            </a>
                            <div class="collapse ${hasActiveChild ? 'show' : ''}" id="global-submenu">
                                <ul class="list-group list-group-flush">
                                    ${item.children
                            .filter(child => Auth.hasPermission(child.permission))
                            .map(child => `
                                            <li class="list-group-item ${currentPage.includes(child.route) ? 'active' : ''}">
                                                <a href="${child.route}">
                                                    <i class="fas ${child.icon} me-2"></i><span>${child.title}</span>
                                                </a>
                                            </li>
                                        `).join('')}
                                </ul>
                            </div>
                        </li>
                    `;
                } else {
                    return `
                        <li class="list-group-item ${currentPage.includes(item.route) ? 'active' : ''}">
                            <a href="${item.route}">
                                <i class="fas ${item.icon} me-2"></i><span>${item.title}</span>
                            </a>
                        </li>
                    `;
                }
            }).join('');

        return sidebarEl.firstElementChild;
    }
}

window.Sidebar = Sidebar;
