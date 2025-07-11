document.addEventListener('DOMContentLoaded', () => {
    // Only run login code on login page
    if (window.location.pathname.includes('/index.html')) {
        const loginForm = document.getElementById('loginForm');
        const errorMessage = document.getElementById('errorMessage');

        return;
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Store token with Bearer prefix, permissions and redirect
            localStorage.setItem('token', `Bearer ${data.token}`);
            localStorage.setItem('permissions', JSON.stringify(data.user.permissions || []));
            window.location.href = '/dashboard.html';
        } catch (error) {
            errorMessage.textContent = error.message;
        }
    });
});
