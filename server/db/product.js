const db = require("./db");
const Brand = require("./brand");
const Sport = require("./sport");
const { DataTypes } = require("sequelize");

const Product = db.define("product", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: DataTypes.DECIMAL,
    validate: {
      min: 0.0,
    },
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: false,
    },
  },
  photoSrc: {
    type: DataTypes.STRING,
    defaultValue: "public/logo-no-text.PNG",
  },
  inventory: {
    type: DataTypes.JSONB,
  },
  brandId: {
    type: DataTypes.UUID,
    references: {
      model: Brand,
      key: "id",
    },
    validate: {
      hasCategory(value) {
        if (!value && !this.sportId) {
          throw new Error("brandId and sportId cannot both be null");
        }
      },
    },
  },
  sportId: {
    type: DataTypes.UUID,
    references: {
      model: Sport,
      key: "id",
    },
    validate: {
      hasCategory(value) {
        if (value === null && this.brandId === null) {
          throw new Error("brandId and sportId cannot both be null");
        }
      },
    },
  },
});

module.exports = Product;
