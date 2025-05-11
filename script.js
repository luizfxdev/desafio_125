// Função principal que executa as operações mágicas
function performMagic(operations, numbers) {
    // Verifica se há números para operar
    if (numbers.length === 0) return 0;

    // Faz uma cópia do array de números para não modificar o original
    let currentNumbers = [...numbers];

    // Executa cada operação na sequência
    for (const operation of operations) {
        switch (operation.toLowerCase()) {
            case 'sum':
                currentNumbers = [currentNumbers.reduce((a, b) => a + b, 0)];
                break;
            case 'multiply':
                currentNumbers = [currentNumbers.reduce((a, b) => a * b, 1)];
                break;
            case 'max':
                currentNumbers = [Math.max(...currentNumbers)];
                break;
            default:
                console.warn(`Operação desconhecida: ${operation}`);
        }
    }

    // Retorna o resultado final (primeiro elemento do array)
    return currentNumbers[0];
}

// Função para validar e processar a entrada do usuário
function processInput() {
    // Obtém os valores dos inputs
    const operationsInput = document.getElementById('operations').value;
    const numbersInput = document.getElementById('numbers').value;

    // Valida as entradas
    if (!operationsInput || !numbersInput) {
        alert('Por favor, preencha ambos os campos!');
        return null;
    }

    try {
        // Processa as operações (remove espaços e divide por vírgula)
        const operations = operationsInput.split(',').map(op => op.trim());

        // Processa os números (converte para array de números)
        const numbers = numbersInput.split(',').map(num => {
            const parsed = parseFloat(num.trim());
            if (isNaN(parsed)) throw new Error(`Valor inválido: ${num}`);
            return parsed;
        });

        return { operations, numbers };
    } catch (error) {
        alert(`Erro ao processar entrada: ${error.message}`);
        return null;
    }
}

// Função para exibir o resultado
function displayResult(result) {
    const resultElement = document.getElementById('result');
    resultElement.textContent = result;
    resultElement.style.animation = 'glowing 2s ease-in-out';

    // Remove a animação após sua conclusão para que possa ser executada novamente
    setTimeout(() => {
        resultElement.style.animation = '';
    }, 2000);
}

// Evento para o botão Revelar
document.getElementById('reveal-btn').addEventListener('click', () => {
    const input = processInput();
    if (input) {
        const result = performMagic(input.operations, input.numbers);
        displayResult(result);
    }
});

// Evento para o botão Retornar (limpa os campos)
document.getElementById('return-btn').addEventListener('click', () => {
    document.getElementById('operations').value = '';
    document.getElementById('numbers').value = '';
    document.getElementById('result').textContent = '?';
});