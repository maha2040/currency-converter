const readline = require("readline");

const EXCHANGE_RATE = 82.50; // Fixed rate: 1 USD = 82.50 INR

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Converts currency between INR and USD.
 * @param {number} amount - The amount to convert.
 * @param {string} targetCurrency - The target currency ('USD' or 'INR').
 * @returns {number} - The converted amount.
 */
function convertCurrency(amount, targetCurrency) {
  if (targetCurrency.toUpperCase() === "USD") {
    return amount / EXCHANGE_RATE; // Convert INR to USD
  } else if (targetCurrency.toUpperCase() === "INR") {
    return amount * EXCHANGE_RATE; // Convert USD to INR
  } else {
    throw new Error("Invalid currency. Use 'USD' or 'INR'.");
  }
}

/**
 * Prompts the user for input and performs currency conversion.
 */
function startConversion() {
  console.log(`\nWelcome to the Currency Converter! (Exchange Rate: 1 USD = ${EXCHANGE_RATE} INR)`);
  console.log("Type 'exit' at any prompt to quit.");

  function promptUser() {
    rl.question("\nEnter amount to convert: ", (amountInput) => {
      if (amountInput.toLowerCase() === "exit") {
        console.log("Goodbye!");
        rl.close();
        return;
      }

      const amount = parseFloat(amountInput);
      if (isNaN(amount) || amount <= 0) {
        console.log("Please enter a valid positive number.");
        return promptUser();
      }

      rl.question("Convert to (USD/INR): ", (currency) => {
        if (currency.toLowerCase() === "exit") {
          console.log("Goodbye!");
          rl.close();
          return;
        }

        if (currency.toUpperCase() !== "USD" && currency.toUpperCase() !== "INR") {
          console.log("Invalid currency. Please choose 'USD' or 'INR'.");
          return promptUser();
        }

        try {
          const result = convertCurrency(amount, currency);
          console.log(`Converted Amount: ${result.toFixed(2)} ${currency.toUpperCase()}`);
          promptUser();
        } catch (error) {
          console.log(`Error: ${error.message}`);
          promptUser();
        }
      });
    });
  }

  promptUser();
}

startConversion();
