import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Form, InputGroup } from 'react-bootstrap';
import styles from './css/loginSignUp.module.css';

const SignIn = ({ signIn, signUp, setSignUp, passwordType, setPasswordType }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (ev) => {
        ev.preventDefault();
        console.log("submitted")
        signIn({
            email,
            password
        })
    }

    return (
        <div className={styles.container}>
            <h1>Log In</h1>
             <Container>
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Email: </Form.Label>
                        <Form.Control type="text" placeholder="user@info.com" onChange={(e) => setEmail(e.target.value)}/>
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    {
                                        passwordType === 'password' ? (<i onClick={() => setPasswordType('text')} className="fa fa-eye" aria-hidden="true"></i>)
                                        : passwordType === 'text' ? (<i onClick={() => setPasswordType('password')} className="fa fa-eye-slash" aria-hidden="true"></i>)
                                        : null
                                    }
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type={passwordType} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}/>
                        </InputGroup>
                    </Form.Group>
                    <Button type="submit" variant="dark">Sign In</Button>
                    <p onClick={() => setSignUp(true)}>Don't Have an account? <span className={styles.loginSignUp}>Sign Up Here</span></p>
                </Form>
            </Container>
        </div>
    )
}

export default SignIn
