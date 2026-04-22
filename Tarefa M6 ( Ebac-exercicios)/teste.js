
let secretNumber = Math.floor(Math.random() * 100) + 1;
let tentativas = 10;


function checkNumber() {
    const userNumber = document.getElementById('number').value;
    const result = document.getElementById('result');
    result.classList.remove('certo', 'errado');

    tentativas--;
    if (userNumber == secretNumber) {
        document.getElementById('result').innerHTML = 'Parabéns! Você acertou o número.';
        result.classList.add('certo');
        setTimeout(resetGame, 1500); // reinicia em 1s
        return;
    }
    else if (userNumber < secretNumber) {
        document.getElementById('result').innerHTML = 'O número é maior. Tente novamente.';
        result.classList.add('errado');
    } else {
        document.getElementById('result').innerHTML = 'O número é menor. Tente novamente.';
        result.classList.add('errado');
    }
    
    document.getElementById('tentativas').innerHTML = tentativas;
    console.log('userNumber:', userNumber);
    console.log('secretNumber:', secretNumber);
    if (tentativas === 0) {
        document.getElementById('result').innerHTML = 'Game Over! O número secreto era: ' + secretNumber;
        setTimeout(resetGame, 1500);
    }

    if (tentativas < 1) {
        tentativas++;
    }

    function resetGame() {
        secretNumber = Math.floor(Math.random() * 100) + 1;
        tentativas = 10;

        document.getElementById('tentativas').innerHTML = tentativas;

        const result = document.getElementById('result');
        result.innerHTML = '';
        result.classList.remove('certo', 'errado');

        document.getElementById('number').value = '';
    }
}





