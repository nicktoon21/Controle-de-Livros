const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');

module.exports = (app) => {
    app.get('/', function(req, resp) {
        resp.send(
            `
                <html>
                    <head>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <h1> Casa do Código </h1>
                    </body>
                </html>
            `
        );
    });
    

    app.get('/livros', function(req, resp) {
        console.log(req.query);

        const livroDao = new LivroDao(db);
        livroDao.altera(
            req.query.id,
            req.query.titulo,
            req.query.preco,
            req.query.descricao
        )
        .then(
            livroDao.lista()
                        .then(livros => 
                            resp.marko(
                                require('../views/livros/lista/lista.marko'),
                                    {
                                        livros: livros
                                    }
                                ))
                                .catch(erro => console.log(erro))
                            )
                        .catch(erro => console.log(erro))

        
    });

    app.post('/livros', function(req,resp){
        console.log(req.body);
        const livroDao = new LivroDao(db);
        livroDao.adiciona(req.body)
                .then(resp.redirect('/livros'))
                .catch(erro => console.log(erro));
        });

    app.get('/livros/delete', function(req,resp){
        const livroDao = new LivroDao(db);
        console.log(req.query.id)
        livroDao.deleta(req.query.id)
            .then(
            livroDao.lista()
                .then(livros => resp.marko(
                require('../views/livros/lista/lista.marko'),
                {
                    livros: livros
                }))
                .catch(erro => console.log(erro))
            )
            .catch(erro => console.log(erro))
        })

    app.get('/livros/editar', function(req,resp){
        const livroDao = new LivroDao(db);
        
        livroDao.busca(req.query.id)
                .then( resultados =>{
                    resp.marko(require('../views/livros/editar/editar.marko'),
                        {
                            livros: resultados,
                        }
                    )}
                    )
                .catch(erro => console.log(erro));
                
    });

    app.get('/livros/adicionar', function(req,resp){
        resp.marko(require('../views/livros/form/form.marko'))
    });
      
    app.get('/busca', function(req,resp){
        const livroDao = new LivroDao(db);
        livroDao.busca(req.query.id)
                .then(resultados =>
                    resp.marko(
                        require('../views/livros/busca/busca.marko'),
                        {
                            livros: resultados,
                        }
                    ))
                .catch(erro => console.log(erro));
    });           
};