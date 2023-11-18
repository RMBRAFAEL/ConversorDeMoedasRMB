// Preencher as moedas disponíveis no dropdown
const currencies = ["USD", "EUR", "GBP", "JPY", "CNY", "BRL"]; // Adicione ou remova conforme necessário

const fromCurrencySelect = document.getElementById("from");
const toCurrencySelect = document.getElementById("to");

currencies.forEach(currency => {
    const option1 = document.createElement("option");
    option1.value = currency;
    option1.text = currency;
    const option2 = option1.cloneNode(true);
    
    fromCurrencySelect.appendChild(option1);
    toCurrencySelect.appendChild(option2);
});

async function convertCurrency() {
    const amount = parseFloat(document.getElementById("amount").value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    try {
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const exchangeRates = response.data.rates;

        if (toCurrency in exchangeRates) {
            const convertedAmount = amount * exchangeRates[toCurrency];
            document.getElementById("result").innerText = `Resultado: ${convertedAmount.toFixed(2)} ${toCurrency}`;
        } else {
            document.getElementById("result").innerText = "Moeda de destino inválida.";
        }
    } catch (error) {
        console.error("Erro ao obter as taxas de câmbio", error);
        document.getElementById("result").innerText = "Erro ao converter moeda. Por favor, tente novamente.";
    }
}
