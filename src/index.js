const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config.js');
const errors = require('./middlewares/validations/errors');
const cors = require('cors');
const { db } = require('./database/database.js');
const routerApi = require('./routes');
const app = express();

(async () => {
    try {
        await db.authenticate();
        await db.sync({ force: false })
        console.log('connection with database successfully');
    } catch (error) {
        throw new Error(error);
    } 
})();

app.use(bodyParser.json());
app.use(cors());

routerApi(app);
app.use(errors.handle);
app.use(errors.notFoundResource);

app.listen(config.project.port, () => {
    console.log('Server running on port:', config.project.port)
});