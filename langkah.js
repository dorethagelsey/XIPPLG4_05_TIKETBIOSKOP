document.addEventListener('DOMContentLoaded', function() {
  // Initialize variables
  let selectedCity = '';
  let selectedCinema = '';
  let selectedDate = '';
  let selectedTime = '';
  let selectedSeats = [];
  const seatPriceRegular = 35000;
  const seatPriceVIP = 55000;
  const adminFee = 2500;

  // Step navigation
  const steps = document.querySelectorAll('.selection-steps .step');
  const stepContents = document.querySelectorAll('.selection-content');
  
  steps.forEach(step => {
    step.addEventListener('click', function() {
      const stepNumber = this.dataset.step;
      navigateToStep(stepNumber);
    });
  });

  function navigateToStep(stepNumber) {
    // Update active step
    steps.forEach(step => {
      step.classList.remove('active');
      if (step.dataset.step === stepNumber) {
        step.classList.add('active');
      }
    });

    // Update active content
    stepContents.forEach(content => {
      content.classList.remove('active');
      if (content.id === `step${stepNumber}-content`) {
        content.classList.add('active');
      }
    });
  }

  // City selection
  const cityCards = document.querySelectorAll('.city-card');
  cityCards.forEach(card => {
    card.addEventListener('click', function() {
      selectedCity = this.dataset.city;
      document.getElementById('selectedCity').textContent = this.querySelector('h3').textContent;
      navigateToStep('2');
    });
  });

  // Search city
  const citySearch = document.getElementById('citySearch');
  citySearch.addEventListener('input', () => {
    const filter = citySearch.value.toLowerCase();
    cityCards.forEach(card => {
      const city = card.querySelector('h3').textContent.toLowerCase();
      card.style.display = city.includes(filter) ? 'block' : 'none';
    });
  });

  // Cinema selection
  const cinemaCards = document.querySelectorAll('.cinema-card');
  cinemaCards.forEach(card => {
    const selectBtn = card.querySelector('.select-cinema-btn');
    selectBtn.addEventListener('click', function() {
      selectedCinema = card.dataset.cinema;
      document.getElementById('selectedCinema').textContent = card.querySelector('h4').textContent;
      navigateToStep('3');
    });
  });

  // Date selection
  const dateOptions = document.querySelectorAll('.date-option');
  dateOptions.forEach(option => {
    option.addEventListener('click', function() {
      dateOptions.forEach(opt => opt.classList.remove('active'));
      this.classList.add('active');
      selectedDate = this.querySelector('span:last-child').textContent;
    });
  });

  // Time selection
  const timeOptions = document.querySelectorAll('.time-option');
  timeOptions.forEach(option => {
    option.addEventListener('click', function() {
      timeOptions.forEach(opt => opt.classList.remove('selected'));
      this.classList.add('selected');
      selectedTime = this.textContent;
      
      // Update movie info in seat selection
      const activeDate = document.querySelector('.date-option.active span:last-child').textContent;
      document.getElementById('selectedDateTime').textContent = 
        `${activeDate} 2023 • ${selectedTime} WIB`;
      
      // Initialize seat map
      initializeSeatMap();
      navigateToStep('4');
    });
  });

  // Initialize seat map
  function initializeSeatMap() {
    const seatMap = document.getElementById('seatMap');
    seatMap.innerHTML = '';
    selectedSeats = [];
    updateSelectedSeatsDisplay();
    
    // Create seats (A-J, 1-10)
    for (let row = 0; row < 10; row++) {
      for (let num = 1; num <= 10; num++) {
        const seatLetter = String.fromCharCode(65 + row);
        const seatNumber = num;
        const seatId = `${seatLetter}${seatNumber}`;
        
        const isBooked = Math.random() < 0.2;
        const isVip = row < 2;
        
        const seat = document.createElement('div');
        seat.className = `seat ${isBooked ? 'booked' : 'available'} ${isVip ? 'vip' : ''}`;
        seat.textContent = seatId;
        seat.dataset.id = seatId;
        seat.dataset.price = isVip ? seatPriceVIP : seatPriceRegular;
        
        if (!isBooked) {
          seat.addEventListener('click', toggleSeatSelection);
        }
        
        seatMap.appendChild(seat);
      }
    }
  }

  function toggleSeatSelection(e) {
    const seat = e.target;
    const seatId = seat.dataset.id;
    const seatPrice = parseInt(seat.dataset.price);
    
    if (seat.classList.contains('selected')) {
      seat.classList.remove('selected');
      seat.classList.add('available');
      selectedSeats = selectedSeats.filter(s => s.id !== seatId);
    } else {
      seat.classList.remove('available');
      seat.classList.add('selected');
      selectedSeats.push({ id: seatId, price: seatPrice });
    }
    
    updateSelectedSeatsDisplay();
  }

  function updateSelectedSeatsDisplay() {
    const selectedSeatsDisplay = document.getElementById('selectedSeatsDisplay');
    const ticketCount = document.getElementById('ticketCount');
    const ticketPrice = document.getElementById('ticketPrice');
    const totalPrice = document.getElementById('totalPrice');
    const continueBtn = document.querySelector('.continue-btn');
    
    if (selectedSeats.length > 0) {
      selectedSeatsDisplay.textContent = selectedSeats.map(s => s.id).join(', ');
      ticketCount.textContent = selectedSeats.length;
      
      const subtotal = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
      ticketPrice.textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
      
      const total = subtotal + adminFee;
      totalPrice.textContent = `Rp ${total.toLocaleString('id-ID')}`;
      
      continueBtn.disabled = false;
    } else {
      selectedSeatsDisplay.textContent = '-';
      ticketCount.textContent = '0';
      ticketPrice.textContent = 'Rp 0';
      totalPrice.textContent = 'Rp 0';
      continueBtn.disabled = true;
    }
  }

  // Back buttons
  const backBtn = document.querySelector('.back-btn');
  backBtn.addEventListener('click', function() {
    const currentStep = document.querySelector('.selection-content.active').id;
    const stepNumber = parseInt(currentStep.replace('step', '').replace('-content', ''));
    if (stepNumber > 1) {
      navigateToStep(stepNumber - 1);
    }
  });

  // Continue to payment
  const continueBtn = document.querySelector('.continue-btn');
  continueBtn.addEventListener('click', function() {
    if (selectedSeats.length === 0) return;
    const total = selectedSeats.reduce((sum, s) => sum + s.price, 0) + adminFee;
    alert(`Pembayaran untuk ${selectedSeats.length} tiket akan diproses.\nTotal: Rp ${total.toLocaleString('id-ID')}`);
    // Di sini bisa redirect ke halaman pembayaran
  });

  // Initialize
  navigateToStep('1');
});