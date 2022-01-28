/**
 * Main application file.
 * 
 * NOTE: This file contains many required packages, but not all of them - you may need to add more!
 */

// Setup Express
const express = require("express");
const app = express();
const port = 3000;

// Setup Handlebars
const handlebars = require("express-handlebars");
app.engine("handlebars", handlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Setup body-parser
app.use(express.urlencoded({ extended: false }));

// Setup cookie-parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Make the "public" folder available statically
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));


const multer = require("multer");
const upload = multer({
    dest: path.join(__dirname, "temp")
});
const fs = require("fs");
// Use the toaster middleware
app.use(require("./middleware/toaster-middleware.js"));

// Use the addUser middleware
const { addUserToLocals } = require("./middleware/auth-middleware.js");
app.use(addUserToLocals);

// Setup routes
app.use(require("./routes/application-routes.js"));

const loginRouter = require("./routes/login-routes.js");
app.use(loginRouter);

app.post("/uploadImage", upload.single("imageFile"), function(req, res) { 
    const fileInfo = req.file;
    const oldFileName = fileInfo.path;
    const newFileName = `./public/images/uploadedFiles/${fileInfo.originalname}`;
    fs.renameSync(oldFileName, newFileName);
});

// Start the server running.
app.listen(port, function () {
    console.log(`App listening on port ${port}!`);
});