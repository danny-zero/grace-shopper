const db = require("./db");
const { DataTypes } = require("sequelize");

const OrderItem = db.define("orderItem", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  price: {
    type: DataTypes.DECIMAL,
    validate: {
      min: 0.0,
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
});

module.exports = OrderItem;
