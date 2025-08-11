// script.js
document.addEventListener("DOMContentLoaded", () => {
     // Ambil elemen-elemen penting
     const darkModeToggle = document.getElementById("dark-mode-toggle");
     const body = document.body;

     // Cek apakah tombol dark mode ada di halaman
     if (!darkModeToggle) {
          console.warn("Tombol dark mode (id='dark-mode-toggle') tidak ditemukan.");
          return;
     }

     // Fungsi: Terapkan tema berdasarkan preferensi
     const applyTheme = () => {
          const savedTheme = localStorage.getItem("theme");
          const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

          // Jika pengguna sudah pilih tema, gunakan itu
          if (savedTheme === "light") {
               body.classList.remove("dark-mode");
               body.classList.add("light-mode");
               updateToggleIcon("light");
          } else if (savedTheme === "dark") {
               body.classList.remove("light-mode");
               body.classList.add("dark-mode");
               updateToggleIcon("dark");
          } else {
               // Jika belum pernah pilih, ikuti preferensi sistem
               if (prefersDark) {
                    body.classList.add("dark-mode");
                    body.classList.remove("light-mode");
                    updateToggleIcon("dark");
               } else {
                    body.classList.add("light-mode");
                    body.classList.remove("dark-mode");
                    updateToggleIcon("light");
               }
          }
     };

     // Fungsi: Update ikon toggle (opsional: ganti gambar atau simbol)
     const updateToggleIcon = (theme) => {
          // Ganti alt dan src jika ingin ikon berubah
          if (theme === "dark") {
               darkModeToggle.src = "images/sun-icon.png"; // Gunakan ikon matahari
               darkModeToggle.alt = "Light Mode";
          } else {
               darkModeToggle.src = "images/moon-icon.png"; // Gunakan ikon bulan
               darkModeToggle.alt = "Dark Mode";
          }
     };

     // Event: Saat tombol diklik
     darkModeToggle.addEventListener("click", () => {
          if (body.classList.contains("light-mode")) {
               // Ubah ke dark mode
               body.classList.remove("light-mode");
               body.classList.add("dark-mode");
               localStorage.setItem("theme", "dark");
               updateToggleIcon("dark");
          } else {
               // Ubah ke light mode
               body.classList.remove("dark-mode");
               body.classList.add("light-mode");
               localStorage.setItem("theme", "light");
               updateToggleIcon("light");
          }
     });

     // Terapkan tema saat halaman dimuat
     applyTheme();

     // Optional: Deteksi perubahan preferensi sistem (luar dari toggle manual)
     window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
          const currentTheme = localStorage.getItem("theme");
          // Hanya ikuti sistem jika pengguna belum memilih tema
          if (!currentTheme) {
               if (e.matches) {
                    body.classList.add("dark-mode");
                    body.classList.remove("light-mode");
                    updateToggleIcon("dark");
               } else {
                    body.classList.add("light-mode");
                    body.classList.remove("dark-mode");
                    updateToggleIcon("light");
               }
          }
     });
});

// WhatsApp Form Submission - Enhanced Message
document.getElementById("whatsappForm")?.addEventListener("submit", function (e) {
     e.preventDefault();

     const name = document.getElementById("name").value.trim();
     const message = document.getElementById("message").value.trim();

     if (!name || !message) {
          alert("Mohon isi semua kolom.");
          return;
     }

     // Nomor WhatsApp tujuan (ganti dengan nomormu)
     const phoneNumber = "6281128033344"; // Contoh: 6281234567890

     // Format pesan otomatis yang lebih natural
     const defaultGreeting = `Halo, nama saya ${encodeURIComponent(name)}.\n\n`;
     const userMessage = `${encodeURIComponent(message)}`;
     const closing = `\n\nSaya ingin memesan tiket film,yang berujudul BATMAN. Terima kasih!`;

     const fullMessage = defaultGreeting + userMessage + closing;
     const whatsappUrl = `https://wa.me/${phoneNumber}?text=${fullMessage}`;

     window.open(whatsappUrl, "_blank");
});

// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Handle login button click
    const loginButton = document.querySelector('.login-button');
    
    if (loginButton) {
        loginButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Check if we're already on the login page
            if (window.location.pathname.endsWith('login.html')) {
                // If on login page, show the modal
                document.getElementById('loginModal').style.display = 'block';
            } else {
                // Otherwise, navigate to login page
                window.location.href = 'login.html';
            }
        });
    }
    
    // Code for login.html functionality
    if (window.location.pathname.endsWith('login.html')) {
        // Show login modal by default when on login.html
        document.getElementById('loginModal').style.display = 'block';
        
        // Close button functionality
        const closeButtons = document.querySelectorAll('.close-login');
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                this.closest('.login-modal').style.display = 'none';
            });
        });
        
        // Toggle between login and register modals
        const showRegister = document.getElementById('showRegister');
        const showLogin = document.getElementById('showLogin');
        
        if (showRegister) {
            showRegister.addEventListener('click', function(e) {
                e.preventDefault();
                document.getElementById('loginModal').style.display = 'none';
                document.getElementById('registerModal').style.display = 'block';
            });
        }
        
        if (showLogin) {
            showLogin.addEventListener('click', function(e) {
                e.preventDefault();
                document.getElementById('registerModal').style.display = 'none';
                document.getElementById('loginModal').style.display = 'block';
            });
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target.classList.contains('login-modal')) {
                e.target.style.display = 'none';
            }
        });
    }
    
    // Form submission handlers
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your login logic here
            alert('Login functionality would be implemented here');
        });
    }
    
    const registerForm = document.querySelector('#registerModal .login-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your registration logic here
            alert('Registration functionality would be implemented here');
        });
    }
});