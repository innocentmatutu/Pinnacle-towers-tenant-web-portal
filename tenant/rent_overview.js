// js/payment and finance/rent_overview.js

async function loadRentOverview() {
    const rentContainer = document.getElementById('rent-data');

    // Simulate data structure based on the project scope for rent overview
    const mockData = {
        currentRent: "KES 45,000",
        outstandingBalance: "KES 0",
        lastPayment: "KES 45,000 (Paid on 2026-06-05)"
    };

    rentContainer.innerHTML = `
        <div class="rent-details" style="display: flex; flex-direction: column; gap: 10px; margin-top: 15px;">
            <p><strong>Current Rent:</strong> ${mockData.currentRent}</p>
            <p><strong>Outstanding Balance:</strong> ${mockData.outstandingBalance}</p>
            <p><strong>Last Payment:</strong> ${mockData.lastPayment}</p>
        </div>
    `;
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", loadRentOverview);