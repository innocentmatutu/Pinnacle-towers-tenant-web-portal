// tenant/js/rent_overview.js

async function loadRentOverview() {
    const rentContainer = document.getElementById('rent-data');
    const user = JSON.parse(localStorage.getItem("user"));

    // 1. Security Check: Only display for Tenants
    if (!user || user.role !== 'Tenant') {
        rentContainer.innerHTML = `<p>Dashboard access restricted to Tenants.</p>`;
        return;
    }

    try {
        // 2. Fetch data
        const response = await fetch('rent_data.json'); 
        if (!response.ok) throw new Error("Could not find rent data.");
        
        const data = await response.json();
        const rent = data[user.username];

        if (rent) {
            // 3. Define conditional status message (Pay button removed)
            const statusMessage = rent.outstandingBalance > 0 
                ? `<p style="color: var(--pinnacle-crimson); font-weight: bold; margin-top: 10px;">Please use the payment portal below to clear your balance.</p>` 
                : `<p style="color: var(--pinnacle-success); font-weight: bold; margin-top: 10px;">✓ Account is up to date.</p>`;

            // 4. Inject content
            rentContainer.innerHTML = `
                <div class="rent-details" style="display: flex; flex-direction: column; gap: 10px; margin-top: 15px;">
                    <p><strong>Current Rent:</strong> KES ${rent.currentRent.toLocaleString()}</p>
                    <p style="color: ${rent.outstandingBalance > 0 ? 'var(--pinnacle-crimson)' : 'inherit'};">
                        <strong>Outstanding Balance:</strong> KES ${rent.outstandingBalance.toLocaleString()}
                    </p>
                    <p><strong>Last Payment:</strong> KES ${rent.lastPayment.amount.toLocaleString()} (Paid on ${rent.lastPayment.date})</p>
                    ${statusMessage}
                </div>
            `;
        } else {
            rentContainer.innerHTML = `<p>No rent data found for user: ${user.username}</p>`;
        }
    } catch (error) {
        console.error("Rent Load Error:", error);
        rentContainer.innerHTML = `<p>Unable to retrieve rent details at this time. Please contact administration.</p>`;
    }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", loadRentOverview);