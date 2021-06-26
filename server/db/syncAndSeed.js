const {
  db,
  models: {
    Product,
    Brand,
    Sport,
    Review,
    User,
    Order,
    OrderItem,
    CartItem,
  },
} = require("./index");

const syncAndSeed = async () => {
  await db.sync({ force: true });

  //sport
  const [
    skateboarding,
    softball,
    baseball,
    volleyball,
    basketball,
    soccer,
  ] = await Promise.all([
    Sport.create({ name: "Skateboarding" }),
    Sport.create({ name: "Softball" }),
    Sport.create({ name: "Baseball" }),
    Sport.create({ name: "Volleyball" }),
    Sport.create({ name: "Baskeball" }),
    Sport.create({ name: "Soccer" }),
  ]);

  //skate brands
  const [cariuma, etnies, vans] = await Promise.all([
    Brand.create({ name: "Cariuma" }),
    Brand.create({ name: "Etnies" }),
    Brand.create({ name: "Vans" }),
  ]);

  //shoes
  const [oca, scout, atwood] = await Promise.all([
    Product.create({
      name: "OCA",
      price: 79,
      description:
        "100% Vegan and crafted from high-end, raw materials, it features lightweight cushion technology, the perfectly-weighted rubber sole, and classic cap-toe design for a crazy-comfy, go-to look.",
      photoSrc: "public/images/product-images/skate-cariuma-oca.jpg",
      inventory: {
        4: 0,
        5: 1,
        6: 2,
        7: 4,
        8: 4,
        9: 5,
        10: 6,
        11: 7,
        12: 8,
        13: 9,
      },
      brandId: cariuma.id,
      sportId: skateboarding.id,
    }),
    Product.create({
      name: "Scout",
      price: 61.99,
      description:
        "The Scout brings the comfort with a breathable mesh upper, a fully-lined interior, an elastic heel support, an STI Foam Lite Level 1 insole, and an exposed STI Evolution Foam midsole and outsole with rubber pods for durability and traction.",
      photoSrc: "public/images/product-images/skate-etnies-scout.png",
      inventory: {
        5: 1,
        6: 1,
        7: 1,
        8: 1,
        9: 1,
        10: 1,
        11: 1,
        12: 1,
        13: 1,
      },
      brandId: etnies.id,
      sportId: skateboarding.id,
    }),
    Product.create({
      name: "Atwood",
      price: 64.99,
      description:
        "The Canvas Atwood, a heritage low top style, features double-stitched canvas uppers for durability, metal eyelets, and signature rubber waffle outsoles.",
      photoSrc: "public/images/product-images/skate-vans-atwood.png",
      inventory: {
        5: 5,
        6: 6,
        7: 7,
        8: 1,
        9: 1,
        10: 1,
        11: 1,
        12: 1,
        13: 1,
      },
      brandId: vans.id,
      sportId: skateboarding.id,
    }),
  ]);

  // baseball & volleyball brands
  const [newBalance, nike, underArmour] = await Promise.all([
    Brand.create({ name: "New Balance" }),
    Brand.create({ name: "Nike" }),
    Brand.create({ name: "UnderArmour" }),
  ]);

  // Baseball products
  const [lindor, zoomTrout7, yard] = await Promise.all([
    Product.create({
      name: "Lindor 1",
      price: 129.99,
      description:
        "Take the field ready to leave your mark on the game in the New Balance® Lindor 1 TPU baseball cleat. The Lindor is a signature series of NB Athlete and short stop Francisco Lindor that combines high-impact performance technology with premium style points.",
      photoSrc: "public/images/product-images/baseball-newbalance-lindor.webp",
      inventory: {
        9: 1,
        9.5: 1,
        10: 1,
        10.5: 1,
        11: 1,
        11.5: 1,
        12: 1,
        12.5: 1,
        13: 1,
      },
      brandId: newBalance.id,
      sportId: baseball.id,
    }),
    Product.create({
      name: "Zoom Trout 7",
      price: 129.99,
      description:
        "The Nike® Force Zoom Trout 7 baseball cleat was designed to get the most out of an elite players performance each game. The revolutionary new Air Zoom cushioning system that matches springy response with even more cushioning while a tuned underfoot plate balances speed with comfort for outstanding all around play on the diamond.",
      photoSrc: "public/images/product-images/baseball-nike-zoomtrout7.webp",
      inventory: {
        9: 1,
        9.5: 1,
        10: 1,
        10.5: 1,
        11: 1,
        11.5: 1,
        12: 1,
        12.5: 1,
        13: 1,
      },
      brandId: nike.id,
      sportId: baseball.id,
    }),
    Product.create({
      name: "Yard",
      price: 59.99,
      description:
        "Swing for the fences in a cleat built for enhanced power and speed, the Under Armour® Yard baseball cleat.",
      photoSrc: "public/images/product-images/baseball-underarmour-yard.webp",
      inventory: {
        9: 1,
        9.5: 1,
        10: 1,
        10.5: 1,
        11: 1,
        11.5: 1,
        12: 1,
        12.5: 1,
        13: 1,
      },
      brandId: underArmour.id,
      sportId: baseball.id,
    }),
  ]);

  // Softball products
  const [romero, hyperdiamond, glyde] = await Promise.all([
    Product.create({
      name: "Romero",
      price: 119.99,
      description:
        "Introducing the New Balance® Romero LE softball cleat, designed to be versatile while providing unmatched traction and comfort durability each time you take the field.",
      photoSrc: "public/images/product-images/softball-newBalance-romero.webp",
      inventory: {
        5: 1,
        5.5: 1,
        6: 1,
        6.5: 1,
        7: 1,
        7.5: 1,
        8: 1,
        8.5: 1,
        9: 1,
        9.5: 1,
        10: 1,
        10.5: 1,
        11: 1,
      },
      brandId: newBalance.id,
      sportId: softball.id,
    }),
    Product.create({
      name: "Hyperdiamond 3 Keystone",
      price: 31.99,
      description:
        "Continue the development of your skills in the lightweight, high-traction Nike® Hypderdiamond 3 Keystone softball cleat.",
      photoSrc: "public/images/product-images/softball-nike-hyperdiamond.webp",
      inventory: {
        5: 1,
        5.5: 1,
        6: 1,
        6.5: 1,
        7: 1,
        7.5: 1,
        8: 1,
        8.5: 1,
        9: 1,
        9.5: 1,
        10: 1,
        10.5: 1,
        11: 1,
      },
      brandId: nike.id,
      sportId: softball.id,
    }),
    Product.create({
      name: "Glyde",
      price: 79.99,
      description:
        "Standout on the diamond in the UA Glyde softball cleat. Made to provide you with durability, comfort and performance the Under Armour® Glyde is a cleat that won’t disappoint.",
      photoSrc: "public/images/product-images/softball-underarmour-glyde.webp",
      inventory: {
        5: 1,
        5.5: 1,
        6: 1,
        6.5: 1,
        7: 1,
        7.5: 1,
        8: 1,
        8.5: 1,
        9: 1,
        9.5: 1,
        10: 1,
        10.5: 1,
        11: 1,
      },
      brandId: underArmour.id,
      sportId: softball.id,
    }),
  ]);

  // court brands
  const [mizuno, asics, jordan] = await Promise.all([
    Brand.create({ name: "Mizuno" }),
    Brand.create({ name: "ASICS" }),
    Brand.create({ name: "Jordan" }),
  ]);

  // court shoes
  const [wave, upcourt, whyNot] = await Promise.all([
    Product.create({
      name: "Wave Luminous",
      price: 89.95,
      description:
        'Premium "Hybrid Power" means every little movement is a big one. Combining ultra soft cushioning and secure fitting, brought to you by the DynamotionFit construction, the Wave Luminous will keep the opposition on their toes! A layered and textile design upper provides a lightweight frame with enough bounce to keep you in the air when you need it the most, with a high-density EVA inserts in the rear foot to provide a snug fit, and luxury comfort.',
      photoSrc: "public/images/product-images/court-mizuno-wave-luminous.png",
      inventory: {
        5: 1,
        6: 1,
        7: 1,
        8: 1,
        9: 1,
        10: 1,
        11: 1,
        12: 1,
        13: 1,
      },
      brandId: mizuno.id,
      sportId: volleyball.id,
    }),
    Product.create({
      name: "Upcourt 4",
      price: 45.95,
      description:
        "Designed for indoor court athletes who are newer to the game, the UPCOURT™ 4 shoe delivers a combination of lightweight flexibility, support and durability. This shoe is constructed with synthetic leather overlays that promote better support and stability during abrupt transitions and braking, while the breathable mesh paneling delivers plenty of airflow to keep feet comfortable during matches. Lastly, the UPCOURT™ 4 shoe is designed to improve traction on court, featuring a rubber gumsole application to emphasize grip on indoor court surfaces.",
      photoSrc: "public/images/product-images/court-asics-upcourt-4.png",
      inventory: {
        5: 1,
        6: 1,
        7: 1,
        8: 1,
        9: 1,
        10: 1,
        11: 1,
        12: 1,
        13: 1,
      },
      brandId: asics.id,
      sportId: volleyball.id,
    }),
    Product.create({
      name: "Why Not Zer0.3",
      price: 130.0,
      description:
        "Why cut, run, and slam in a shoe built for the rigors of the season? The Jordan Why Not Zer0.3 is Russell Westbrook's third entry of his signature series and is lightweight, comfortable, and breathable. A cushioned sole supports you every step of the way.",
      photoSrc: "public/images/product-images/court-jordans-why-not.png",
      inventory: {
        5: 1,
        6: 1,
        7: 1,
        8: 1,
        9: 1,
        10: 1,
        11: 1,
        12: 1,
        13: 1,
      },
      brandId: jordan.id,
      sportId: basketball.id,
    }),
  ]);

  //soccer brands
  const [adidas] = await Promise.all([Brand.create({ name: "Adidas" })]);

  //soccer shoes
  const [copa, predator, marvel] = await Promise.all([
    Product.create({
      name: "COPA SENSE.1 FIRM GROUND CLEATS",
      price: 225,
      description:
        "Some players talk a good game. But the best ones feel it. Get in touch with your senses and elevate your play in Copa Sense. To create the best fit possible, we designed these adidas firm ground soccer cleats from the inside out. Foam pods at the heel fill the negative space of the foot, creating a seamless connection between boot and body. The two medial studs use a softer compound, so they bend upon contact for a smooth first touch.100% Vegan and crafted from high-end, raw materials, it features lightweight cushion technology, the perfectly-weighted rubber sole, and classic cap-toe design for a crazy-comfy, go-to look.",
      photoSrc: "public/images/product-images/soccer-adidas-copa.jpg",
      inventory: {
        5: 1,
        6: 1,
        7: 1,
        8: 1,
        9: 1,
        10: 1,
        11: 1,
        12: 1,
        13: 1,
      },
      brandId: adidas.id,
      sportId: soccer.id,
    }),
    Product.create({
      name: "PREDATOR FREAK.1 FIRM GROUND CLEATS",
      price: 250,
      description:
        "You can't change the game until you let the game change you. Every match is a chance to be bigger, better. More in control. Unleash your full force of nature with Predator Freak. For these soccer cleats, we extended the Demonskin 2.0 for added ball control. A two-piece collar offers easy entry into the foot-hugging adidas Primeknit upper. The split outsole helps you own the opposition on firm ground.",
      photoSrc: "public/images/product-images/soccer-adidas-predator.jpg",
      inventory: {
        5: 1,
        6: 1,
        7: 1,
        8: 1,
        9: 1,
        10: 1,
        11: 1,
        12: 1,
        13: 1,
      },
      brandId: adidas.id,
      sportId: soccer.id,
    }),
    Product.create({
      name: "MARVEL PREDATOR FREAK.1 FIRM GROUND CLEATS",
      price: 250,
      description:
        "Predator has mutated to give you freakish control. These limited-edition soccer cleats bring a classic comic book character prowling onto the pitch. Wolverine and Marvel X-Men graphics dominate the adidas Primeknit upper and insole. Extended Demonskin and a split outsole team up to help you overpower your rivals on firm ground.",
      photoSrc: "public/images/product-images/soccer-adidas-marvel.jpg",
      inventory: {
        5: 1,
        6: 1,
        7: 1,
        8: 1,
        9: 1,
        10: 1,
        11: 1,
        12: 1,
        13: 1,
      },
      brandId: adidas.id,
      sportId: soccer.id,
    }),
  ]);

  //admin, name, email, address, password
  User.create({
    name: 'Charles Xavier',
    email: 'professor@xmen.com',
    address: '1407 Graymalkin Lane, Salem Center',
    admin: true,
    username: 'professor@xmen.com',
    password: 'professorx'
  });

  // NEW USERS
  const [ lionel, tony, jennie, misty, michael, derek ] = await Promise.all([
    User.create({
      name: 'Lionel Messi',
      email: 'messi@hotmail.com',
      address: '111 Argentina Street',
      username: 'messi@hotmail.com',
      password: 'ilovesoccer'
    }),

    User.create({
      name: 'Tony Hawk',
      email: 'tonyhawk@hotmail.com',
      address: '111 Halfpipe Place',
      username: 'tonyhawk@hotmail.com',
      password: 'iloveskateboarding'
    }),

    User.create({
      name: 'Jennie Finch',
      email: 'jenniefinch@hotmail.com',
      address: '111 Fastpitch Lane',
      username: 'jenniefinch@hotmail.com',
      password: 'ilovesoftball'
    }),

    User.create({
      name: 'Misty May-Treanor',
      email: 'mistymt@hotmail.com',
      address: '111 Spike The Ball Road',
      username: 'mistymt@hotmail.com',
      password: 'ilovevolleyball'
    }),

    User.create({
      name: 'The Michael Jordan',
      email: 'mj@hotmail.com',
      address: '111 Slam Dunk Place',
      username: 'michaeljordan@hotmail.com',
      password: 'ilovebasketball'
    }),

    User.create({
      name: 'Derek Jeter',
      email: 'derekjeter@hotmail.com',
      address: '111 ShortStop Ave',
      username: 'derekjeter@hotmail.com',
      password: 'ilovebaseball'
    })
  ]);

  // REVIEWS
  const [ tonyOca, lionalCopa, derekLindor ] = await Promise.all([
    Review.create({
      review: 'As a professional skateboarder (Tony Hawk. I am Tony Hawk), I cannot recommend the Cariuma OCAs enough. They are very comfortable, I feel good at skateboarding when I wear them, and I can do lots of cool tricks with them on. This website is amazing. I will buy all of my shoes from Legion of Doom Athletic Footwear.',
      rating: 5,
      productId: oca.id,
      userId: tony.id
    }),
    Review.create({
      review: "Bad shoes. Kept tripping. I'm usually very good at soccer (I am Lionel Messi). Not with these shoes. Even though I'm giving the shoes just 1 star, if I could rate the website, I would give it 5.",
      rating: 5,
      productId: copa.id,
      userId: lionel.id
    }),
    Review.create({
      review: "Ok loooooveeee :) These baseball cleats are amaaaze, and I look so cute running around the bases in them. Awesome website, too!! :D  I am Derek Jeter by the way.",
      rating: 5,
      productId: lindor.id,
      userId: derek.id
    }),
    Review.create({
      review: "Pretty good shoes, even better website. Thanks legion of doom",
      rating: 4,
      productId: oca.id,
      userId: jennie.id
    }),
  ]);

  // ORDERS
  const [ tonyOrder, tonySecondOrder, lionelOrder, jennieOrder, derekOrder, mistyOrder, michaelOrder ] = await Promise.all([
    Order.create({
      email: tony.email,
      shippingAddress: tony.address,
      userId: tony.id,
      status: 'Completed'
    }),
    Order.create({
      email: tony.email,
      shippingAddress: tony.address,
      userId: tony.id,
      status: 'Processing'
    }),
    Order.create({
      email: lionel.email,
      shippingAddress: lionel.address,
      userId: lionel.id,
      status: 'Completed'
    }),
    Order.create({
      email: jennie.email,
      shippingAddress: jennie.address,
      userId: jennie.id,
      status: 'Completed'
    }),
    Order.create({
      email: derek.email,
      shippingAddress: derek.address,
      userId: derek.id,
      status: 'Completed'
    }),
    Order.create({
      email: misty.email,
      shippingAddress: misty.address,
      userId: misty.id,
      status: 'Processing'
    }),
    Order.create({
      email: michael.email,
      shippingAddress: michael.address,
      userId: michael.id,
      status: 'Cancelled'
    }),
  ]);

  const [ tonyItem1, tonyItem2, lionelItem1, jennieItem1, derekItem1, mistyItem1, michaelItem1, michaelItem2 ] = await Promise.all([
    OrderItem.create({
      price: 79.00,
      quantity: 1,
      orderId: tonyOrder.id,
      productId: oca.id
    }),
    OrderItem.create({
      price: 64.99,
      quantity: 1,
      orderId: tonySecondOrder.id,
      productId: atwood.id
    }),
    OrderItem.create({
      price: 61.99,
      quantity: 1,
      orderId: tonyOrder.id,
      productId: scout.id
    }),
    OrderItem.create({
      price: 225,
      quantity: 1,
      orderId: lionelOrder.id,
      productId: copa.id
    }),
    OrderItem.create({
      price: 79.00,
      quantity: 1,
      orderId: jennieOrder.id,
      productId: oca.id
    }),
    OrderItem.create({
      price: 129.00,
      quantity: 5,
      orderId: derekOrder.id,
      productId: lindor.id
    }),
    OrderItem.create({
      price: 89.95,
      quantity: 2,
      orderId: mistyOrder.id,
      productId: wave.id
    }),
    OrderItem.create({
      price: 130,
      quantity: 1,
      orderId: michaelOrder.id,
      productId: whyNot.id
    }),
    OrderItem.create({
      price: 64.99,
      quantity: 1,
      orderId: michaelOrder.id,
      productId: atwood.id
    }),
  ]);
};

module.exports = {
  syncAndSeed,
};
