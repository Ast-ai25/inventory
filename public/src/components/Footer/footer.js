class Footer {
    async render() {
        const response = await fetch('/src/components/Footer/footer.html');
        const template = await response.text();
        const footerEl = document.createElement('div');
        footerEl.innerHTML = template;
        return footerEl.firstElementChild;
    }
}
