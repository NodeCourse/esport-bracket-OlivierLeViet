const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const COOKIE_SECRET = 'cookie secret';
const Sequelize = require('sequelize');


const KIMY = {
    id: 1,
    firstname: 'kim',
    lastname: 'jong_un',
    email: 'pyongyang@redstar.com',
    password: 'missile_nuclaire'
};

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
        .findOne({email: email, pwd: pwd})
        .then((user) => {
            cb(null, user || false);
        });
    
}));
passport.serializeUser((user, cb) => {
    cb(null, user.email);
});
passport.deserializeUser((email, cb) => {


    Users
        .findOne({email: email})
        .then((user) => {
            return cb(null, user || false);
        });
});

// middleware à ne pas changer
const app = express();
app.set('view engine', 'pug');
app.use(cookieParser(COOKIE_SECRET));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: COOKIE_SECRET, resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());


//route de base, sur index.pug,
app.get('/', (req, res) => {
    Users
        .sync() // création de la table
        .then(() => {
            Users
                .findAll()
                .then((users) => {
                    res.render('home', {users}); //récupère et envoie les données
                })
        });
});

//lorsque l'on submit
app.post('/api/post', (req, res) => {
    const pseudo = req.body.pseudo;
    const pwd = req.body.pwd;
    const email = req.body.email;
    Users    //nouveaux articles cré dans la base
        .create({pseudo: pseudo, pwd: pwd, email: email})
        .then(() => res.redirect('/'));
});


// app.get('/', (req, res) => {
//     res.render('home', {user: req.user});
// });

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