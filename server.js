const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const COOKIE_SECRET = 'cookie secret';
const Sequelize = require('sequelize');

//DB
// connexion à la base de données, new Sequelize( nom de la db, id/pseudo, password)
const db = new Sequelize('blog', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

//Définition de la table articles dans le js
const Users = db.define('users', {
    pseudo: {
        type: Sequelize.STRING
    },
    pwd: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    }
});


//code authentification, ne changer que KIMY à mettre en varaible
passport.use(new LocalStrategy((email, pwd, cb) => {

    Users
        .findOne({where: {email: email, pwd: pwd}})
        .then((user) => {
            cb(null, user || false);
        });

}));
passport.serializeUser((user, cb) => {
    cb(null, user.email);
});
passport.deserializeUser((email, cb) => {
    Users
        .findOne({where: {email: email}})
        .then((user) => {
            return cb(null, user || false);
        })
        .catch(cb);

});

// middleware à ne pas changer
const app = express();
app.set('view engine', 'pug');
app.use(express.static("public"));
app.use(cookieParser(COOKIE_SECRET));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: COOKIE_SECRET, resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

//lorsque l'on submit
app.post('/api/post', (req, res) => {
    const pseudo = req.body.pseudo;
    const pwd = req.body.pwd;
    const email = req.body.email;
    Users    //nouveaux articles créé dans la base
        .sync()
        .then(() => {
            Users
                .create({pseudo: pseudo, pwd: pwd, email: email})
                .then(() => res.redirect('/'));
        })

});


app.get('/', (req, res) => {
    res.render('home', {user: req.user});
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
    })
);




console.log("server on 3k");
app.listen(3000);