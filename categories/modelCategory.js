const Sequelize = require('sequelize');
const connection = require('../database/database');
//criando a table category
const Category = connection.define('categories', {
    title: {
        type: Sequelize.STRING,
        alluwNull: false
    },
    slug: {
        type: Sequelize.STRING,
        alluwNull: false
    }
});
//Category.sync({ force: false }).then(() => {
    //console.log('created category table');
//});
module.exports = Category;