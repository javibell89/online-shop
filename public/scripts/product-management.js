// Select all button elements within elements with the class 'product-item'
const deleteProductButtonElements = document.querySelectorAll(
  '.product-item button'
);

// Define an asynchronous function to delete a product
async function deleteProduct(event) {
  // Get the button that was clicked
  const buttonElement = event.target;
  // Get the product ID and CSRF token from the button's data attributes
  const productId = buttonElement.dataset.productid;
  const csrfToken = buttonElement.dataset.csrf;

  // Send a DELETE request to the '/admin/products/{productId}' route
  const response = await fetch(
    '/admin/products/' + productId + '?_csrf=' + csrfToken,
    {
      method: 'DELETE',
    }
  );

  // If the response is not OK, show an alert
  if (!response.ok) {
    alert('Something went wrong');
    return;
  }

  // Remove the product's element from the DOM
  buttonElement.parentElement.parentElement.parentElement.parentElement.remove();
}

// Add a 'click' event listener to each delete product button element
// When a button is clicked, the deleteProduct function will be called
for (const deleteProductButtonElement of deleteProductButtonElements) {
  deleteProductButtonElement.addEventListener('click', deleteProduct);
}
