const router = require("express").Router();
const app = require("../app");
// const User = require("../db/user");
const { models: { User, Order, Review } } = require('../db');

router.post("/auth", async (req, res, next) => {
  try {
    console.log('login?', req.body)
    const { email, password } = req.body;
    console.log(`email: ${email}, password: ${password}`)
    const token = await User.authenticate(email, password);
    console.log("did we get the token?", token)
    res.send({ token });
  } catch (ex) {
    next(ex);
  }
});

router.get("/auth", async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const user = await User.byToken(authorization);
    const orders = await Order.findAll({where: {userId: user.id}})
    const reviews = await Review.findAll({where: {userId: user.id}})
    // console.log('auth User', user)
    res.send({user, orders, reviews});
  } catch (ex) {
    next(ex);
  }
});

router.post('/auth/createUser', async(req, res, next)=> {
  try {
    console.log("made it to post?", req.body) //is there a way to secure the password here? it doesn't seem secure to send it in plain text to the server to be create
    const name = `${req.body.firstName} ${req.body.lastName}`;
    const address = req.body.address
    const email = req.body.email
    const password = req.body.password
    const user = await User.create({name, email, address, password, username: email})
    // console.log(user)
    res.send({ token: await User.authenticate(user.username, password)});
  }
  catch(ex){
    next(ex);
  }
});

module.exports = router;
