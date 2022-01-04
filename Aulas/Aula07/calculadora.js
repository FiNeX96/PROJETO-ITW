var start = true;
var controlo = 1;
var op1 = "";
var op2 = "";
var operacao = "";
var res = document.getElementById("res");
var resultado = 0;
function addNumber() {
    var x = event.target.value;
    console.log(x);
    if (controlo == 1) {
        op1 = op1 + x;
    }
    else {
        op2 = op2 + x;
    }
    if (start == true) {
        res.innerText = "";
        start = false;
    }
    res.innerText += x;
}
function addOperation() {
        operacao = event.target.value;
        console.log(operacao);
        if (start == true) {
            res.innerText = "";
            start = false;
        }
    res.innerText += operacao;
    controlo++;
}
function clearResult() {
    res.innerText = ""
    op1 = ""
    op2 = ""
    controlo = 1
    start = true
    operacao = ""
    resultado = 0
}
function calculate() {
    console.log(op1)
    console.log(op2)
    if (controlo == 2) {
        switch (operacao) {
            case "+":
                resultado = parseFloat(op1) + parseFloat(op2);
                break;
            case "-":
                resultado = parseFloat(op1) - parseFloat(op2);
                break;
            case "*":
                resultado = parseFloat(op1) * parseFloat(op2);
                break;
            case "/":
                if (op2 == 0) {
                    alert("Divisão por Zero!!!!!")
                }
                else {
                    resultado = parseFloat(op1) / parseFloat(op2);
                    break;
                }
            case "":
                res.innerText = "Olá"
        }
        console.log(resultado)
        res.innerText = resultado;
        controlo = 1;
        op1 = resultado;
        op2 = "";
    }
    }
