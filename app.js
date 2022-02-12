// ------------ global variables ------------
//an object act on user's selection
const userSelection = {
    number : addNumber,
    operation : addOperation,
    clear : clearScreen,
    equal : showResult,
    delete : removeLastNumber
}
const buttons = document.querySelectorAll('button');
const currentOperand = document.querySelector('.cur-operand');
const previousOperand = document.querySelector('.pre-operand');
let result;
let currentSymbol;

// ------------ main program ------------
buttons.forEach(btn => {
    btn.addEventListener('click', e => {
        // deciding what to do depend on every button
        userSelection[e.target.dataset.id](e.target.innerText);
    })
});

// ------------ functions ------------
function addNumber(number) {
    if (
        (number === '.' && currentOperand.innerText.includes('.'))||
        currentOperand.innerText.length > 18
    ) return;
    currentOperand.innerText === '0'? currentOperand.innerText=number:
    currentOperand.innerText += number;
}

function addOperation(operand) {
    if (currentOperand.innerText === '0') return;
    if (previousOperand.innerText === '') {
        previousOperand.innerText = currentOperand.innerText;
        currentOperand.innerText = '0';
        currentSymbol = operand;
    }
    else if (previousOperand !== '') {
        previousOperand.innerText = compute(currentSymbol).toString();
        currentOperand.innerText = '0';
    }
}

function clearScreen() {
    currentOperand.innerText = '0';
    previousOperand.innerText = '';
    currentSymbol = undefined;
}

function showResult() {
    currentOperand.innerText = compute(currentSymbol);
    previousOperand.innerText = '';
}

function removeLastNumber() {
    currentOperand.innerText.length === 1? currentOperand.innerText = '0':
    currentOperand.innerText = currentOperand.innerText.slice(0, -1);
}

function compute(symbol) {
    const pre = parseFloat(previousOperand.innerText);
    const cur = parseFloat(currentOperand.innerText);

    switch(symbol) {
        case '+':
            return pre + cur;
        case '-':
            return pre - cur;
        case '×':
            return pre * cur;
        case '÷':
            return pre / cur;
        default:
            return
    }
}