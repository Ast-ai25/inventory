class Header {
    async render() {
        const response = await fetch('/src/components/Header/header.html');
        const template = await response.text();
        const headerEl = document.createElement('div');
        headerEl.innerHTML = template;

        this.bindEvents(headerEl);
        return headerEl.firstElementChild;
    }

    bindEvents(element) {
        const sidebarCollapse = element.querySelector('#sidebarCollapse');
        const logoutBtn = element.querySelector('#logout-btn');

        sidebarCollapse.addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('active');
        });

        logoutBtn.addEventListener('click', () => {
            Auth.logout();
        });
    }
}
