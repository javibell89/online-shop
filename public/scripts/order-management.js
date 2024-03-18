// Select all form elements within elements with the class 'order-actions'
const updateOrderFormElements = document.querySelectorAll(
  '.order-actions form',
);

// Define an asynchronous function to update an order
async function updateOrder(event) {
  // Prevent the form from being submitted
  event.preventDefault();

  // Get the form that was submitted
  const form = event.target;

  // Create a new FormData instance from the form
  const formData = new FormData(form);
  // Get the new status, order ID, and CSRF token from the form data
  const newStatus = formData.get('status');
  const orderId = formData.get('orderid');
  const csrfToken = formData.get('_csrf');

  let response;

  try {
    // Send a PATCH request to the '/admin/orders/{orderId}' route
    response = await fetch(`/admin/orders/${orderId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        newStatus,
        _csrf: csrfToken,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // If an error occurs, show an alert
    alert('Something went wrong - could not update order status.');
    return;
  }

  // If the response is not OK, show an alert
  if (!response.ok) {
    alert('Something went wrong - could not update order status.');
    return;
  }

  // Parse the response data as JSON
  const responseData = await response.json();

  // Update the status of the order in the UI
  form.parentElement.parentElement.querySelector('.badge').textContent =
    responseData.newStatus.toUpperCase();
}

// Add a 'submit' event listener to each form element
// When a form is submitted, the updateOrder function will be called
for (const updateOrderFormElement of updateOrderFormElements) {
  updateOrderFormElement.addEventListener('submit', updateOrder);
}
