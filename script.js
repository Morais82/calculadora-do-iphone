
let current = '';
let previous = '';
let operation = null;
let historyList = [];

const display = document.getElementById('display');
const historyDisplay = document.getElementById('history');

function updateDisplay(){
    display.textContent = current || previous || '0';

}

function updateHistory(){
    historyDisplay.innerHTML = historyList.map((item) => `<div>${item}</div>`).join('');
    historyDisplay.scrollTop = historyDisplay.scrollHeight;
}

function appendNumber(num){
    if (num === 0 && current === '0') return;
    current += num.toString();
    updateDisplay();
}

function appendDot(){
    if (!current.includes('.')){
        if(current === '') current = '0';
        current += '.';
        updateDisplay();
    }
}

function clearDisplay(){
    current = '';
    previous = '';
    operation = null;
    updateDisplay();
    updateHistory();
}

function setOperation(op){
    if (current === '') return;
    if (previous !== '') calculate();
    operation = op;
    previous = current;
    current = '';
}

function calculate(){
    if(operation === null || current === '') return;

    const prev = parseFloat(previous);
    const curr = parseFloat(current);
    let result;

    switch (operation){
        case '+': result = prev + curr; break;
        case '-': result = prev - curr; break;
        case '*': result = prev * curr; break;
        case '/': result = curr === 0 ? 'Erro' : prev / curr; break;
    }
    const equation = `${previous} ${operation} ${current} = ${result}`;
    historyList.push(equation);

    current = result.toString();
    previous = '';
    operation = null;
    updateDisplay();
    updateHistory();
}

function invert(){
    if (current){
        current = (parseFloat(current) * -1).toString();
        updateDisplay();
    }
}

function percent(){
    if(current){
        current = (parseFloat(current) / 100).toString();
        updateDisplay();
    }
}

// ==== Suporte para Teclado ====
document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (!isNaN(key)) appendNumber(key);
    if (key === '.') appendDot();
    if (['+', '-', '*', '/']. includes(key)) setOperation(key);
    if (key === 'Enter' || key === '=') calculate();
    if (key === 'Backspace') {
        current = current.slice(0, -1);
        updateDisplay();
    }
    if (key === 'Escape') clearDisplay();
});