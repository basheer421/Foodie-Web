
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

/**
 * Login as bank staff
 * Type user email
 * 
 * fetch data from the database related to the user email
 * display the user data on the table
 * user click Finish button
 * update user data in the database
 * 	- update user score (using zaid algo)
 * 	- update user items (remove donated items)
 * - refresh the page 
 * 
 */

// const items = [
// 	{
// 		name: "Apple",
// 		category: "Fruits",
// 		quantity: 15,
// 		expiry_date: "2024-04-10",
// 		weight: "1.8kg",
// 		quantity: 0,
// 	},
// 	{
// 		name: "Banana",
// 		category: "Fruits",
// 		quantity: 10,
// 		expiry_date: "2024-04-22",
// 		weight: "2.5kg",
// 		quantity: 0,
// 	},
// 	{
// 		name: "Watermelon",
// 		category: "Fruits",
// 		quantity: 5,
// 		expiry_date: "2024-04-15",
// 		weight: "12kg",
// 		quantity: 0,
// 	},
// 	{
// 		name: "Pineapple",
// 		category: "Fruits",
// 		quantity: 3,
// 		expiry_date: "2024-04-23",
// 		weight: "3kg",
// 		quantity: 0,
// 	},
// 	{
// 		name: "Toast",
// 		category: "Bread",
// 		quantity: 2,
// 		expiry_date: "2024-04-11",
// 		weight: "1kg",
// 		quantity: 0,
// 	},
// 	{
// 		name: "Arabian Bread",
// 		category: "Bread",
// 		quantity: 2,
// 		expiry_date: "2024-04-11",
// 		weight: "1kg",
// 		quantity: 0,
// 	},
// 	{
// 		name: "baguette",
// 		category: "Bread",
// 		quantity: 8,
// 		expiry_date: "2024-04-20",
// 		weight: "0.6kg",
// 		quantity: 0,
// 	},
// ];

function updatequantity(index, value) {
	items[index].quantity = value;
}

function displayItems(items) {
	const tableBody = document.getElementById("foodListBody");
	items.forEach((item, index) => {
		const row = tableBody.insertRow();
		row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.category_name}</td>
            <td>${item.quantity}</td>
            <td>${new Date(item.expiry_date).toDateString()}</td>
            <td>${item.weight}</td>
            <td>
                <input type="number" value="${item.quantity}" min="0" max="${item.quantity}" onchange="updatequantity(${index}, this.value)">
            </td>
        `;
	});
}

window.addEventListener("load", async () => {
	const urlParams = new URLSearchParams(window.location.search);
	const email = urlParams.get("email");
	const response = await fetch(`http://localhost:80/api/user_items/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: localStorage.getItem("Authorization"),
		},
		body: JSON.stringify({ email }),
	});
	const res = await response.json();
	if (res.error) {
		alert(res.error);
		return;
	}
	const data = res.result;
	console.log(data);
	displayItems(data);
});

async function logout() {
	try {
		const data = await fetch("http://localhost:80/api/logout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: localStorage.getItem("Authorization"),
			},
		});
		localStorage.removeItem("Authorization");
		const response = await data.json();
		if (response.error) {
			alert(response.error);
		}
	} catch (error) {
		alert("Error logging out");
	}
}

const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", async () => {
    await logout();
    window.location.href = "login.html";
});
