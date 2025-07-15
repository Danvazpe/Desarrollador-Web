let currentInput = '';
let previousInput = '';
let operator = null;

// Obtén todos los botones
const buttons = document.querySelectorAll('.btn');
const visor = document.getElementById('visor');

// Añadir eventos a cada botón
buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

function handleButtonClick(event) {
    const value = event.target.getAttribute('data-value');

    if (value === 'C') {
        clearScreen();
    } else if (value === 'Enter') {
        calculate();
    } else if (value === '+/-') {
        changeSign();
    } else if (['+', '-', '*', '/'].includes(value)) {
        setOperation(value);
    } else if (value === '.') {
        addDecimal();
    } else {
        addToScreen(value);
    }
}

function addToScreen(value) {
    currentInput += value;
    visor.value = currentInput;
}

function setOperation(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    let result;
    let prev = parseFloat(previousInput);
    let current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) {
        visor.value = 'ERROR';
        return;
    }

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                visor.value = 'ERROR';
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
    visor.value = currentInput;
}

function clearScreen() {
    currentInput = '';
    previousInput = '';
    operator = null;
    visor.value = '';
}

function addDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        visor.value = currentInput;
    }
}

function changeSign() {
    if (currentInput === '') return;
    currentInput = (parseFloat(currentInput) * -1).toString();
    visor.value = currentInput;
}
