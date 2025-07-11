function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Initialize toast container
document.addEventListener('DOMContentLoaded', () => {
    const toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    document.body.appendChild(toastContainer);
});

// Add CSS for toasts
const style = document.createElement('style');
style.textContent = `
    .toast {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 4px;
        color: white;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
    }
    .toast.show {
        opacity: 1;
    }
    .toast-success {
        background-color: #28a745;
    }
    .toast-error {
        background-color: #dc3545;
    }
    .toast-warning {
        background-color: #ffc107;
        color: #212529;
    }
`;
document.head.appendChild(style);
