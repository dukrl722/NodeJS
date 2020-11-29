class LivrosDAO {

    constructor(dataBase) {
        this._dataBase = dataBase;
    }

    listar() {
        return new Promise((resolve, reject) => {
            this._dataBase.all(
                "SELECT * FROM livros",
                (error, result) => {
                    if (error) {
                        return reject('Não foi possível listar os livros');
                    }
                    return resolve(result);
                }
            )
        });
    };

    adicionar(livro) {
        return new Promise((resolve, reject) => {
            this._dataBase.run(`INSERT INTO livros (titulo, preco, descricao) VALUES ()`,
                [livro.titulo, livro.preco, livro.descricao],
                (error) => {
                    if (error) {
                        console.log(error);
                        return reject('Deu pau no insert bicho');
                    }
                    resolve();
                });
        });
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            this._dataBase.get(
                    `DELETE FROM livros WHERE id = ?`,
                [id],
                (error) => {
                    if (error) {
                        return reject('Não foi possível remover o livro!');
                    }
                    return resolve();
                }
            );
        });
    }

    atualiza(livro) {
        return new Promise((resolve, reject) => {
            this._dataBase.run(
                    `UPDATE livros SET titulo = ?, preco = ?, descricao = ? WHERE id = ?`,
                [livro.titulo, livro.preco, livro.descricao, livro.id],
                error => {
                    if (error) {
                        return reject('Não foi possível atualizar o livro!');
                    }
                    resolve();
                });
        });
    }

}

module.exports = LivrosDAO;
