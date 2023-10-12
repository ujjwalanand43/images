const express = require('express');
require('dotenv').config();
const app = express();
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const connectWithDb = require('./src/config/db');
require('dotenv').config();
const cloudinary = require('cloudinary');
const cors = require('cors');

// Connect with database
connectWithDb();

// Enable CORS with a wildcard origin
// app.use(cors({ origin: '*' }));
app.use(
    cors({
        origin: "https://images-sage-alpha.vercel.app/",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}));

var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})



const images = require('./src/routes/images')

app.use('/api/v1', images);
app.listen(process.env.PORT, () => {
    console.log(`Server is running at port : ${process.env.PORT}`);
})