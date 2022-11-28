const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config.js');
const cors = require('cors');
const { db } = require('./database/database.js');
const routerApi = require('./routes');
const app = express();

(async () => {
    try {
        await db.authenticate();
        await db.sync({ force: true })
        console.log('connection with database successfully');
    } catch (error) {
        throw new Error(error);
    } 
})();

app.use(bodyParser.json());
app.use(cors());

routerApi(app);

app.listen(config.project.port, () => {
    console.log('Server running on port:', config.project.port)
});