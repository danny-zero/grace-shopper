const express = require("express");
const cors = require("cors")
const stripe = require("stripe")("sk_test_51InYfTF5xHnffZSycFtXaFQWpqlEaYBEr2Dn328bEMhNtY533SPf7ikHU6dTY0JfPynikcgwrUCByqu0bvyHLd3w004iUfAZHc") 

const router = express.Router();
router.use(express.json());
router.use(cors())

router.post("/payment", cors(), async (req, res) => {
  let { token, amount, paymentMethod } = req.body
  console.log(req.body)
	try {
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method_types: ['card'],
      //receipt_email:
    });
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})

const {
  db,
  models: { Product, User, Review, Brand, Sport, Order, CartItem, OrderItem },
} = require("../db");
router.use("/api", require("./auth"));

// full list of products
router.get('/api/products', async(req, res, next) => {
    try {
        const products = await Product.findAll({
            include: [Sport]
        })
        res.send(products)
    }
    catch (ex){
        next(ex)
    }
});

// single product with Reviews
router.get("/api/products/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [Review, Brand],
    });
    res.send(product);
  } catch (ex) {
      next(ex);
  }
});

//Authenticated User editing their own profile
router.put('/api/edit-user/:id', async (req, res, next) => {
  try {
    console.log('EDIT', req.body);
    const name = req.body.name;
    const email = req.body.email;
    const address = req.body.address;
    const user = await User.findByPk(req.params.id);
    console.log('found user', user)
    user.name = name;
    user.email = email;
    user.username = email;
    user.address = address;
    await user.save();
    console.log('changed user', user)
    res.send(user)
  } catch (ex) {
      next(ex)
  }
})

// admins
// see list of products from 'full list of products'
// see all users
router.get("/api/users", async (req, res, next) => {
  try {
    const user = await User.findAll();
    res.send(user);
  } catch (ex) {
    next(ex);
  }
});

// see all orders
router.get("/api/orders", async (req, res, next) => {
  try {
    const order = await Order.findAll();
    res.send(order);
  } catch (ex) {
    next(ex);
  }
});

//get user specific orders
router.get('/api/orders/:id', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.id,
      },
      include: OrderItem
    })
    console.log('tony hawk orders', orders)
    res.send(orders)
  } catch (ex) {
    next(ex)
  }
});

//cancel user specific order
router.delete('/api/cancel-order/:userId/:orderId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const orderId = req.params.orderId
    console.log('CANCEL ORDER ROUTE', [userId, orderId])
    const order = await Order.findByPk(orderId)
    console.log('was the order found?', order)
    if (order.status === 'Processing') {
      await order.destroy();
    }
    const orders = await Order.findAll({
      where: {
        userId,
      },
      include: OrderItem
    })
    console.log('was the order deleted?', orders)
    res.send(orders)
  } catch (ex) {
    next(ex)
  }
})


//PAYMENT HACK ROUTE
router.post('/payments-hack', async (req, res, next) => {
  try {
    //req.body {email, address, userId, cartProducts}
    console.log('CHECKOUT REQ.BODY', req.body)
    const email = req.body.email
    const shippingAddress = req.body.address
    const userId = req.body.id
    const products = req.body.products
    const status = 'Processing'

    const newOrder = await Order.create({email, shippingAddress, status, userId});

    products.map( async (item) => {
      return (
          await OrderItem.create({
          price: item.price,
          quantity: item.qty,
          orderId: newOrder.id,
          productId: item.id
      })
    )
    })

    const userOrders = await Order.findAll({
      where: {
        userId
      }
    })
    console.log('USER ORDERS FROM HACKY THING', userOrders)
    res.send(userOrders)

  } catch (error) {
    next(error)
  }
});


// CART ITEMS ROUTES
// This route will be hit when an authenticated user goes to look at their cart
router.get('/api/cart-items/', async(req, res, next) => {
  try {
    const { authorization } = req.headers;
    const user = await User.byToken(authorization);
    const cartItems = await CartItem.findAll({
        where: {
            userId: user.id
        }
    })

    res.send(cartItems)
  }
  catch (ex) {
    next(ex)
  }
});


// Will likely be hit when an authenticated user adds a new item to their cart.
router.post('/api/cart-items/', async(req, res, next) => {
  try {
    const { product, quantity, size } = req.body;
    const { authorization } = req.headers;
    const user = await User.byToken(authorization);
    const cartItem = await CartItem.create({ 
        userId: user.id,
        quantity,
        size
    });

    cartItem.addProduct(product);

    res.send(cartItem);
  }
  catch (ex) {
    next(ex)
  }
});


// Will be hit when an authenticated user increments or decrements their cart items. Requires put request to include "adjustment" in the body
router.put('/api/cart-items/', async(req, res, next) => {
  try {
    const { cartItem, adjustment } = req.body;
    const { authorization } = req.headers;
    
    if (adjustment === 'decrement'){
      cartItem.quantity--
    };
    if (adjustment === 'increment'){
      cartItem.quantity++
    };

    res.send(cartItem);
  }
  catch (ex) {
    next(ex)
  }
})

// REVIEWS
router.post('/api/review/:productId', async(req, res, next) => {
  try {
    const { productId } = req.params;
    const { review, rating, userId } = req.body;

    const newReview = await Review.create({
      review,
      rating,
      productId,
      userId
    });

    res.send(newReview)

  } catch (ex) {
    next(ex)
  }
})

module.exports = router;







