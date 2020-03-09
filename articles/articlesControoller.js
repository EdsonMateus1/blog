const express = require('express');
const router = express.Router();
const modelCategory = require('../categories/modelCategory')
const modelArticle = require('./modelArticle')
const slugify = require('slugify');

//router main article
router.get('/admin/article', (req, res) => {
    modelArticle.findAll({
        include:  [{model: modelCategory}]
    }).then(article => {
        res.render('admin/articles/index', { article: article });
        console.log(modelCategory);

    }).catch(err =>{
        console.log(err);
        
    })
});

//router new article
router.get('/admin/articles/new', (req, res) => {
    modelCategory.findAll().then(category => {//findAll usado para fazer uma pesquisa em todo banco de dados
        res.render('admin/articles/new', { category: category })
    })
});

//router save article
router.post('/admin/articles/save', (req, res) => {
    const title = req.body.title;
    const body = req.body.body;
    const category = req.body.category;
    modelArticle.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(() => {
        res.redirect('/admin/article');
        
    });
});

//rota para deletar article
router.post('/admin/article/delete', (req, res) => {
    const id = req.body.id
    if (id != undefined) {
        modelArticle.destroy({//destroy usado para exluir 
            where: { id: id }
        }).then(() => {
            res.redirect('/admin/article');
        });
    }
});

module.exports = router;