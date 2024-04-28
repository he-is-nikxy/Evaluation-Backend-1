require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

mongoose.connect('mongodb://127.0.0.1:27017/login');

const registerSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})



registerSchema.methods.generateAuthToken = async function () {
    try {
        const token = await jwt.sign({_id:this._id.toString()}, process.env.SECRETKEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
        console.log(token);
    } catch (error) {
        console.log(error);
    }
}




registerSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})


const Register = mongoose.model('Register', registerSchema);

module.exports = Register;

