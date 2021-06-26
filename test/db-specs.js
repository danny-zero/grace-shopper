const chai = require('chai')
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

const { 
    db, 
    models: { Product, User, Review, Brand, Sport, Order }
} = require('../server/db/index')

describe('Models', async() => {
    beforeEach(async () => {
        await db.sync({ force: true});
    })
    // after(async()=>{
    //     await db.close()
    // })
    describe('Product model', () => {

        it('requires either a brand or sport category', async() => {
            await expect(Product.create({
                price: 1.50,  
                description: 
                'This is a test description', 
                name: 'name',
                inventory: {
                    5: 10,
                    6: 1,
                    7: 12
                }
            })).to.be.rejected;
        });

        it('requires `name`', async() => {
            const sport = await Sport.create({name: 'Tennis'})

            await expect(Product.create({
                price: 1.50,  
                description: 
                'This is a test description', 
                 inventory: {
                    5: 10,
                    6: 1,
                    7: 12
                },
                sportId: sport.id
            })).to.be.rejected;
        });

        it('requires `description`', async() => {
            const brand = await Brand.create({name: 'Nike'})

            await expect(Product.create({
                name: 'Nike Air Max', 
                price: 1.50, 
                inventory: {
                    5: 10,
                    6: 1,
                    7: 12
                },
                brandId: brand.id
            })).to.be.rejected;
        });

        it('requires `price`', async() => {
            const sport = await Sport.create({name: 'Tennis'})
            
            await expect(Product.create({
                name: 'Nike Air Max',
                 inventory: {
                    5: 10,
                    6: 1,
                    7: 12
                },
                description: 'This is a test description',
                sportId: sport.id
            })).to.be.rejected;
        });

        it('requires `quantity`', async() => {
            const brand = await Brand.create({name: 'Nike'})
            
            await expect(Product.create({
                name: 'Nike Air Max', 
                inventory: {
                    5: 10,
                    6: 1,
                    7: 12
                },
                description: 'This is a test description', 
                price: 1.50,
                brand: brand.id
            })).to.be.rejected;
        });

        it('has a placeholder photo if none is provided', async() => {
            const sport = await Sport.create({name: 'Tennis'})
            
            const shoe = await (Product.create({
                name: 'Nike Air Max', 
                inventory: {
                    5: 10,
                    6: 1,
                    7: 12
                },
                description: 'This is a test description', 
                price: 1.50, 
                sportId: sport.id
            }));
            expect(shoe.photoSrc).to.equal('public/logo-no-text.PNG');
        });
    })

    describe('User model', () => {
        it('requires a valid email address', async() => {
            await expect(User.create({email: 'bademail.com'})).to.be.rejected;
        });

        it('email address must be unique', async() => {
            await User.create({email: 'goodemail@email.com'})
            await expect(User.create({email: 'goodemail@email.com'})).to.be.rejected;
        });
    })

    // describe('Order model', () => {
    //     it('must belong to a user or guest session', async() => {
    //         await expect(Order.create({
    //             email: 'goodemail@email.com',
    //             shippingAddress: '1234 Nice Street Way, BK, NY 11238',
    //         })).to.be.rejected;
    //     });
    // })

    describe('Review model', () => {
        it('must belong to a product', async() => {
            await expect(Review.create({
                review: 'This is a test review that has over 50 characters!!!', 
                rating: 1
            })).to.be.rejected;
        });

        it('must belong to a user', async() => {
            const sport = await Sport.create({name: 'Nike'})
            
            const product = await Product.create({
                name: 'Nike Air Max', 
                price: 1.50, 
                inventory: {
                    5: 10,
                    6: 1,
                    7: 12
                }, 
                description: 'This is a test description', 
                sportId: sport.id
            })
            
            await expect(Review.create({
                review: 'This is a test review that has over 50 characters!!!', 
                rating: 1, 
                productId: product.id
            })).to.be.rejected;
        });

        it('must have a minimum length', async() => {
            const sport = await Sport.create({name: 'Nike'})

            const product = await Product.create({
                name: 'Nike Air Max', 
                price: 1.50, 
                description: 'This is a test description', 
                inventory: {
                    5: 10,
                    6: 1,
                    7: 12
                },
                sportId: sport.id
            })
            
            const user = await User.create({email: 'goodemail@email.com'})
            
            await expect(Review.create({
                review: 'This is a test review', 
                rating: 1, 
                productId: product.id, 
                userId: user.id
            })).to.be.rejected;
        });
    })
})
