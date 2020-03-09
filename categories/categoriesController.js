/*
app.js

var express = require('express'),
    dogs    = require('./routes/dogs'),
    cats    = require('./routes/cats'),
    birds   = require('./routes/birds');

var app = express();

app.use('/dogs',  dogs);
app.use('/cats',  cats);
app.use('/birds', birds);

app.listen(3000);
dogs.js

var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
    res.send('GET handler for /dogs route.');
});

router.post('/', function(req, res) {
    res.send('POST handler for /dogs route.');
});

module.exports = router;
Quando var app = express() é chamado, um objeto de aplicativo é retornado. Pense nisso como o app main.

Quando var router = express.Router() é chamado, um mini app é retornado. A ideia por trás do mini app é que cada rota no seu aplicativo pode se tornar bastante complicada, e você se beneficiaria de mover todo esse código para um arquivo separado. O roteador de cada arquivo se torna um mini app, que tem uma estrutura muito semelhante ao main app.

No exemplo acima, o código para a rota / dogs foi movido para o seu próprio arquivo para não sobrecarregar o aplicativo main. O código para / cats e / birds seria estruturado de forma semelhante em seus próprios arquivos. Ao separar este código em três mini apps, você pode trabalhar na lógica de cada um isoladamente e não se preocupar em como isso afetará os outros dois.

Se você tem código (middleware) que pertence a todas as três rotas, você pode colocá-lo no app main, antes das chamadas app.use(...). Se você tem código (middleware) que pertence a apenas uma dessas rotas, você pode colocá-lo no arquivo somente para essa rota.
*/
const express = require('express');
const router = express.Router();
const modelCategories = require('./modelCategory');
const slugify = require('slugify');

//rota para criar nova category
router.get("/admin/categories/new", (req, res) => {
    res.render('admin/categories/newCategories');
});

//rota para salvar categoria
router.post('/admin/categories/save', (req, res) => {
    const title = req.body.title;
    if (title != undefined) {
        modelCategories.create({
            title: title,
            slug: slugify(title)
        }).then(() => { res.redirect('/admin/categories'); })
    }
    
});

//rota para deletar category
router.post('/admin/categories/delete', (req, res) => {
    const id = req.body.id
    if (id != undefined) {
        modelCategories.destroy({
            where: { id: id }
        }).then(() => {
            res.redirect('/admin/categories');
        });
    }
    res.redirect('/admin/categories');

});

//route edit category
router.get('/admin/categories/edit/:id', (req, res) => {
    const id = req.params.id
    if (isNaN(id)) {
        res.redirect('/admin/categories');
    }
    modelCategories.findByPk(id).then((category) => {
        if (id != undefined) {
            res.render('admin/categories/edit', { category: category });
        }
    }).catch(err => {
        res.render('/admin/categories');
    })
});
//rota updade category
router.post('/admin/categories/updade', (req, res) => {
    const id = req.body.id
    const title = req.body.title
    modelCategories.update({title: title,slug: slugify(title)},{
        where:{id:id}
    }).then(()=>{
         res.redirect('/admin/categories');
    })
});

//rota para lista todas categorias
router.get('/admin/categories', (req, res) => {
    modelCategories.findAll({}).then(categories => {
        res.render('admin/categories/index', { categories: categories });
    })
});

module.exports = router;