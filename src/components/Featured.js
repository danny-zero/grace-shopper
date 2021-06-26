import React from 'react';
import styles from './css/Featured.module.css';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Featured = () => {
    return (
        <div>
        <h1 className={styles.featuredHeader}>Featured</h1>
        <div className={styles.featuredContainer}>
            <Card className={styles.card}>
            <Card.Img variant="top" src='public/images/basketball.jpeg' />
        </Card>
        <Card className={styles.card}>
            <Card.Img variant="top" src='public/images/daewon.jpeg' />
        </Card>

        <Card className={styles.card}>
            <Card.Img variant="top" src='public/images/tennis.jpeg' />
        </Card>
        </div>
        </div>
    )
}

export default Featured
