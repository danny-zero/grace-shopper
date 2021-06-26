import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Modal, Form  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

const OrderDetails = ({ inventory, productId, name, date, price, qty, userId }) => {
    const photo = inventory.find(product => product.id === productId).photoSrc
    
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState();
    const [showFinishedModal, setShowFinishedModal] = useState(false);

    const handleChange = (e) => {
        if (e.target.id === 'review') setReview(e.target.value)
    }
    
    const submitForm = async (e) => {
        e.preventDefault();

        const newReview = (await axios.post(`/api/review/${productId}`, {
            review, 
            rating, 
            userId
        })).data;

        setShowReviewModal(!showReviewModal);
    }
    
    return (
        <div>
            <Card>
                 <Link to={`/shop/${productId}`}><Card.Img variant="top" src={photo} /></Link>
                <Card.Body>
                    <Card.Title>{name}<p>Order Status: {status}</p></Card.Title>
                    <Card.Body>
                        <p>Purchase Date: {date}</p>
                        <p>Price: ${price}</p>
                        <p>Quantity: {qty}</p>
                        <p>Subtotal: ${(price * qty).toFixed(2)}</p>
                    </Card.Body>

                    <Button onClick={() => setShowReviewModal(!showReviewModal)}>Leave Review</Button>

                </Card.Body>
            </Card>

            <Modal show={showReviewModal} onHide={() => setShowReviewModal(!showReviewModal)}>
                <Modal.Header closeButton>
                    <Modal.Title>Write a Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitForm}>
                        <Form.Group controlId="name">
                            <Form.Label>Your Rating</Form.Label>
                            <Form.Control as="select" onChange={(e) => setRating(e.target.value)}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="review">
                            <Form.Label>Tell us what you think:</Form.Label>
                            <Form.Control type="text" onChange={(e) => handleChange(e)}/>
                        </Form.Group>

                        <Button variant="secondary" onClick={() => setShowReviewModal(!showReviewModal)}>Close</Button>
                        <Button variant="dark" type="submit" onClick={() => setShowFinishedModal(!showFinishedModal)} >Submit Review</Button>
                        
                    </Form>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            
            </Modal>
            <Modal show={showFinishedModal} onHide={() => setShowFinishedModal(!showFinishedModal)} onHide={() => setShowFinishedModal(!showFinishedModal)}>
                <Modal.Body>
                    <h3>Thanks for leaving your review!</h3>
                    <Link to={`/shop/${productId}`}><Button>Go to Product</Button></Link>
                    <Button variant="secondary" onClick={() => setShowFinishedModal(!showFinishedModal)}>Close</Button>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
        </div>
    )
}

export default OrderDetails
