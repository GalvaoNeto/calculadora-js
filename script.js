document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            calculate("+");
        }
    });

    document.getElementById("toggleTheme").addEventListener("click", function () {
        document.body.classList.toggle("light-mode");
    });

    document.getElementById("copyResult").addEventListener("click", function () {
        let resultText = document.getElementById("result").innerText;
        navigator.clipboard.writeText(resultText);
        alert("Resultado copiado!");
    });

    document.getElementById("toggleHistory").addEventListener("click", function () {
        let historyContainer = document.getElementById("history-container");
        if (historyContainer.classList.contains("hidden")) {
            historyContainer.classList.remove("hidden");
            this.innerText = "Ocultar Histórico";
        } else {
            historyContainer.classList.add("hidden");
            this.innerText = "Mostrar Histórico";
        }
    });

    loadHistory();
});

function calculate(operator) {
    let num1 = parseFloat(document.getElementById("firstNumber").value);
    let num2 = parseFloat(document.getElementById("secondNumber").value);
    let result = document.getElementById("result");

    if (isNaN(num1) || isNaN(num2)) {
        result.innerText = "Digite números válidos!";
        return;
    }

    let finalResult;
    switch (operator) {
        case '+': finalResult = num1 + num2; break;
        case '-': finalResult = num1 - num2; break;
        case '*': finalResult = num1 * num2; break;
        case '/': finalResult = num2 !== 0 ? (num1 / num2).toFixed(2) : "Erro!"; break;
    }

    result.innerText = finalResult;
    saveHistory(num1, operator, num2, finalResult);
}

function clearFields() {
    document.getElementById("firstNumber").value = "";
    document.getElementById("secondNumber").value = "";
    document.getElementById("result").innerText = "Resultado";
}

function saveHistory(num1, operator, num2, result) {
    let history = JSON.parse(localStorage.getItem("history")) || [];
    history.push(`${num1} ${operator} ${num2} = ${result}`);
    localStorage.setItem("history", JSON.stringify(history));
    loadHistory();
}

function loadHistory() {
    let historyList = document.getElementById("history");
    let history = JSON.parse(localStorage.getItem("history")) || [];
    historyList.innerHTML = history.map(entry => `<li>${entry}</li>`).join("");
}
