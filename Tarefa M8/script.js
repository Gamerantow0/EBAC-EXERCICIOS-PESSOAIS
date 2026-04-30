const botaoTema = document.getElementById('botaoTema');

botaoTema.addEventListener("click", () => {
    //Verificar se o tema atual é claro ou escuro
    const temaAtual = localStorage.getItem('tema') || 'light';

    const novoTema = temaAtual === 'dark' ? 'light' : 'dark';
    //adicionar a classe ao body
    document.body.classList.remove('dark', 'light');
    document.body.classList.toggle(novoTema);
    //salvar as preferencias do usuario
    localStorage.setItem("tema", novoTema);

    botaoTema.textContent = novoTema === 'dark' ? '☼' : '🌙';
})
//Recuperar as preferencias do usuario
document.addEventListener("DOMContentLoaded", () => {
    const temaSalvo = localStorage.getItem('tema')
    if (temaSalvo === "dark") {
        document.body.classList.add("dark");
        botaoTema.textContent = '☼';
    } else {
        botaoTema.textContent = '🌙';
    }
})

//Recuperar os dados do localStorage e preencher os campos
document.addEventListener("DOMContentLoaded", () => {
    const cep = localStorage.getItem("cep");
    const logradouro = localStorage.getItem("logradouro");
    const bairro = localStorage.getItem("bairro");
    const cidade = localStorage.getItem("cidade");
    const estado = localStorage.getItem("estado");
    if (cep) {
        document.getElementById('cep').value = cep;
        document.getElementById('logradouro').value = logradouro;
        document.getElementById('bairro').value = bairro;
        document.getElementById('cidade').value = cidade;
        document.getElementById('estado').value = estado;
    }
    else {
        document.getElementById('cep').value = '';
        document.getElementById('logradouro').value = '';
        document.getElementById('bairro').value = '';
        document.getElementById('cidade').value = '';
        document.getElementById('estado').value = '';
    }
})
//ouvir o eventto de quando o usuario sair do campo de CEP
document.getElementById('cep').addEventListener("blur", () => {
    const elemento = event.target;
    const cepInformado = elemento.value

    //validar o cep
    if (!(cepInformado.length === 8))
        return;

    //consultar o cep na API
    fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
        .then(response => response.json())
        .then(data => {
            if (!data.erro) {
                document.getElementById('logradouro').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('estado').value = data.uf;
                //salvar os dados no localStorage
                document.addEventListener("DOMContentLoaded", () => {
                    localStorage.setItem("cep", cepInformado);
                    localStorage.setItem("logradouro", data.logradouro);
                    localStorage.setItem("bairro", data.bairro);
                    localStorage.setItem("cidade", data.localidade);
                    localStorage.setItem("estado", data.uf);
                })
            }
            else {
                alert("CEP não encontrado.");
            }
        })
        .catch(error => {
            console.error("Erro ao consultar o CEP:", error);
        });
})