import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { InputGroup, FormControl, Dropdown, Accordion, Container, Row, Col, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './css/Shop.module.css'

const Shop = ({ getProducts, inventory, setInventory, cartProducts, setCartProducts }) => {

    const [reset, setReset] = useState(false)

    useEffect(() => {
      getProducts()
        .then((products) => {
          setInventory(products)
        })
    }, [reset])
    
    // const addToCart = (product) => {
    //     // console.log("product", product)
    //     if (cartProducts.includes(product)) {
    //         cartProducts.map((item) => {
    //             if (item.id === product.id) {
    //                 item.qty++
    //                 return item
    //             }
    //         })
    //     } else {
    //         product.qty = 1;
    //         // console.log("product", product)
    //         setCartProducts([...cartProducts, product])
    //     }
    // }

    

    const filterShoes = (sport) => {
        let filtered = inventory;
        
        if (sport !== 'Clear') {
            filtered = inventory.filter(product => product.sport.name === sport)
            setInventory(filtered)
        } else {
            setReset(!reset)
        }
        
    }

    const filterSizes = (size) => {
        let filtered = inventory;
        
        if (size !== 'Clear') {
            filtered = inventory.filter(product => size in product.inventory)
            setInventory(filtered)
        } else {
            setReset(!reset)
        }
    }

    const filterName = (name) => {
        if (name.length > 0) {
            const filtered = inventory.filter(product => product.name.toLowerCase().includes(name.toLowerCase()))
            setInventory(filtered)
        } else {
            setReset(!reset)
        }
        
    }

    return (
        <Container>
                <h1 className={styles.shopHeader}>Shop</h1>
                <div className={styles.filters}>
                    <Dropdown>
                        <Dropdown.Toggle className={styles.filterButton} variant="dark">Sport</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={(e) => filterShoes(e.target.innerText)}>Clear</Dropdown.Item>
                            {
                                [...new Set(inventory.map(product => product.sport.name))].map((sport, idx) => <Dropdown.Item key={idx} onClick={(e) => filterShoes(e.target.innerText)}>{sport}</Dropdown.Item>)
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle className={styles.filterButton} variant="dark">Sizes</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => window.location.reload()}>Clear</Dropdown.Item>
                                        {
                                            [...new Set(inventory.reduce((endGoal, curIter) => {
                                                for (let key in curIter.inventory) {
                                                    if (curIter.inventory[key] > 0) {
                                                        endGoal.push(key)
                                                    }
                                                }
                                                return endGoal
                                            }, []).flat(Infinity))].sort((a, b) => a - b).map((size, idx) => <Dropdown.Item key={idx} onClick={(e) => filterSizes(e.target.innerText)}>{size}</Dropdown.Item>)
                                        }
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className={styles.search}>
                    <InputGroup className="mb-3">
                        <FormControl
                        placeholder="Search by Shoe Model"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        onChange={(e) => filterName(e.target.value)}
                        />
                     </InputGroup>
                </div>
            <Row>
                <Col>
                    <div className={styles.shopContainer}>
                        {
                            inventory.map((product) => {
                                return (
                                <Card key={product.id} className={styles.card}>
                                    <Link to={`/shop/${product.id}`}>
                                        <Card.Img variant="top" src={product.photoSrc}/>
                                    </Link>
                                    <Card.Body>
                                        <Card.Title>{product.name}</Card.Title>
                                        <Card.Text>{product.description}</Card.Text>
                                        <Card.Text>${Number(product.price).toFixed(2)}</Card.Text>
                                        {
                                            cartProducts.includes(product) ? (
                                                <Card.Text className={styles.added}>&#10003; Added</Card.Text>
                                            ) : null
                                        }
                                    </Card.Body>
                                    {/* <Button variant="dark" onClick={() => addToCart(product)}>
                                        Add to Cart
                                    </Button> */}
                                    <br /> 
                                </Card>
                            )})
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Shop
