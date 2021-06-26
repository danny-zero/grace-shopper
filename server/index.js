const app = require('./app');
const { db } = require('./db');
const { syncAndSeed } = require('./db/syncAndSeed')

const init = async () => {
    try {
        await db.authenticate();
        console.log('connected to graceshopperdb');
        await syncAndSeed()
        const port = process.env.PORT || 3000;
        app.listen(port, ()=> console.log(`listening on port ${port}`));
    } catch (error) {
        console.error(error)
    }
}

init();