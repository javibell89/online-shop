// Select all elements with the class 'cart-item-management'
const cartItemUpdateFormElements = document.querySelectorAll(
  '.cart-item-management'
);
// Select the element with the ID 'cart-total-price'
const cartTotalPriceElement = document.getElementById('cart-total-price');
// Select all elements with the class 'nav-items .badge'
const cartBadgeElements = document.querySelectorAll('.nav-items .badge');

// Define an asynchronous function to update a cart item
async function updateCartItem(event) {
  // Prevent the form from being submitted
  event.preventDefault();

  // Get the form that was submitted
  const form = event.target;

  // Get the product ID, CSRF token, and quantity from the form
  const productId = form.dataset.productid;
  const csrfToken = form.dataset.csrf;
  const quantity = form.firstElementChild.value;

  let response;
  try {
    // Send a PATCH request to the '/cart/items' route
    response = await fetch('/cart/items', {
      method: 'PATCH',
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
        _csrf: csrfToken,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // If an error occurs, show an alert
    alert('Something went wrong!');
    return;
  }

  // If the response is not OK, show an alert
  if (!response.ok) {
    alert('Something went wrong!');
    return;
  }

  // Parse the response data as JSON
  const responseData = await response.json();

  // If the updated item price is 0, remove the item from the cart
  if (responseData.updatedCartData.updatedItemPrice === 0) {
    form.parentElement.parentElement.remove();
  } else {
    // Otherwise, update the item's total price
    const cartItemTotalPriceElement =
      form.parentElement.querySelector('.cart-item-price');
    cartItemTotalPriceElement.textContent =
      responseData.updatedCartData.updatedItemPrice.toFixed(2);
  }

  // Update the total price of the cart
  cartTotalPriceElement.textContent =
    responseData.updatedCartData.newTotalPrice.toFixed(2);
  // Update the quantity of items in the cart
  for (const cartBadgeElement of cartBadgeElements) {
    cartBadgeElement.textContent =
      responseData.updatedCartData.newTotalQuantity;
  }
}

// Add a 'submit' event listener to each form element
for (const formElement of cartItemUpdateFormElements) {
  formElement.addEventListener('submit', updateCartItem);
}
