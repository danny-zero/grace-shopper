import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Container, Card, Button, Image, Spinner, Form, Modal } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import styles from './css/Product.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const Product = ({ cartProducts, setCartProducts, thankYou, setThankYou, inventory, setInventory, getProducts }) => {
    const { id } = useParams()
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true) 
    const [selectedSize, setSelectedSize] = useState()
    const [selectedQty, setSelectedQty] = useState()

    const handleClose = () => {
        setThankYou(!thankYou)
    }

    const getSingleProduct = async() => {
        const {data: product} = await axios.get(`/api/products/${id}`)
        return product
    }

    const makeStars = (rating) => {
        const stars = new Array(rating).fill('s').map((star, idx) => {
            return <i key={idx} className="fa fa-star" aria-hidden="true"></i>
        })
        return stars
    }

    useEffect(() => {
        getSingleProduct()
          .then((product) => {
            setProduct(product)
            setLoading(false)
            setThankYou(false)
          })
      }, [])  
      
    useEffect(() => {
        console.log("cartProducts", cartProducts)
        if (cartProducts.length > 0) {
            window.localStorage.setItem('cart', JSON.stringify(cartProducts))
        } else {
            window.localStorage.removeItem('cart');
        }
    }, [cartProducts])


    const submitTest = (e) => {
        e.preventDefault()
        console.log("submitted")
        if (!selectedSize) {
            alert('please select size')
        } else if (!selectedQty) {
            alert('please select quantity')
        } else {
            console.log("product", product.name)
            console.log("size", selectedSize)
            console.log("qty", selectedQty)
            const item = {
                id: product.id,
                brandId: product.brandId,
                name: product.name,
                size: selectedSize,
                qty: selectedQty,
                price: product.price,
                photoSrc: product.photoSrc
            }
            console.log('item', item)
            addToCart(item)
        }
      }
      
    const addToCart = (product) => {
        let inside = false;
        const updatedCart = cartProducts.map((item) => {
            if (item.id === product.id && item.size === selectedSize) {
                inside = true
                item.qty += Number(selectedQty)
                return item
            }
        })

        if (inside) {
            setCartProducts(updatedCart)
        }

        if (!inside) {
            product.qty = Number(selectedQty)
            setCartProducts([...cartProducts, product])
        }
    }

    if (loading) {
        return (
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        )
    } else {

    return (
        <div className={styles.container}>
        <Container>
            <div>
                <h1 className={styles.productHeader}>{product.brand.name} {product.name}</h1>
                <div className={styles.productContainer}>
                    <div>
                        <Image src={product.photoSrc} fluid/>
                    </div>
                    <div className={styles.productInfo}>
                        <div className={styles.productDetails}>{product.description}</div>
                        <div className={styles.productDetails}>${Number(product.price).toFixed(2)}</div>
                        
                            {
                                cartProducts.reduce((endGoal, curIter) => {
                                    if (product.id === curIter.id) {
                                        endGoal = <Card.Text className={styles.added}>&#10003; Added</Card.Text>
                                    } else {
                                        return
                                    }
                                    return endGoal
                                }, ``)
                            }
                        <Form onSubmit={submitTest}>
                        <Form.Group>
                            <div className={styles.sizeAndQty}>
                                <Form.Control as="select" onChange={(e) => e.target.value === 'Size' ? setSelectedSize() : setSelectedSize(e.target.value)}>
                                    <option value={null}>Size</option>
                                    {
                                        Object.keys(product.inventory).map((size, idx) => {
                                            return <option key={idx}>{size}</option>
                                        })
                                    }
                                </Form.Control>
                                <Form.Control as="select" onChange={(e) => e.target.value === 'Qty' ? setSelectedQty() 
                                : e.target.value === 'Out of Stock' ? setSelectedQty()
                                : setSelectedQty(e.target.value)}>
                                    <option>Qty</option>
                                    {
                                        product.inventory[selectedSize] > 0 ? (
                                            new Array(product.inventory[selectedSize]).fill('_').map((x, idx) => {
                                            console.log("size qty here?", product.inventory[selectedSize])
                                            x = idx + 1
                                            return <option key={idx}>{x}</option>
                                        })
                                        ) 
                                        : product.inventory[selectedSize] === 0 ? (<option>Out of Stock</option>)
                                        : null
                                        
                                    }
                                </Form.Control>
                            </div>
                            <Button type="submit" variant="dark">
                                Add to Cart
                            </Button>
                        </Form.Group>
                        </Form>
                        <br /> 
                    </div>
                </div>
                <div className={styles.productReviews}>
                    <h3 className={styles.reviewsHeader}>Reviews</h3>
                    <ul>
                        {
                            product.reviews.length > 0 ? (product.reviews.map(review => {
                                return (
                                    <ul key={review.id} className={styles.review}>
                                        <li className={styles.rating}>
                                            {makeStars(review.rating)}
                                        </li>
                                        <li>
                                            {review.review}
                                        </li>
                                    </ul>
                                )
                            })) : null
                        }
                    </ul>
                </div>
            </div>
        </Container>



        <Modal show={thankYou} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thank You</Modal.Title>
        </Modal.Header>
        <Modal.Body>Thank you for your purchase</Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
        </Modal>
        </div>
    )
    }
}

export default Product