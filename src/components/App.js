import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Redirect, Link, HashRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import Slider from './Slider';
import Featured from './Featured';
import TopPicks from './TopPicks';
import Footer from './Footer';
import Shop from './Shop';
import Product from './Product';
import UserProfile from './UserProfile';
import SignUp from './SignUp';
import SignIn from './SignIn'



function App() {

  const [thankYou, setThankYou] = useState(false)

  const [inventory, setInventory] = useState([]);

  const [cartProducts, setCartProducts] = useState([]);

  const [auth, setAuth] = useState({})
  const [signUp, setSignUp] = useState(true)
  const [passwordType, setPasswordType] = useState('password')

  // for responsive elements
  const useWindowSize = () => {
      const [windowWidth, setWindowWidth] = useState(undefined)

      useEffect(() => {
          const handleResize = () => {
                setWindowWidth(window.innerWidth)
            }

          window.addEventListener('resize', handleResize)

          handleResize()

            return () => window.removeEventListener("resize", handleResize);
        }, [])

        return windowWidth
    }

  const size = useWindowSize();


  // inventory
  const getProducts = async () => {
      const { data: products } = await axios.get('/api/products');
      return products
    } 

  useEffect(() => {
    attemptTokenLogin()
    //check if cart is stored
      const cart = window.localStorage.getItem('cart')
      if (cart) {
        setCartProducts(...cartProducts, JSON.parse(cart))
      }

      //get all inventory
      getProducts()
        .then((products) => {
          //console.log(products)
          setInventory(products)
        })
    }, [])


    //user sign-up/Login
    const logout = () => {
      window.localStorage.removeItem('token');
      //window.localStorage.removeItem('cart'); should the cart persist after logging out?
      setAuth({})
      return <Redirect to="/shop" />
    }

    const attemptTokenLogin = async () => {
        const token = window.localStorage.getItem('token');
          console.log("attemptTokenLogin, token = ", token)
          if (token) {
            const response = await axios.get('/api/auth', {
              headers: {
                authorization: token
              }
            });
          console.log("AUTH?", response.data)
          setAuth(response.data);
          }
    }

    const createUser = async (credentials) => {
      console.log(credentials)
      const { data: { token } } = await axios.post('/api/auth/createUser', credentials);
      console.log("did we get the token?", token)
      window.localStorage.setItem('token', token);
      attemptTokenLogin();
    }

    const signIn = async (credentials) => {
      console.log("singIn credentials", credentials)
      const response = await axios.post('/api/auth', credentials);
      const { token } = response.data;
      console.log('did signin work?', token)
      window.localStorage.setItem('token', token);
      attemptTokenLogin();
    }


    return (
        <Router>
            <NavBar 
              thankYou={thankYou}
              setThankYou={setThankYou}
              getProducts={getProducts}
              inventory={inventory}
              setInventory={setInventory}
              auth={auth}
              setAuth={setAuth}
              logout={logout}
              size={size} 
              cartProducts={cartProducts} 
              setCartProducts={setCartProducts}
              />
            <Switch>
                <Route exact path="/">
                    <Slider />
                    <Featured />
                    <TopPicks inventory={inventory}/>
                </Route>
                <Route path="/shop/:id">
                  <Product 
                  cartProducts={cartProducts} 
                  setCartProducts={setCartProducts}
                  thankYou={thankYou}
                  setThankYou={setThankYou}
                  getProducts={getProducts}
                  inventory={inventory}
                  setInventory={setInventory}
                  />
                </Route>
                <Route path="/shop">
                    <Shop 
                      getProducts={getProducts}
                      inventory={inventory} 
                      setInventory={setInventory}
                      cartProducts={cartProducts} 
                      setCartProducts={setCartProducts}/> 
                </Route>
                <Route path="/user">
                {
                  !auth.user ? (<Redirect to="/" />)
                  : (<UserProfile auth={auth} setAuth={setAuth} inventory={inventory} />)
                }
                </Route>
                <Route path="/signup">
                {
                  auth.user ? (<Redirect to="/" />) 
                  : signUp ? ( <SignUp passwordType={passwordType} setPasswordType={setPasswordType} createUser={createUser} signUp={signUp} setSignUp={setSignUp}/>)
                  : !signUp ? ( <SignIn passwordType={passwordType} setPasswordType={setPasswordType} signUp={signUp} signIn={signIn} setSignUp={setSignUp} /> )
                  : null
                }
                  
                </Route>
            </Switch>
            <Footer 
              size={size} />
        </Router>
    )
}

export default App
