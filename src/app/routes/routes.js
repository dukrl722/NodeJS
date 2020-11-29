const dataBase = require('../../config/dataBase');
const LivrosDAO = require('../DAO/LivrosDAO');

module.exports = (app) => {

    app.get('/', (request, response) => {
        response.send(
            `<html>
            <head>
                <meta charset="utf-8">
            </head>
            <body>
                <h1>Os guri tão só por dale</h1>
            </body>
        </html>`
        );
    });

    app.get('/livros', (request, response) => {
        const livrosDAO = new LivrosDAO(dataBase);
        livrosDAO.listar().then(livros => response.marko(
            require('../view/books/list/list.marko'),
            {
                livros: livros
            }
        )).catch(error => console.log(error))
    });

    app.get('/livros/form', (request, response) => {
        response.marko(require('../view/books/form/form.marko'), {livro: {}});
    })

    app.get('/livros/form/:id', (request, response) => {
        const id = request.params.id;
        const livrosDao = new LivroDao(dataBase);

        livrosDao.buscaPorId(id).then(livro =>
            response.marko(
                require('../views/livros/form/form.marko'),
                {livro: livro}
            )
        ).catch(error => console.log(error));
    });

    app.post('/livros', (request, response) => {
        console.log(request.body);
        const livrosDAO = new LivrosDAO(dataBase);
        livrosDAO.adicionar(request.body)
            .then(response.redirect('/livros'))
            .catch(error => console.log(error));
    });

    app.put('/livros', (request, response) => {
        console.log(request.body);
        const livrosDao = new LivroDao(dataBase);

        livrosDao.atualiza(request.body)
            .then(response.redirect('/livros'))
            .catch(error => console.log(error));
    });

    app.delete('/livros/:id', (request, response) => {
        const id = request.params.id;

        const livrosDAO = new LivrosDAO(dataBase);
        livrosDAO.remove(id)
            .then(() => {
                response.status(200).end()
            }).catch(error => console.log(error))
    });

};
