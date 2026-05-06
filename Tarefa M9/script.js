const API_URL = 'https://crudcrud.com/api/c328d8b77ab94163b762ead5dd371f90/clients';

const listaClientes = document.getElementById('lista-clientes');

async function carregarClientes() {
    try {
        const resposta = await fetch(API_URL);
        if (!resposta.ok) throw new Error('Erro ao obter clientes');
        const clientes = await resposta.json();
        renderizarClientes(clientes);
    } catch (erro) {
        console.error(erro);
    }
}

function renderizarClientes(clientes) {
    listaClientes.innerHTML = '';
    clientes.forEach(cliente => {
        const item = document.createElement('li');
        item.textContent = cliente.nome;

        const botao = document.createElement('button');
        botao.textContent = 'x';
        botao.addEventListener('click', () => excluirCliente(cliente._id));

        item.appendChild(botao);
        listaClientes.appendChild(item);
    });
}

document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const input = document.querySelector('input[name="cliente"]');
    const nome = input.value.trim();
    if (!nome) return;

    try {
        const resposta = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome })
        });
        if (!resposta.ok) throw new Error('Erro ao cadastrar cliente');
        input.value = '';
        carregarClientes();
    } catch (erro) {
        console.error(erro);
    }
});

async function excluirCliente(id) {
    try {
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!resposta.ok) throw new Error('Erro ao excluir cliente');
        carregarClientes();
    } catch (erro) {
        console.error(erro);
    }
}

carregarClientes();