function updateDateTime() {
	var dateTimeElement = document.getElementById("datetime");
	var now = new Date();
	var options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		timeZoneName: "short",
	};
	var formattedDateTime = now.toLocaleDateString("en-US", options);
	dateTimeElement.textContent = formattedDateTime;
}

// Update date and time every second
setInterval(updateDateTime, 1000);

// Initial call to display the date and time immediately
updateDateTime();

const items = [
	{
		name: "Apple",
		category: "Fruits",
		quantity: 15,
		expiryDate: "2024-04-10",
		weight: "1.8kg",
		donationQuantity: 0,
	},
	{
		name: "Banana",
		category: "Fruits",
		quantity: 10,
		expiryDate: "2024-04-22",
		weight: "2.5kg",
		donationQuantity: 0,
	},
	{
		name: "Watermelon",
		category: "Fruits",
		quantity: 5,
		expiryDate: "2024-04-15",
		weight: "12kg",
		donationQuantity: 0,
	},
	{
		name: "Pineapple",
		category: "Fruits",
		quantity: 3,
		expiryDate: "2024-04-23",
		weight: "3kg",
		donationQuantity: 0,
	},
	{
		name: "Toast",
		category: "Bread",
		quantity: 2,
		expiryDate: "2024-04-11",
		weight: "1kg",
		donationQuantity: 0,
	},
	{
		name: "Arabian Bread",
		category: "Bread",
		quantity: 2,
		expiryDate: "2024-04-11",
		weight: "1kg",
		donationQuantity: 0,
	},
	{
		name: "baguette",
		category: "Bread",
		quantity: 8,
		expiryDate: "2024-04-20",
		weight: "0.6kg",
		donationQuantity: 0,
	},
];

function updateDonationQuantity(index, value) {
	items[index].donationQuantity = value;
}

function displayItems() {
	const tableBody = document.getElementById("foodListBody");
	items.forEach((item, index) => {
		const row = tableBody.insertRow();
		row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.quantity}</td>
            <td>${item.expiryDate}</td>
            <td>${item.weight}</td>
            <td>
                <input type="number" value="${item.donationQuantity}" min="0" max="${item.quantity}" onchange="updateDonationQuantity(${index}, this.value)">
            </td>
        `;
	});
}

displayItems();
