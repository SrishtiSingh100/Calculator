
const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".button");

let currentDisplay = "";

buttons.forEach(button => {
    button.addEventListener("click", () => {

        const value = button.dataset.value;

        if (value === "C") {
            // Clear the display
            currentDisplay = "";
            display.value = "";

        } else if (value === "DEL") {
            // Delete the last character
            currentDisplay = currentDisplay.slice(0, -1);
            display.value = currentDisplay;

        } else if (value === "=") {
            // Evaluate the expression
            calculate();

        } else {
            // Append the clicked button value
            currentDisplay += value;
            display.value = currentDisplay;
        }

    });
});

function calculate() {
    try {

        if (currentDisplay === "") return;

        // Allow only valid mathematical expressions
        if (!/^[0-9+\-*/%.() ]+$/.test(currentDisplay)) {
            throw new Error("Invalid expression");
        }

        // Prevent invalid expressions
        if (!/^[0-9]/.test(currentDisplay)) {
            throw new Error("Invalid expression");
        }

        const result = Function(
            '"use strict"; return (' + currentDisplay + ')'
        )();

        if (!Number.isFinite(result)) {
            throw new Error("Math error");
        }

        currentDisplay = String(
            Number(result.toFixed(10))
        );

        display.value = currentDisplay;

    } catch (error) {
        display.value = "Error";
        currentDisplay = "";
    }
}

// Keyboard support
document.addEventListener("keydown", event => {

    const key = event.key;

    if (/^[0-9.+\-*/%]$/.test(key)) {
        currentDisplay += key;
        display.value = currentDisplay;

    } else if (key === "Enter" || key === "=") {
        calculate();

    } else if (key === "Backspace") {
        currentDisplay = currentDisplay.slice(0, -1);
        display.value = currentDisplay;

    } else if (key === "Escape") {
        currentDisplay = "";
        display.value = "";
    }

});
