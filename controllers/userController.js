const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
require('dotenv').config()
// ---------------------------------------------------

let SECRET = process.env.TOKEN_SECRET
let PORT = process.env.PORT

const homePage = (req,res) => { 
    res.render('home', {body:{}} )
}

// Login 

const login = async (req,res) =>{

    // User inputs
    let userEmail = req.body.email.trim();
    let userPassword = req.body.password.trim();

    // Finding user on DataBase
    let selectedUser = await User.findOne({email:userEmail})

    if(selectedUser != null){

        // User on data base

        let savedEmail = selectedUser.email
        let savedPassword = selectedUser.password
        
        const passwordAndUserMatch = bcrypt.compareSync(userPassword, savedPassword)
        if(userEmail == savedEmail && passwordAndUserMatch ){
            const token = jwt.sign({ email: savedEmail }, SECRET);
            res.cookie('token', token, { maxAge: 10000, httpOnly: true });
            res.redirect(`http://localhost:${PORT}/app`)
        }else{
            res.status(400)
            res.render('error', {message: `Email or Password incorrect try again!`})
        }

    }else{
        res.render('error', {message:`Email or Password incorrect try again!`})
    }

}

// Register

const loadPage = (req,res) => {
    res.render('registerPage',{body:{}})
}

const addUser = async (req,res) => {
    

    let userEmail = req.body.email.trim();

    let selectedUser = await User.findOne({email:userEmail})

    if(selectedUser){
        res.render('error', {message:`The Email:${userEmail} already exist !`})
    }else{
        const user = new User({
            email:req.body.email.trim(),
            // Encrypting the password
            password:bcrypt.hashSync(req.body.password.trim())
        })
    
        try{
            let doc = await user.save()
            res.status(200)
            res.render('sucess')
        }catch(erro){
            res.status(400),
            res.send(erro)
        }
    }
}

// App 

const app = (req,res) => { 
    res.render('app')
}
 

module.exports = {homePage , login, addUser, loadPage, app}
