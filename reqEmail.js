async function logout() {
	try {
		const data = await fetch("http://vk4c4sk.68.183.80.161.sslip.io:8000/api/logout", {
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

const formContainer = document.getElementById("formContainer");
formContainer.addEventListener("submit", (event) => {
	event.preventDefault();
});

const viewButton = document.getElementById("viewButton");
viewButton.addEventListener("click", async () => {
	const email = document.getElementById("Donator Email").value;
	const params = new URLSearchParams({ email });
	console.log(`foodList.html?${params.toString()}`);
	window.location.href = `foodList.html?${params.toString()}`;
});
