const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config()

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });


const dataSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String
})
const formQuery = new mongoose.model("formQuery", dataSchema);



app.use(bodyParser.urlencoded({ extended: true }));

const formData = new formQuery({
    name: "username",
    email: "test@gmail.com",
    subject: "It works"
});
formData.save();

// app.post("/gkprepress", (req, res) => {


// });
app.get("/", (req, res) => res.send("yo"))

app.listen(PORT, function () {
    console.log("started");

})