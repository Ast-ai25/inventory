class App {
    constructor() {
        this.appContainer = document.getElementById('app');
        if (!this.appContainer) {
            console.error('App container not found');
            return;
        }
        this.initComponents();
    }

    async initComponents() {
        const sidebar = new Sidebar();
        const header = new Header();
        const footer = new Footer();

        const sidebarEl = await sidebar.render();
        const headerEl = await header.render();
        const footerEl = await footer.render();

        const mainContent = this.appContainer.querySelector('#page-content');

        const layout = `
            <div class="main-wrapper">
                ${sidebarEl.outerHTML}
                <div id="content" class="flex-grow-1">
                    ${headerEl.outerHTML}
                    <div class="container-fluid">
                        ${mainContent ? mainContent.innerHTML : ''}
                    </div>
                    ${footerEl.outerHTML}
                </div>
            </div>
        `;

        this.appContainer.innerHTML = layout;
        header.bindEvents(this.appContainer);

        // Dispatch a custom event to signal that the layout is ready
        const event = new CustomEvent('app:layout-ready');
        document.dispatchEvent(event);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (Auth.getCurrentUser()) {
        new App();
    }
});
