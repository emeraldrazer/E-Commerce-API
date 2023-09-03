require('dotenv').config()
require('express-async-errors');

const cookie = require('cookie-parser');
const cors = require('cors');
const express = require('express');

const app = express();
const path = require('./routes/path');

const port = process.env.PORT || 3001;

const notFound = require('./middleware/notfound');

app.use(cookie());
app.use(cors());
app.use(express.json());
app.use('/api/v1/', path);

app.use(notFound);

const connectDB = require('./db/connect');

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => console.log(`ECommerce API is Online on port ${port}`))
    } catch (error) {
        
    }
}

start();
