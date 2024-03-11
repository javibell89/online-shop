// Define a class named 'Cart'
class Cart {
  // Define the constructor for the 'Cart' class
  constructor(items = []) {
    // Initialize the 'items' property of the 'Cart' instance
    this.items = items;
  }

  // Define a method named 'addItem' for the 'Cart' class
  addItem(product) {
    // Create a new cart item with the provided product
    const cartItem = {
      product: product,
      quantity: 1,
      totalPrice: product.price,
    };

    // Loop over the items in the cart
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      // If the product is already in the cart, update the quantity and total price
      if (item.product.id === product.id) {
        cartItem.quantity = item.quantity + 1;
        cartItem.totalPrice = item.totalPrice + product.price;
        this.items[i] = cartItem;
        return;
      }
    }

    // If the product is not in the cart, add it
    this.items.push(cartItem);
  }
}
