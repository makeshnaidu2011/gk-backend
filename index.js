const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config()
const ejs = require('ejs');
const nodemailer = require('nodemailer');
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

const dataSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String
})

const formQuery = new mongoose.model("formQuery", dataSchema);
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs")
var transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
        user: process.env.FROM_MAIL,
        pass: process.env.PASS
    }
});

app.post("/gkprepress", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const formData = new formQuery({
        name: name,
        email: email,
        subject: subject
    });

    var mailOptions = {
        from: process.env.FROM_MAIL,
        to: process.env.TO_MAIL,
        subject: "New form submission",
        text: name + "    " + email + "     " + subject
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    formData.save().then(() => res.send('submitted'));;


});
app.get("/", (req, res) => res.render("index"))

app.listen(PORT, function () {
    console.log("started");

})