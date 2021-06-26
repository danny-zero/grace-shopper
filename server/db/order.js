const db = require("./db");
const { DataTypes } = require("sequelize");

const Order = db.define("order", {
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  shippingAddress: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: true,
    },
  },
  status: {
    type: DataTypes.ENUM(["Created", "Processing", "Cancelled", "Completed"]),
  }
});

module.exports = Order;
