const express = require('express');

const { PORT } = require('./config');
const databaseConfig = require('./config/database.js');
const expressConfig = require('./config/express.js');
const routesConfig = require('./config/routes.js');

start();

async function start() {
    const app = express();

    await databaseConfig(app);
    expressConfig(app);
    routesConfig(app);


    app.listen(PORT, () => console.log(`Application is running at http://localhost:${PORT}`));
}