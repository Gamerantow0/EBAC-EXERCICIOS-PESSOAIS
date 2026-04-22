class Parquimetro {

    constructor() {
        this.tarifas = [
            { tempo: 30, valor: 1.00 },
            { tempo: 60, valor: 1.75 },
            { tempo: 120, valor: 3.00 }
        ];
    }

    calcularTarifa(valor) {

        // validação
        if (valor < 1) {
            return { erro: "Valor insuficiente para o parquímetro." };
        }

        let tarifa;

        if (valor >= 3.00) {
            tarifa = this.tarifas[2];
        } else if (valor >= 1.75) {
            tarifa = this.tarifas[1];
        } else {
            tarifa = this.tarifas[0];
        }

        // cálculo do troco
        let troco = valor - tarifa.valor;

        // retorno organizado
        return {
            tempo: tarifa.tempo,
            troco: troco
        };
    }
}

const parq = new Parquimetro();

function calcular() {
    const valor = Number(document.getElementById("valor").value);
    const resultado = parq.calcularTarifa(valor);

    const saida = document.getElementById("resultado");

    if (resultado.erro) {
        saida.innerText = resultado.erro;
        saida.style.color = "red";
    } else {
        saida.innerText =
            "Tempo: " + resultado.tempo + " minutos | Troco: R$ " + resultado.troco.toFixed(2);
        saida.style.color = "lightgreen";
    }
}