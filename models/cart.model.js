// Define a Cart class
class Cart {
  // The constructor initializes the cart with an array of items, total quantity, and total price
  constructor(items = [], totalQuantity = 0, totalPrice = 0) {
    this.items = items;
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
  }

  // The addItem method adds a product to the cart
  addItem(product) {
    // Create a new cart item with the product, a quantity of 1, and the product's price as the total price
    const cartItem = {
      product: product,
      quantity: 1,
      totalPrice: product.price,
    };

    // Loop through the existing items in the cart
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      // If the product is already in the cart, increment the quantity and total price of the cart item
      if (item.product.id === product.id) {
        cartItem.quantity = item.quantity + 1;
        cartItem.totalPrice = item.totalPrice + product.price;
        this.items[i] = cartItem;

        // Also increment the total quantity and total price of the cart
        this.totalQuantity++;
        this.totalPrice += product.price;
        return;
      }
    }

    // If the product is not already in the cart, add the new cart item to the items array
    this.items.push(cartItem);
    // And increment the total quantity and total price of the cart
    this.totalQuantity++;
    this.totalPrice += product.price;
  }
}

// Export the Cart class
module.exports = Cart;
