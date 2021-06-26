const chai = require('chai')
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
const router = require('../server/routes');
const app = require('../server/app')
const supertest = require('supertest')(app);
const jwt = require("jsonwebtoken");


const { 
    db, 
    models: { Product, User, Review, Brand, Sport, Order, CartItem }
} = require('../server/db/index')

describe('Routes', ()=> {
    let sport;
    let product;
    let user;
    let order;
    beforeEach(async () => {
        await db.sync({ force: true });

        sport = await Sport.create({name: 'Nike'})
        
        product = await Product.create({
            name: 'Nike Air Max', 
            price: 1.50, 
            description: 'This is a test description', 
            inventory: {
                5: 1,
                6: 1,
                7: 1
            },
            sportId: sport.id
        })

        user = await User.create({
            email: 'goodemail@email.com',
        })
        
        order = await Order.create({
            email: 'thisemail@email.com',
            shippingAddress: '123 Springtime Way',
            status: 'Created'
        })
    })
    // after(async()=>{
    //     await db.close()
    // })
    describe('GET /api/products', ()=> {
        it('full list of products', async()=> {
        const response = await supertest.get('/api/products') 
        expect(response.body.length).to.equal(1)

        })
    })    

    describe('GET /products/:id', ()=> {
        it('single products', async()=> { 
            const response = await supertest.get(`/api/products/${product.id}`)
            expect(response.body.id).to.equal(product.id)
            expect(response.body.hasOwnProperty('reviews')).to.equal(true)
        })
        
    })

    describe('GET /api/users', ()=> {
        it('full list of users', async()=> {
        const response = await supertest.get('/api/users') 
        expect(response.body.length).to.equal(1)
        })
    })   

    describe('GET /api/orders', ()=> {
        it('full list of orders', async()=> {
        const response = await supertest.get('/api/orders') 
        expect(response.body.length).to.equal(1)
        })
    })  

    describe('cart items routes', ()=> {
        it('GET /api/cart-items/ returns all cart items for the user using their token', async()=> {

            const token = await jwt.sign( { id: user.id }, process.env.ACCESS_TOKEN_SECRET)

            const cartItem = await CartItem.create({ 
                userId: user.id, 
                quantity: 45, 
                size: 7 })
            cartItem.addProduct(product);

            const response = await supertest
                .get(`/api/cart-items`)
                .set({ authorization: token});
    
            expect(response.body.length).to.equal(1);
            expect(response.body[0].quantity).to.equal(45)
        });



        it('POST /api/cart-items/ creates a new cartItem for the authenticated user using their token', async()=> {

            const token = await jwt.sign( { id: user.id }, process.env.ACCESS_TOKEN_SECRET)

            const response = await supertest
                .post(`/api/cart-items/`)
                .send({
                    product,
                    quantity: 30,
                    size: 7
                })
                .set({ authorization: token });
                
            expect(response.body.quantity).to.equal(30);
            expect(response.body.userId).to.equal(user.id);
        });

        it('PUT /api/cart-items/ adjusts quantity of a cartItem for the authenticated user using their token', async()=> {

            const cartItem = await CartItem.create({ 
                userId: user.id, 
                quantity: 30, 
                size: 7 })
            cartItem.addProduct(product);

            const response = await supertest
                .put(`/api/cart-items/`)
                .send({
                    cartItem,
                    adjustment: 'increment'
                });
                
            expect(response.body.quantity).to.equal(31);

            const response2 = await supertest
                .put(`/api/cart-items/`)
                .send({
                    cartItem,
                    adjustment: 'decrement'
                });
            expect(response2.body.quantity).to.equal(29);
        })
    });

    describe('review POST route', ()=> {

        it('POST /api/review/:productId creates a new review for associated product', async()=> {
            // const review = await Review.create({
            //     review: 'This is a test review about a shoe that is a really good shoe on our fantastic website.',
            //     rating: 5,
            //     userId: user.id
            // })

            const response = await supertest
                .post(`/api/review/${product.id}`)
                .send({
                    review: 'This is a test review about a shoe that is a really good shoe on our fantastic website.',
                    rating: 5,
                    userId: user.id
                });
                
            expect(response.body.rating).to.equal(5);
            expect(response.body.productId).to.equal(product.id);
        });
    });
})