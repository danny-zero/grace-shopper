import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './css/TopPicks.module.css';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TopPicks = ({ inventory }) => {
    const [picks, setPicks] = useState([])

      const randomNumbers = (arr=[], count=0) => {
        if (count === 3) {
            console.log(arr)
            setPicks(arr)
            return arr
        }
        let num = Math.floor(Math.random() * 15 - 1) + 1
        if (!arr.includes(num)) {
            arr.push(num)
            count++
        } 
        randomNumbers(arr, count)
    }

    useEffect(() => {
        randomNumbers()
    }, [])


    if (inventory.length === 0) {
        return <h1>Loading...</h1>
    } else {
    return (
        <div>
        <h1 className={styles.topPicksHeader}>Top Picks</h1>
            <div className={styles.topPicksContainer}>
            {
                picks.map((num, idx) => {
                    return (
                        <Card key={idx} className={styles.card}>
                            <Card.Img variant="top" src={inventory[num].photoSrc}/>
                            <Card.Body>
                                <Card.Title>{inventory[num].name}</Card.Title>
                                <Card.Text>${inventory[num].price}</Card.Text>
                                <Link to={`/shop/${inventory[num].id}`}>View Details</Link>
                            </Card.Body>
                        </Card>)
                })
            }
            </div>
        </div>
    )
        }
}

export default TopPicks
