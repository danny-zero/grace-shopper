import React from 'react';
import styles from './css/Slider.module.css';
import { Carousel, Modal, Container, Row, Col, Button, Alert, Breadcrumb, Card, Form, Dropdown, DropdownButton, Nav, Navbar, NavDropdown, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Slider = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src='../../public/images/slider_test.jpg'
                alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="../../public/images/lizzie_armanto.jpg"
                alt="Second slide"
                />

                {/* <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Text can go here</p>
                </Carousel.Caption> */}
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="https://images.unsplash.com/photo-1593787406536-3676a152d9cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
    )
}

export default Slider
