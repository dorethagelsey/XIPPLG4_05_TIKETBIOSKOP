// login.js - Khusus halaman login

document.addEventListener('DOMContentLoaded', function() {
    // Tambah class khusus untuk body halaman login
    document.body.classList.add('login-page');
    
    // Close button functionality
    const closeButton = document.querySelector('.close-login');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
    
    // Form submission
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validasi form
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulasi login berhasil
            alert('Login successful! Redirecting...');
            window.location.href = 'index.html';
        });
    }
    
    // Register link
    const registerLink = document.getElementById('showRegister');
    if (registerLink) {
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Registration form would appear here');
            // Untuk implementasi nyata, bisa menampilkan modal registrasi
        });
    }
    
    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
            alert(`Redirecting to ${provider} login...`);
            // Untuk implementasi nyata, bisa redirect ke auth provider
        });
    });
});