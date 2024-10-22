function calculateTax() {
    const homeValue = parseFloat(document.getElementById("homeValue").value);
    const tbody = document.querySelector("#results tbody");
    tbody.innerHTML = ""; // Clear previous results

    if (isNaN(homeValue) || homeValue <= 0) {
        alert("Please enter a valid home value.");
        return;
    }

    let currentHomeValue = homeValue;
    const taxRates = [25, 50, 75, 100, 100, 100, 100]; // Per $100k value

    for (let year = 1; year <= 7; year++) {
        const annualTax = (currentHomeValue / 100000) * taxRates[year - 1];
        const monthlyTax = annualTax / 12;
        const weeklyTax = annualTax / 52;
        const dailyTax = annualTax / 365;

        const row = `
            <tr>
                <td>${year}</td>
                <td>${formatCurrency(currentHomeValue)}</td>
                <td>${formatCurrency(annualTax)}</td>
                <td>${formatCurrency(monthlyTax)}</td>
                <td>${formatCurrency(weeklyTax)}</td>
                <td>${formatCurrency(dailyTax)}</td>
            </tr>
        `;
        tbody.insertAdjacentHTML("beforeend", row);

        currentHomeValue *= 1.02; // Increase home value by 2% each year
    }
}

function formatCurrency(value) {
    return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
