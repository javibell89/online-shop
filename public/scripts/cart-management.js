// Get the 'Add to Cart' button element
const addToCartButtonElement = document.querySelector(
  '#product-details button'
);

// Get the badge element that displays the total quantity of items in the cart
const cartBadgeElements = document.querySelectorAll('.nav-items .badge');

// Define an asynchronous function to handle adding an item to the cart
async function addToCart() {
  // Get the product ID and CSRF token from the button's data attributes
  const productId = addToCartButtonElement.dataset.productid;
  const csrfToken = addToCartButtonElement.dataset.csrf;

  let response;
  try {
    // Send a POST request to the server to add the item to the cart
    response = await fetch('/cart/items', {
      method: 'POST',
      body: JSON.stringify({ productId: productId, _csrf: csrfToken }),
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // If the request fails, alert the user and exit the function
    alert('Failed to add item to cart');
    return;
  }

  // If the server responds with a non-OK status, alert the user and exit the function
  if (!response.ok) {
    alert('Failed to add item to cart');
    return;
  }

  // Parse the JSON response from the server
  const responseData = await response.json();

  // Get the new total quantity of items in the cart from the response data
  const newTotalQuantity = responseData.newTotalItems;

  // Update the text of the badge to reflect the new total quantity
  for (const cartBadgeElement of cartBadgeElements) {
    cartBadgeElement.textContent = newTotalQuantity;
  }
}

// Add a click event listener to the 'Add to Cart' button that triggers the addToCart function
addToCartButtonElement.addEventListener('click', addToCart);
