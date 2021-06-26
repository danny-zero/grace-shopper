const db = require("./db");
const { DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {models: {Order, Review } } = require('./db');

const User = db.define("user", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  address: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
});

User.authenticate = async function (username, password) {
  const user = await User.findOne({ where: { username } });
  const matched = user && await bcrypt.compare(password, user.password);
  if (matched) {
    console.log('MADE IT TO MATCHED?')
    return jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET);
  }
  const error = new Error("bad credentials");
  error.status = 401;
  throw error;
};

User.byToken = async function (token) {
  try {
    const { id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // const user = await User.findByPk(id, {include: [Order, Review]});
    const user = await User.findByPk(id);
    console.log('byToken User', user)
    if (user) return user;
    const error = new Error("bad credentials");
    error.status = 401;
    throw error;
  } catch (ex) {
    const error = new Error("bad credentials");
    error.status = 401;
    throw error;
  }
};

User.addHook('beforeSave', async function(user) {
    if(user._changed.has('password')) {
        user.password = await bcrypt.hash(user.password, 5)
    }
});

module.exports = User;
