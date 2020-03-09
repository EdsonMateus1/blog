const Sequelize = require('sequelize');
const connection = require('../database/database');
const Category = require('../categories/modelCategory');
//criando a table article
const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        alluwNull: false
    },
    slug: {
        type: Sequelize.STRING,
        alluwNull: false
    },
    body:{
        type:Sequelize.TEXT,
        alluwNull:false
    }
});

Category.hasMany(Article)//criando realacionamento 1 para n hasMany(tem muitos)
Article.belongsTo(Category);//criando realacionamento 1 para 1 belongsTo(pertence a) 


//Article.sync({ force: false }).then(() => {
    //console.log('created article table');
//});
module.exports = Article;
