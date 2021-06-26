import React, { useState, useEffect } from 'react';
import { Link, HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Nav, Navbar, NavDropdown, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './css/NavBar.module.css';
import Cart from './Cart';


const NavBar = ({ thankYou, setThankYou, logout, auth, getProducts, setAuth, cartProducts, setCartProducts, inventory, setInventory }) => {
    const [show, setShow] = useState(false);

    const toggleModal = () => {
        setShow(!show)
    }

    return (
       <Navbar className={styles.navContainer} collapseOnSelect expand="sm" bg="white" variant="light">
            <Navbar.Brand href="#/">
                <img className={styles.logo} src="public/images/logo_no_text.PNG" />
            </Navbar.Brand>

            <Navbar.Toggle className={styles.responsiveNav} aria-controls="responsive-navbar-nav" />

            <Navbar.Collapse className={styles.responsiveNavInside} id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link className={styles.link} href="#/shop">Shop</Nav.Link>
                </Nav>
                <Nav className="ml-auto">
                    <NavDropdown alignRight title={(<i className="fa fa-user"></i>)} id="collasible-nav-dropdown">
                        {
                            auth.admin ? (
                                <>
                                <NavDropdown.Item>Hi, {auth.name}</NavDropdown.Item>
                                <NavDropdown.Item href="#/user">Admin Dashboard</NavDropdown.Item>
                                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                </>
                                ) 
                            : auth.user ? (
                                <>
                                <NavDropdown.Item>Hi, {auth.user.name}</NavDropdown.Item>
                                <NavDropdown.Item href="#/user">My Account</NavDropdown.Item>
                                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                </>
                            )
                            : (
                                <NavDropdown.Item href="#/signup">SignUp/Login</NavDropdown.Item>
                            ) 
                        }
                    </NavDropdown>
                        <Nav.Link className="fa fa-shopping-cart" onClick={toggleModal}>
                            {
                                cartProducts.length > 0 ? (
                                    <span className={styles.badge}></span>
                                    ) : null
                            }
                        </Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <Cart 
                thankYou={thankYou}
                setThankYou={setThankYou}
                auth={auth}
                getProducts={getProducts}
                inventory={inventory}
                setInventory={setInventory}
                setAuth={setAuth}
                show={show} 
                setShow={setShow}
                toggleModal={toggleModal} 
                cartProducts={cartProducts} 
                setCartProducts={setCartProducts}/>

        </Navbar>
    )
}

export default NavBar
