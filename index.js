/*
res.download()	Solicita que seja efetuado o download de um arquivo
res.end()	Termina o processo de resposta.
res.json()	Envia uma resposta JSON.
res.jsonp()	Envia uma resposta JSON com suporta ao JSONP.
res.redirect()	Redireciona uma solicitação.
res.render()	Renderiza um modelo de visualização.
res.send()	Envia uma resposta de vários tipos.
res.sendFile	Envia um arquivo como um fluxo de octeto.
res.sendStatus()	Configura o código do status de resposta e envia a sua representação em sequência de caracteres como o corpo de resposta.
*/

//importando express
//import express from 'express'
const express = require('express');
const app = express();

//importando boody-parser
const bodyParser = require('body-parser');

//importando database
const connection = require('./database/database');
const modelCategory = require('./categories/modelCategory');
const modelArticle = require('./articles/modelArticle');

//importing categories routes
const categoriesController = require('./categories/categoriesController');

//importing articles routes
const articlesControoller = require('./articles/articlesControoller');

//autenticando database
connection
    .authenticate()
    .then(() => {
        console.log('database connection');
    }).catch(err => {
        console.log(err);
    });

//Viem engine
app.set('view engine', 'ejs');

//Static
app.use(express.static('public'));


//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//rota categories
app.use('/', categoriesController);

//articles routes
app.use('/', articlesControoller);

//rota principal
app.get('/', (req, res) => {
    modelArticle.findAll({
        order:[
            ['id','DESC'] //ordenando o banco de dados
        ]
    }).then(article => {
        res.render('index', { article: article });
    })
});

//router para exibir artigo 
app.get('/:slug', (req, res) => {
    const slug = req.params.slug
    modelArticle.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if (article != undefined) {
            res.render('article', { article: article });
            console.log(artcle);
            
        }
    }).catch(err => {
        console.log(err);
        res.redirect('/');

    })

});

//porta
app.listen(8081, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server started on port`);
    }
});