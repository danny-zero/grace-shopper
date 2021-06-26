const db = require("./db");
const { DataTypes } = require("sequelize");

const ProductCart = db.define("productCart", {
  productId: {
    type: DataTypes.UUID,
  },
  cartItemId: {
    type: DataTypes.UUID,
  },
});

module.exports = ProductCart;
