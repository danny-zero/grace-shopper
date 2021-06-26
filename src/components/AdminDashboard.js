import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, Route, NavLink } from 'react-router-dom';
import { Dropdown, Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './css/AdminDashboard.module.css'

const AdminDashboard = ({ inventory, auth }) => {

    const [allUsers, setAllUsers] = useState([]);

    const [selectedUser, setSelectedUser] = useState({})

    const getUser = async (id) => {
        // const {data: user} = await axios.get(`/api/user/${id}`)
    }

    useEffect(() => {
        //setAllUsers to all the users from the backend
        setAllUsers([])
    }, [])

    useEffect(() => {
        getUser(auth.user.id)
            .then((user) => {
                setSelectedUser(user)
            })
    }, [selectedUser])

    return (
        <div className={styles.adminContainer}>
        <Container>
            <Row>
                <Col>
                <div className={styles.adminOptions}>
                    <h2>Select a User: &nbsp;</h2>
                    <Dropdown>
                        <Dropdown.Toggle variant="dark">
                            Users
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {
                                allUsers.map((user) => {
                                    return (
                                        //access user.id in some way
                                        <Dropdown.Item href="#/user/user-info" key={user.id}>
                                            {user.name}
                                        </Dropdown.Item>
                                    )
                                })
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    </div>

                    <div className={styles.adminOptions}>
                        <h2>Select a Shoe: &nbsp;</h2>
                        <Dropdown>
                            <Dropdown.Toggle variant="dark">
                                Shoes
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {
                                    inventory.map((shoe, idx) => {
                                        return (
                                            <Dropdown.Item href="#/user/product-info" key={idx}>
                                                {shoe.name}
                                            </Dropdown.Item>
                                        )
                                    })
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Col>
                <Col>
                    <Route path='/user/user-info' render={() => <h1>User Info</h1>} />
                    <Route path='/user/product-info' render={() => <h1>Product Info</h1>} />
                </Col>
            </Row>
        </Container>
        </div>
    )
}

export default AdminDashboard
