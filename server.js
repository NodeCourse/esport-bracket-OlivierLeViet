const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const Sequelize = require('sequelize');
const COOKIE_SECRET = 'cookie secret';

const KIMY = { id: 1, firstname: 'kim', lastname: 'jong_un', email: 'pyongyang@redstar.com', password: 'missile_nuclaire'};






//code authentification, ne changer que KIMY à mettre en varaible
passport.use(new LocalStrategy((username, password, cb) => {if (username !== KIMY.email) { return cb(null, false); }
    if (password !== KIMY.password) { return cb(null, false); } return cb(null, KIMY);}));
passport.serializeUser((user, cb) => { cb(null, user.email); });
passport.deserializeUser((email, cb) => { if (email !== KIMY.email)
{ return cb(new Error("No user corresponding to the cookie's email address")); } return cb(null, KIMY);});

// middleware à ne pas changer
const app = express();
app.set('view engine', 'pug');
app.use(cookieParser(COOKIE_SECRET));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({ secret: COOKIE_SECRET, resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.render('home', {user: req.user});
});
app.get('/login', (req, res) => {
    res.render('login');
});


app.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login', })
);

console.log("server on 3k");
app.listen(3000);