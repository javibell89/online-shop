const Product = require('./product.model');

class Cart {
  constructor(items = [], totalQuantity = 0, totalPrice = 0) {
    this.items = items;
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
  }

  async updatePrices() {
    const productIds = this.items.map((item) => item.product.id);
    const products = await Product.findMultiple(productIds);
    const deletableCartItemProductIds = [];

    this.items = this.items
      .map((cartItem) => {
        const product = products.find(
          (prod) => prod.id === cartItem.product.id,
        );

        if (!product) {
          deletableCartItemProductIds.push(cartItem.product.id);
          return cartItem;
        }

        return {
          ...cartItem,
          product,
          totalPrice: cartItem.quantity * product.price,
        };
      })
      .filter((item) => !deletableCartItemProductIds.includes(item.product.id));

    const totals = this.items.reduce(
      (acc, item) => ({
        totalQuantity: acc.totalQuantity + item.quantity,
        totalPrice: acc.totalPrice + item.totalPrice,
      }),
      { totalQuantity: 0, totalPrice: 0 },
    );

    this.totalQuantity = totals.totalQuantity;
    this.totalPrice = totals.totalPrice;
  }

  addItem(product) {
    const existingItemIndex = this.items.findIndex(
      (item) => item.product.id === product.id,
    );

    if (existingItemIndex >= 0) {
      const existingItem = this.items[existingItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
        totalPrice: existingItem.totalPrice + product.price,
      };
      this.items[existingItemIndex] = updatedItem;
      this.totalQuantity += 1;
      this.totalPrice += product.price;
      return;
    }

    const cartItem = {
      product,
      quantity: 1,
      totalPrice: product.price,
    };
    this.items.push(cartItem);
    this.totalQuantity += 1;
    this.totalPrice += product.price;
  }

  updateItem(productId, newQuantity) {
    const itemIndex = this.items.findIndex(
      (item) => item.product.id === productId,
    );

    if (itemIndex >= 0) {
      const item = this.items[itemIndex];

      if (newQuantity <= 0) {
        this.items.splice(itemIndex, 1);
        this.totalQuantity -= item.quantity;
        this.totalPrice -= item.totalPrice;
        return { updatedItemPrice: 0 };
      }

      const quantityChange = newQuantity - item.quantity;
      const cartItem = {
        ...item,
        quantity: newQuantity,
        totalPrice: newQuantity * item.product.price,
      };

      this.items[itemIndex] = cartItem;
      this.totalQuantity += quantityChange;
      this.totalPrice += quantityChange * item.product.price;

      return { updatedItemPrice: cartItem.totalPrice };
    }
  }
}

module.exports = Cart;
