const sqlite = require('sqlite3').verbose();
const dataBase = new sqlite.Database('data.db');

const USUARIOS_SCHEMA = `
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    nome_completo VARCHAR(40) NOT NULL UNIQUE, 
    email VARCHAR(255) NOT NULL, 
    senha VARCHAR(255) NOT NULL
)
`;

const INSERIR_USUARIO_1 =
    `
INSERT INTO usuarios (
    nome_completo, 
    email,
    senha
) SELECT 'Eduardo da Silva', 'dukrl222@hotmail.com', '1234' WHERE NOT EXISTS (SELECT * FROM usuarios WHERE email = 'dukrl222@hotmail.com')
`;

const LIVROS_SCHEMA =
    `
CREATE TABLE IF NOT EXISTS livros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL, 
    preco REAL NOT NULL,
    descricao TEXT DEFAULT ('') NOT NULL
)
`;

const INSERIR_LIVRO_1 =
    `
INSERT INTO livros (
    titulo,
    preco,
    descricao
) SELECT 'Node na prática', 30.0, 'Como desenvolver com Node.' WHERE NOT EXISTS (SELECT * FROM livros WHERE titulo = 'Node na prática')
`;

const INSERIR_LIVRO_2 =
    `
INSERT INTO livros (
    titulo, 
    preco,
    descricao
) SELECT 'JavaScript na prática', 40.0, 'Como desenvolver com JavaScript.' WHERE NOT EXISTS (SELECT * FROM livros WHERE titulo = 'JavaScript na prática')
`;

dataBase.serialize(() => {
    dataBase.run("PRAGMA foreign_keys=ON");
    dataBase.run(USUARIOS_SCHEMA);
    dataBase.run(INSERIR_USUARIO_1);
    dataBase.run(LIVROS_SCHEMA);
    dataBase.run(INSERIR_LIVRO_1);
    dataBase.run(INSERIR_LIVRO_2);

    dataBase.each("SELECT * FROM usuarios", (err, usuario) => {
        console.log('Usuario: ');
        console.log(usuario);
    });
});

process.on('SIGINT', () =>
    dataBase.close(() => {
        console.log('dataBase encerrado!');
        process.exit(0);
    })
);

module.exports = dataBase;
