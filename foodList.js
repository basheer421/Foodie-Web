
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

let items = [];


function updatequantity(index, value) {
	items[index].donate_quantity = value;
}

function displayItems() {
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
                <input type="number" value="0" min="0" max="${item.quantity}" onchange="updatequantity(${index}, this.value)">
            </td>
        `;
	});
}

window.addEventListener("load", async () => {
	const urlParams = new URLSearchParams(window.location.search);
	const email = urlParams.get("email");
	const response = await fetch(`http://vk4c4sk.68.183.80.161.sslip.io:80/api/user_items/`, {
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
	items = res.result;
	for (let i = 0; i < items.length; i++) {
		items[i].donate_quantity = 0;
	}
	const loadingHeader = document.getElementById("loading");
	loadingHeader.style.display = hidden;
	displayItems();
});

async function logout() {
	try {
		const data = await fetch("http://vk4c4sk.68.183.80.161.sslip.io:80/api/logout", {
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


const finishButton = document.getElementById("finishButton");
finishButton.addEventListener("click", async () => {
	const urlParams = new URLSearchParams(window.location.search);
	const email = urlParams.get("email");
	const itemsToDonate = items.filter((item) => item.quantity > 0);
	const payload = {
		email,
		items: itemsToDonate,
	};
	const response = await fetch("http://vk4c4sk.68.183.80.161.sslip.io:80/api/donate_items/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: localStorage.getItem("Authorization"),
		},
		body: JSON.stringify(payload),
	});
	const res = await response.json();
	res ? alert("Donation successful") : alert("Donation failed");
	window.location.reload();
});
