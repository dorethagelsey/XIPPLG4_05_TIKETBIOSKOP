document.addEventListener("DOMContentLoaded", () => {
  const seats = document.querySelectorAll(".seat.available");
  const selectedSeatsCount = document.getElementById("selected-seats");
  const totalPriceElem = document.getElementById("total-price");
  const bookBtn = document.getElementById("book-btn");

  const pricePerSeat = 50000; // Harga per kursi
  let selectedSeats = [];

  // Fungsi update tampilan
  function updateDisplay() {
    selectedSeatsCount.textContent = selectedSeats.length;
    totalPriceElem.textContent = (selectedSeats.length * pricePerSeat).toLocaleString('id-ID');
  }

  // Klik pada kursi
  seats.forEach(seat => {
    seat.addEventListener("click", () => {
      if (seat.classList.contains("occupied")) return;

      const seatId = seat.getAttribute("data-seat");

      const index = selectedSeats.indexOf(seatId);
      if (index === -1) {
        // Pilih kursi
        selectedSeats.push(seatId);
        seat.classList.add("selected");
      } else {
        // Batalkan pilihan
        selectedSeats.splice(index, 1);
        seat.classList.remove("selected");
      }

      updateDisplay();
    });
  });

  // Tombol pesan
  bookBtn.addEventListener("click", () => {
    if (selectedSeats.length === 0) {
      alert("Silakan pilih setidaknya satu kursi.");
      return;
    }

    alert(
      `Pemesanan berhasil!\nKursi yang dipilih: ${selectedSeats.join(", ")}\nTotal: Rp ${(
        selectedSeats.length * pricePerSeat
      ).toLocaleString('id-ID')}`
    );

    // Simpan data pemesanan untuk ditampilkan di index.html
    const bookingData = {
      movie: "Avengers: Legacy",
      cinema: "FiveWell Grand Indonesia",
      city: document.getElementById("city-name")?.textContent || "Jakarta",
      studio: document.getElementById("studio")?.textContent || "Studio 1",
      date: document.getElementById("showtime")?.textContent || "Hari Ini, 19:15 WIB",
      seats: selectedSeats,
      total: selectedSeats.length * pricePerSeat,
      timestamp: new Date().toLocaleString('id-ID')
    };

    localStorage.setItem('latestBooking', JSON.stringify(bookingData));

    // Kembali ke halaman utama
    window.location.href = 'index.html';
  });

  // Inisialisasi tampilan
  updateDisplay();
});