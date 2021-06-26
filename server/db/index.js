const db = require("./db");
const Brand = require("./brand");
const Sport = require("./sport");
const Product = require("./product");
const User = require("./user");
const Review = require("./review");
const OrderItem = require("./orderItem");
const CartItem = require("./cartItem");
const ProductCart = require("./productCart");
const Order = require("./order");

// Associations
Product.belongsTo(Brand);
Brand.hasMany(Product);

Product.belongsTo(Sport);
Sport.hasMany(Product);

Product.hasMany(Review);
Review.belongsTo(Product);

Review.belongsTo(User);
User.hasMany(Review);

User.hasMany(Order);
Order.belongsTo(User);

OrderItem.belongsTo(Order);
Order.hasMany(OrderItem);

OrderItem.belongsTo(Product);
Product.hasMany(OrderItem);

CartItem.belongsToMany(Product, { through: ProductCart });
Product.belongsToMany(CartItem, { through: ProductCart });

CartItem.belongsTo(User);
User.hasMany(CartItem)

module.exports = {
  db,
  models: {
    Product,
    Brand,
    Sport,
    Review,
    User,
    Order,
    OrderItem,
    CartItem,
  },
};
