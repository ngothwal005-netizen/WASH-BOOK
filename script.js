/* =========================================================
   WASH BOOK - JAVASCRIPT (script.js)
   Simple B.Tech CSE 1st Year Level Logic 
   ========================================================= */

// -------------------------------------------------------------
// 1. PAGE SWITCHER FUNCTION
// -------------------------------------------------------------
function goToPage(pageId) {
  // Hide all pages
  var allPages = document.querySelectorAll('.page-section');
  for (var i = 0; i < allPages.length; i++) {
    allPages[i].classList.remove('active');
  }

  // Show the requested page
  var target = document.getElementById(pageId);
  if (target) {
    target.classList.add('active');
  }

  // Hide header on login page, show on all other pages
  var header = document.getElementById('mainHeader');
  if (pageId === 'loginPage') {
    header.style.display = 'none';
  } else {
    header.style.display = 'flex';
  }

  // Scroll to top
  window.scrollTo(0, 0);
}

// -------------------------------------------------------------
// 2. LOGIN FUNCTION (admin / admin123)
// -------------------------------------------------------------
function handleLogin(event) {
  event.preventDefault(); // Stop page refresh

  var user = document.getElementById('loginUsername').value.trim();
  var pass = document.getElementById('loginPassword').value.trim();
  var errorBox = document.getElementById('loginError');

  // Check admin credentials
  if (user === 'admin' && pass === 'admin123') {
    errorBox.style.display = 'none';
    
    // Directly open the Booking Page after login!
    goToPage('bookingPage');
  } else {
    // Show red error message
    errorBox.style.display = 'block';
  }
}

// -------------------------------------------------------------
// 3. DYNAMIC PRICE UPDATE FUNCTION
// -------------------------------------------------------------
function updatePayAmount() {
  var serviceSelect = document.getElementById('bookService');
  var selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
  var price = selectedOption.getAttribute('data-price') || '0';
  document.getElementById('displayAmount').textContent = 'INR ' + price;
}

// -------------------------------------------------------------
// 4. BOOKING AND FAKE PAYMENT RECEIPT GENERATOR
// -------------------------------------------------------------
function handleBooking(event) {
  event.preventDefault(); // Stop page refresh

  // Read form input values
  var name = document.getElementById('customerName').value.trim();
  var phone = document.getElementById('customerPhone').value.trim();
  var vehicle = document.getElementById('bookVehicle').value;
  var service = document.getElementById('bookService').value;
  var payMode = document.getElementById('paymentMode').value;
  var date = document.getElementById('bookDate').value;
  var time = document.getElementById('bookTime').value;
  var address = document.getElementById('bookAddress').value.trim();

  // Get Price from Service
  var serviceSelect = document.getElementById('bookService');
  var selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
  var price = selectedOption.getAttribute('data-price') || '499';

  // 1. Fill Customer and Service Details
  document.getElementById('recName').textContent = name;
  document.getElementById('recPhone').textContent = phone;
  document.getElementById('recVehicle').textContent = vehicle;
  document.getElementById('recDate').textContent = date;
  document.getElementById('recTime').textContent = time;
  document.getElementById('recAddress').textContent = address;

  // 2. Fill Payment and Bill Details
  document.getElementById('recPaymentMode').textContent = payMode;
  document.getElementById('recItemDesc').textContent = service;
  document.getElementById('recBasePrice').textContent = 'INR ' + price;
  document.getElementById('recTotalAmount').textContent = 'INR ' + price;

  // 3. Generate Fake Unique Receipt No. and Transaction ID
  var randomReceiptId = '#WB-REC-' + Math.floor(10000 + Math.random() * 90000);
  var randomTxnId = 'TXN-' + Math.floor(1000000000 + Math.random() * 9000000000);
  document.getElementById('recBookingId').textContent = randomReceiptId;
  document.getElementById('recTxnId').textContent = randomTxnId;

  // 4. Current Fake Payment Timestamp
  var now = new Date();
  var timeString = now.toLocaleDateString() + ', ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  document.getElementById('recPaymentTime').textContent = timeString;

  // 5. Switch to Confirmation Fake Receipt Page
  goToPage('confirmationPage');
}

// -------------------------------------------------------------
// 5. QUICK HELPERS FOR SERVICES AND VEHICLE SELECTION
// -------------------------------------------------------------
function selectServiceFromPage(serviceName) {
  document.getElementById('bookService').value = serviceName;
  updatePayAmount();
  goToPage('bookingPage');
}

function selectVehicleFromPage(vehicleName) {
  document.getElementById('bookVehicle').value = vehicleName;
  goToPage('bookingPage');
}

// -------------------------------------------------------------
// 6. LOGOUT FUNCTION
// -------------------------------------------------------------
function logoutUser() {
  document.getElementById('loginUsername').value = '';
  document.getElementById('loginPassword').value = '';
  document.getElementById('loginError').style.display = 'none';

  // Go back to login page
  goToPage('loginPage');
}

// -------------------------------------------------------------
// 7. INITIAL SETUP ON PAGE LOAD
// -------------------------------------------------------------
window.onload = function() {
  // Set default date to today
  var today = new Date().toISOString().split('T')[0];
  var dateInput = document.getElementById('bookDate');
  if (dateInput) {
    dateInput.min = today;
    dateInput.value = today;
  }

  // Show Login page by default
  goToPage('loginPage');
};
