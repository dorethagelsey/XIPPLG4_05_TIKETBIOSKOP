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
