const db = require("./db");
const { DataTypes } = require("sequelize");
const { User } = require("./user")

const CartItem = db.define("cartItem", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
    },
  },
  size: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
});

module.exports = CartItem;
