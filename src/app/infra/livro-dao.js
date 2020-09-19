class LivroDao {

    constructor(db) {
        this._db = db;
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM livros',
                (erro, resultados) => {
                    if (erro) return reject('Não foi possível listar os livros!');

                    return resolve(resultados);
                }
            )
        });
    }

    adiciona(livro) {
        return new Promise((resolve,reject) => {
            this._db.run(`
            INSERT INTO livros (
                titulo,
                preco,
                descricao
            ) values (?,?,?)
            `,
            [
                livro.titulo,
                livro.preco,
                livro.descricao
            ],
            function(err){
                if(err){
                    console.log(err);
                    return reject('Não foi possível adicionar o livro!');
                }

                resolve();
            });
        });
    }

    busca(id){
        return new Promise((resolve,reject) => {
            this._db.all(
                `
                    SELECT * FROM livros
                    WHERE livros.id = ?
                `,
                [id]
                ,
                (erro, resultados) => {
                    if (erro) return reject('Não foi possível listar os livros!');

                    resolve(resultados);
                }
            )}
        );
    }
    
    altera(id, titulo, preco, descricao){
        return new Promise((resolve,reject) => {
            
            this._db.run(
            `
                UPDATE 
                    livros
                SET 
                    titulo = ?,
                    preco = ?,
                    descricao = ?
                WHERE
                    id = ?;
            `
            ,
                [titulo, preco, descricao, id]
            ,
            function(err){
                if(err){
                    console.log(err);
                    return reject('Não foi possível alterar os dados do livro cadastrado')
                }
                resolve();
            });
        });
    }

    deleta(id){
        return new Promise((resolve,reject) => {
            this._db.all(
                `
                    DELETE 
                        FROM livros
                    WHERE
                        id = ?;
                `,
                [id]
                ,
                (erro) => {
                    if (erro) return reject(console.log(erro));

                    resolve();
                }
            )}
        );

    }
}

module.exports = LivroDao;