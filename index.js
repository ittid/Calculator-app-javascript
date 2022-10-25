/*=== === === === === === === === ===
~~~~ JavaScript Calculator Code ~~~~
=== === === === === === === === ===*/
class Calculator {
  constructor(outputPrevious, outputCurrent) {
    this.outputPrevious = outputPrevious;
    this.outputCurrent = outputCurrent;
    this.clear();
  }
  clear() {
    this.currentOperand = "";
    this.previousOpreand = "";
    this.operationButton = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.toString().includes(".")) {
      return;
    }
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  selectOperation(operation) {
    if (this.currentOperand === "") {
      return;
    }
    if (this.previousOpreand != "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOpreand = this.currentOperand;
    this.currentOperand = "";
  }
  compute() {
    let computeResult;
    const previous = parseFloat(this.previousOpreand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(previous) || isNaN(current)) {
      return;
    }
    switch (this.operation) {
      case "+":
        computeResult = previous + current;
        break;
      case "-":
        computeResult = previous - current;
        break;
      case "*":
        computeResult = previous * current;
        break;
      case "÷":
        computeResult = previous / current;
        break;
      default:
        return;
    }
    this.currentOperand = computeResult;
    this.operation = undefined;
    this.previousOpreand = "";
  }
  getNumberInScreen(number) {
    const string = number.toString();
    const integerDigits = parseFloat(string.split(".")[0]);
    const DecimalDigits = string.split(".")[1];
    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (DecimalDigits != null) {
      return `${integerDisplay}.${DecimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateScreen() {
    this.outputCurrent.innerText = this.getNumberInScreen(this.currentOperand);
    if (this.operation != null) {
      this.outputPrevious.innerText = `${this.getNumberInScreen(
        this.previousOpreand
      )}${this.operation}`;
    } else {
      this.outputPrevious.innerText = "";
    }
  }
}

const numberButtn = document.querySelectorAll("[data-numbers]");
const operationButtn = document.querySelectorAll("[data-operator]");
const equalButtn = document.querySelector("[data-equals]");
const deleteButtn = document.querySelector("[data-delete]");
const clearButtn = document.querySelector("[data-all-clear]");
const outputPrevious = document.querySelector("[data-previous]");
const outputCurrent = document.querySelector("[data-current]");

const calculator = new Calculator(outputPrevious, outputCurrent);

numberButtn.forEach((number) => {
  number.addEventListener("click", () => {
    calculator.appendNumber(number.innerText);
    calculator.updateScreen();
  });
});

operationButtn.forEach((operation) => {
  operation.addEventListener("click", () => {
    calculator.selectOperation(operation.innerText);
    calculator.updateScreen();
  });
});

equalButtn.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateScreen();
});

clearButtn.addEventListener("click", () => {
  calculator.clear();
  calculator.updateScreen();
});

deleteButtn.addEventListener("click", () => {
  calculator.delete();
  calculator.updateScreen();
});
