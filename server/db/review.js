const db = require("./db");
const Product = require("./product");
const User = require("./user");
const { DataTypes } = require("sequelize");

const Review = db.define("review", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  review: {
    type: DataTypes.TEXT,
    validate: {
      len: [50, 1000],
    },
  },
  rating: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
      max: 5,
    },
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Product,
      key: "id",
    },
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

module.exports = Review;
