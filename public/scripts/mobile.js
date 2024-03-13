// Select the element with the ID 'mobile-menu-btn'
const mobileMenuBtnElement = document.getElementById('mobile-menu-btn');
// Select the element with the ID 'mobile-menu'
const mobileMenuElement = document.getElementById('mobile-menu');

// Define a function to toggle the mobile menu
function toggleMobileMenu() {
  // Toggle the 'open' class on the mobile menu element
  // If the class is present, it will be removed; if it is absent, it will be added
  mobileMenuElement.classList.toggle('open');
}

// Add a 'click' event listener to the mobile menu button element
// When the button is clicked, the toggleMobileMenu function will be called
mobileMenuBtnElement.addEventListener('click', toggleMobileMenu);
