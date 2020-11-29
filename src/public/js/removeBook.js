let tabelaLivros = document.querySelector('#livros');
tabelaLivros.addEventListener('click', (e) => {
    let elementClick = e.target;

    if (elementClick.dataset.type == 'remove') {
        let bookID = elementClick.dataset.ref;
        fetch(`http://localhost:3000/livros/${bookID}`, {method: 'DELETE'})
            .then(response => {
                let tr = elementClick.closest(`#livro_${bookID}`);
                tr.remove();
            })
            .catch(error => console.log(error));
    }
});
