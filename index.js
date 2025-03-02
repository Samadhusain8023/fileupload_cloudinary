const express = require("express");
const app = express();

const fileUpload = require("express-fileupload");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// Database connection
const db = require("./config/database");
db.connect();

// Cloudinary connection
const cloudinary = require("./config/cloudinary");
cloudinary.connect();

// API Routes
const Upload = require("./routes/FileUpload");
app.use('/api/v1/upload', Upload);

// Activate server
app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`);
});
