import React, { useState, useEffect } from 'react';
import { Link, HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Accordion, Card, Modal, Nav, Navbar, NavDropdown, Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './css/Footer.module.css';

const Footer = ({ size }) => {
//    const useWindowSize = () => {
//        const [windowWidth, setWindowWidth] = useState(undefined)

//         useEffect(() => {
//             const handleResize = () => {
//                 setWindowWidth(window.innerWidth)
//             }

//             window.addEventListener('resize', handleResize)

//             handleResize()

//             return () => window.removeEventListener("resize", handleResize);
//         }, [])

//         return windowWidth
//     }

    // const size = useWindowSize();

    return (
        size > 600 ? (
        <div className={styles.footer}>

            <div className={styles.info}>
                <p>Information</p>
                <ul>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Payment Methods</li>
                </ul>
            </div>

            <div className={styles.customer}>
                <p>Customer Service</p>
                <ul>
                    <li>Processing & Shipping</li>
                    <li>Privacy Policy</li>
                    <li>Returns & Exchanges</li>
                </ul>
            </div>

            <div className={styles.social}>
                <a href="https://www.instagram.com" 
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="fa fa-instagram" 
                    aria-hidden="true"></a>
                <a href="https://www.facebook.com" 
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="fa fa-facebook-official" 
                    aria-hidden="true"></a>
                <a href="https://www.twitter.com" 
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="fa fa-twitter-square" 
                    aria-hidden="true"></a>
            </div>
        </div>
    ) : (
        <div className={styles.footer}>
            <div className={styles.footerCard}>
                <Accordion className={styles.accordion} defaultActiveKey="1">
                    <Card className={styles.card}>
                        <Card.Header>
                            <Accordion.Toggle className={styles.cardHeader} as={Card.Header} eventKey="0">
                                Information <i className="fa fa-chevron-down" aria-hidden="true"></i>
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <ul>
                                    <li>About Us</li>
                                    <li>Contact Us</li>
                                    <li>Payment Methods</li>
                                </ul>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                <Accordion className={styles.accordion} defaultActiveKey="1">
                    <Card className={styles.card}>
                        <Card.Header>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                Customer Service <i className="fa fa-chevron-down" aria-hidden="true"></i>
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                 <ul>
                                    <li>Processing & Shipping</li>
                                    <li>Privacy Policy</li>
                                    <li>Returns & Exchanges</li>
                                </ul>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>

            <div className={styles.social}>
                <a href="https://www.instagram.com" 
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="fa fa-instagram" 
                    aria-hidden="true"></a>
                <a href="https://www.facebook.com" 
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="fa fa-facebook-official" 
                    aria-hidden="true"></a>
                <a href="https://www.twitter.com" 
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="fa fa-twitter-square" 
                    aria-hidden="true"></a>
            </div>
        </div>
    )
    )
}

export default Footer