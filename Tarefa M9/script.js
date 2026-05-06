// Seleciona a lista de tarefas
const tarefas = document.getElementById("listaTarefas")
// Faz uma requisição para a API para obter as tarefas
fetch("https://crudcrud.com/api/c328d8b77ab94163b762ead5dd371f90/tarefas")
.then(resposta => resposta.json()) // converte a resposta para json
.then((listaDeTarefas) => {
    // percorre a lista de tarefas e adiciona cada tarefa à lista do HTML
    listaDeTarefas.forEach(tarefa => {
        //json
        // Cria um item de lista para cada tarefa e adiciona um botão de excluir
        const item = document.createElement("li");
        // Adiciona a descrição da tarefa
        item.innerHTML = `${tarefa.descrição} `;
        
        // Cria o botão de excluir
        const botao = document.createElement("button");
        botao.textContent = "x";
        botao.dataset.id = tarefa._id;
        botao.addEventListener("click", () => excluirTarefa(tarefa._id));
        
        item.appendChild(botao);
        // Adiciona o item de lista à lista de tarefas no HTML
        tarefas.appendChild(item);
        
    });
})
// Adiciona um evento de clique ao botão de adicionar tarefa
document.getElementById("add").addEventListener("click", () => {
// Obtém a descrição da nova tarefa a partir do campo de entrada
    const descrição = document.getElementById("tarefa").value;
// Faz uma requisição POST para a API para adicionar a nova tarefa
    fetch("https://crudcrud.com/api/c328d8b77ab94163b762ead5dd371f90/tarefas", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({descrição : descrição})
    })// converte a resposta para json
    .then(resposta => resposta.json())
    .then((tarefa) => {
        const item = document.createElement("li");
        item.innerHTML = `${tarefa.descrição} `;
        
        const botao = document.createElement("button");
        botao.textContent = "x";
        botao.dataset.id = tarefa._id;
        botao.addEventListener("click", () => excluirTarefa(tarefa._id));
        
        item.appendChild(botao);
        tarefas.appendChild(item);
    });
})

const excluirTarefa = (id) => {
    // Tenta com diferentes CORS proxies
    const url = `https://crudcrud.com/api/c328d8b77ab94163b762ead5dd371f90/tarefas/${id}`;
    
    fetch(url, {
        method: "DELETE"
    })
    .then(resposta => {
        if (resposta.ok) {
            location.reload();
        } else {
            console.error("Erro:", resposta.status);
        }
    })
    .catch(erro => {
        console.error("Erro ao deletar:", erro);
        alert("Erro ao deletar tarefa. Verificar console.");
    });
}