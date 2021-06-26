import React, { useState, useEffect } from 'react';
import { Link, HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Modal, Table, Button } from 'react-bootstrap';
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './css/Cart.module.css';
import StripeCheckout from "react-stripe-checkout";

const Cart = ({ auth, setAuth, toggleModal, show, setShow, cartProducts, setCartProducts, thankYou, setThankYou, getProducts, inventory, setInventory }) => {
  const [loading, setLoading] = useState(true)
  const [done, setDone] = useState(false)

  useEffect(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    setAuth(auth)
    setCartProducts([])
  }, [done])

    const increment = (id) => {
      const newCartProducts = cartProducts.map((item) => {
        if (item.id === id) {
          item.qty++
        }
        return item
      })
      setCartProducts(newCartProducts)
    }

     const decrement = (id) => {
      const newCartProducts = cartProducts.map((item) => {
        if (item.id === id) {
          if (item.qty > 0) {
            item.qty--
          }
        }
        return item
      }).filter(item => item.qty !== 0)
      setCartProducts(newCartProducts)
    }

    const amount = (Number(cartProducts.reduce((endGoal, curIter) => {
      return endGoal + (curIter.price * curIter.qty)
    }, 0).toFixed(2))*100)

    const submitOrderForm = async (id, email, address, products) => {  
        const newOrders = (await axios.post("/payments-hack", {id, email, address, products})).data;
        auth.orders = newOrders
    }
    

    const makePayment = async(token) => {

      setDone(false)

      const body = {
        token,
        amount
      }
      const headers = {
        "Content-Type": "application/json"
      }
      try {
        const {data: payment} = await axios.post("/payment", body)

        console.log(payment)
        if (payment) {
          setDone(true)
          setShow(!show)
          setThankYou(!thankYou)
        }

        return payment
      }
      catch (ex) {
        console.log(ex)
      }
    }


    if (loading) {
      return <h1>Loading...</h1>
    } else {
    return (
        <Modal size="lg" show={show} onHide={toggleModal}>
                <Modal.Header>
                <h4 className={styles.closeButton} onClick={toggleModal}> x </h4>
                </Modal.Header>
                <h3 className={styles.cart}>Cart</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Item:</th>
                      <th>Size:</th>
                      <th>Price:</th>
                      <th>Qty:</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      cartProducts.map((product, idx) => {
                        return (
                          <tr key={idx}>
                            <td className={styles.cartImg}>
                                <img src={product.photoSrc}/>
                            </td>
                            <td>{product.name}</td>
                            <td>{product.size}</td>
                            <td>${(Number(product.price) * Number(product.qty))}</td>
                            <td><Button className={styles.changeQty} variant="outline-dark" size="sm" onClick={() => decrement(product.id)}>-</Button>&nbsp;{product.qty}&nbsp;<Button className={styles.changeQty} variant="outline-dark" size="sm" onClick={() => increment(product.id)}>+</Button></td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </Table>
                <Modal.Footer>
                <h3>Total:  
                  ${
                    cartProducts.reduce((endGoal, curIter) => {
                      return endGoal + (curIter.price * curIter.qty)
                    }, 0).toFixed(2)
                  }
                </h3>
                {
                  auth.user ? (
                    <StripeCheckout stripeKey="pk_test_51InYfTF5xHnffZSy3Su76YOjj4YAtZZI132oo3Lcc7p2gDF8tusvWVokk8yZC8HUHJYX6Cbo2RAeS1d60ph9Bxae002s8muSRF" 
                token={makePayment} 
                name="Checkout"

                amount={amount}
                billingAddress
                zipcode
                image="public/logo-no-text.png">
                  <Button variant="dark" onClick={() => submitOrderForm(auth.user.id, auth.user.email, auth.user.address, cartProducts)}>Checkout</Button>
                </StripeCheckout>
                  ) : (
                    <Button variant="dark" onClick={() => alert('Must Sign Up/Log-In for Checkout')}>Checkout</Button>
                  )
                }
                </Modal.Footer>
            </Modal>
    )
  }
}

export default Cart
