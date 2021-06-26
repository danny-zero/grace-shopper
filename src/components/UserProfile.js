import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './css/UserProfile.module.css'

import AdminDashboard from './AdminDashboard';
import OrderDetails from './OrderDetails';

const UserProfile = ({ inventory, auth, setAuth }) => {
    const [loading, setLoading] = useState(true);

    const [showUserModal, setShowUserModal] = useState(false);
    const [showOrderModal, setShowOrderModal] = useState(false);

    const [name, setName] = useState(auth.user.name);
    const [email, setEmail] = useState(auth.user.email);
    const [address, setAddress] = useState(auth.user.address)

    const [userOrders, setUserOrders] = useState([])
    console.log('userOrders', userOrders)
    const [selectedOrder, setSelectedOrder] = useState({})
    console.log('selectedOrder', selectedOrder)

    const getOrders = async (id) => {
        const { data: orders } = await axios.get(`/api/orders/${id}`)
        return orders
    }

    useEffect(() => {
        getOrders(auth.user.id)
            .then(orders => {
                setUserOrders(orders)
                setLoading(false)
            })
    }, [])

    const handleSelectOrder = (e) => {
        if (e.target.value !== 'Select Order') {
            const order = userOrders.find(order => order.id === Number(e.target.value))
            //console.log('found order', order)
            setSelectedOrder(order)
            //console.log('selectedOrder', selectedOrder)
        }
    }

    const findProduct = (id) => {
        const name = inventory.find(product => product.id === id).name
        return name
    }

    const handleChange = (e) => {
        // console.log('label', e.target.id)
        if (e.target.id === 'name') setName(e.target.value)
        if (e.target.id === 'email') setEmail(e.target.value)
        if (e.target.id === 'address') setAddress(e.target.value)
    }

    const submitUserForm = async (e) => {
        e.preventDefault()
        const edited = (await axios.put(`/api/edit-user/${auth.user.id}`, {name, email, address})).data;
        setShowUserModal(!showUserModal)
        auth.user = {...auth.user, ...edited}
        setAuth({...auth, ...auth.user})
    }

    const submitOrderForm = async (e) => {
        console.log('order cancelled')
        const cancelled = (await axios.delete(`/api/cancel-order/${auth.user.id}/${selectedOrder.id}`)).data;
        setShowOrderModal(!showOrderModal)
        setSelectedOrder({})
        auth.orders = cancelled
        setAuth(auth)
        setUserOrders(auth.orders)
    }

    if (auth.user.admin && !loading) {
        return (
            <AdminDashboard 
                auth={auth} 
                inventory={inventory}
            />
        )
    } else if (!auth.user.admin && !loading) {
        return (
                <Container className={styles.container}>
                    <Row className={styles.userHeader}>
                        <h1>My Account</h1>
                    </Row>
                    <Row className={styles.rowTwo}>
                        <Col className={styles.orderHistoryHeader}>
                            <h1>Order History</h1>
                            {
                                auth.orders.length > 0 ? (
                                    <Form.Control as="select" onChange={handleSelectOrder}>
                                        <option>Select Order</option>
                                        {
                                            auth.orders.map((order) => {
                                                //console.log(order)
                                                return <option key={order.id} value={order.id}>Order no. {order.id}</option>
                                            })
                                        }
                                    </Form.Control>
                                ) : (<strong>You Haven't Placed Any Orders Yet</strong>)
                            }
                            <Row className={styles.orderDetails}>
                            {
                                selectedOrder.status ? (
                                    <>
                                    <p>Order Status: <strong>({selectedOrder.status})</strong></p>
                                    <p>Order Total: ${
                                        selectedOrder.orderItems.reduce((endGoal, curIter) => {
                                            return endGoal + Number(curIter.price) * Number(curIter.quantity)
                                        }, 0)
                                    }</p>
                                    </>
                                ) : null
                            }
                            {
                                selectedOrder.status === 'Processing' ? (<Button variant='dark' onClick={() => setShowOrderModal(!showUserModal)}>Cancel Order</Button>) : null
                            }
                                {
                                    selectedOrder.orderItems ? (
                                            selectedOrder.orderItems.map((item, idx) => {
                                                const name = findProduct(item.productId)
                                                const date = new Date(selectedOrder.createdAt).toString().split(' ').slice(0, 4).join(' ');
                                                const price = Number(item.price).toFixed(2);
                                                const qty = Number(item.quantity)
                                                const productIdNumber = item.productId
                                                return <OrderDetails key={idx} inventory={inventory} productId={productIdNumber} userId={auth.user.id} name={name} date={date} price={price} qty={qty}/>
                                            })
                                    ) : null
                                }
                            </Row>
                        </Col>
                        <Col className={styles.accountDetailsHeader}>
                            <h1>Account Details <i className="fa fa-pencil" aria-hidden="true" onClick={() => setShowUserModal(!showUserModal)}></i></h1>
                            <div>
                                <p>{auth.user.name}</p>
                                <p>{auth.user.email}</p>
                                <p>{auth.user.address}</p>
                            </div>
                        </Col>
                    </Row>
                    <Modal show={showUserModal} onHide={() => setShowUserModal(!showUserModal)}>
                        <Modal.Header closeButton>
                        <Modal.Title>Edit User</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={submitUserForm}>
                                <Form.Group controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder={auth.user.name} onChange={(e) => handleChange(e)}/>
                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control type="email" placeholder={auth.user.email} onChange={(e) => handleChange(e)}/>
                                </Form.Group>
                                <Form.Group controlId="address">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="text" placeholder={auth.useraddress} onChange={(e) => handleChange(e)}/>
                                </Form.Group>
                                <Button variant="secondary" onClick={() => setShowUserModal(!showUserModal)}>Close</Button>
                                <Button variant="dark" onClick={submitUserForm}>Save Changes</Button>
                            </Form>
                        </Modal.Body>
                    </Modal>



                    <Modal show={showOrderModal} onHide={() => setShowOrderModal(!showOrderModal)}>
                        <Modal.Header closeButton>
                        <Modal.Title>Cancel Order</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h3>Are you sure you want to cancel this order?</h3>
                            <Button variant="secondary" onClick={() => setShowOrderModal(!showOrderModal)}>Go Back</Button>
                            <Button variant="danger" onClick={submitOrderForm}>Cancel Order</Button>
                        </Modal.Body>
                    </Modal>
                </Container>
        )
    } else {
        return (<h1>Loading...</h1>)
    }
}

export default UserProfile
