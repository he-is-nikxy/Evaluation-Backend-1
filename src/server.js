require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const Register = require("../models/register");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const booksData = require("../routes/booksData")



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set("view engine", "hbs");

app.get("/", (req, res) => {
    res.render("index");
})


app.get("/register", (req, res) => {
    res.render("registration");
})

app.post("/register", async (req, res) => {

    try {
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        if (password == confirmPassword) {
            const register = new Register({
                username: req.body.username,
                email: req.body.email,
                password,
                confirmPassword
            });


            const token = await register.generateAuthToken();


            const registered = await register.save();
            console.log(registered);
            res.status(200).render("login");

        }

    } catch (error) {
        console.log(error);
    }
})

app.get("/login", (req, res) => {
    res.render("login");
})

app.post("/login", async (req, res) => {
    try {

        const email = req.body.email;
        const password = req.body.password;

        const userEmail = await Register.findOne({ email: email })
        if (userEmail.password === password) {
            res.status(200).render("index");

        } else {
            res.status(200).render("login");

        }



    } catch (error) {
        res.status(500).send(error.message);
    }
})



// const securePassword = async (password) => {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log(hashedPassword);
// }

// securePassword("nikhil")



// const createToken = async () => {

//     const token = await jwt.sign({_id: "662e0c3bfd5e03b53f572ad4"}, "nikhil")
//     console.log(token);

//     const userVerify = await jwt.verify(token, "nikhil");
//     console.log(userVerify);

// }

// createToken();





// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     const user = await Register.findOne({ email });
//     if (user) {
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (isMatch) {
//             req.session.isLoggedIn = true;
//             req.session.user = user;
//             return res.redirect("/dashboard");
//         }
//     }
//     res.redirect("/login");
//     res.render("login");
// });



app.use(booksData);







app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})