
// connexion à la base de données, new Sequelize( nom de la db, id/pseudo, password)
const db = new Sequelize('blog', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});