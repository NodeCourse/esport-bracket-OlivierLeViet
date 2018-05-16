
const bodyParser = require('body-parser');

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
    password: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    }
});

app.use(bodyParser.urlencoded({extended: true}));

//route de base, sur index.pug,
app.get('/', (req, res) => {
    Users
        .sync() // création de la table
        .then(() => {
            Users
                .findAll()
                .then((users) => {
                    res.render('index', {users}); //récupère et envoie les données
                })
        });
});

//lorsque l'on submit
app.post('/api/post', (req, res) => {
    const pseudo = req.body.pseudo;
    const password = req.body.password;
    const email = req.body.email;
    Users    //nouveaux articles cré dans la base
        .create({pseudo: pseudo, password: password, email: email})
        .then(() => res.redirect('/'));
});