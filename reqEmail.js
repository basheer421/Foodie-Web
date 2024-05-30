async function logout() {
	try {
		const data = await fetch("http://localhost:80/api/logout", {
			method: "POST",
			headers: {
				"Content-Type": "application",
				Authorization: localStorage.getItem("Authorization"),
			},
		});
		const response = await data.json();
		if (response.error) {
			alert(response.error);
		}
		localStorage.removeItem("Authorization");
	} catch (error) {
		alert("Error logging out");
	}
}

const formContainer = document.getElementById("formContainer");
formContainer.addEventListener("submit", (event) => {
	event.preventDefault();
});

const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", async () => {
    await logout();
    window.location.href = "login.html";
});

const viewButton = document.getElementById("viewButton");
viewButton.addEventListener("click", async () => {
	const email = document.getElementById("Donator Email").value;
	const params = new URLSearchParams({ email });
	console.log(`foodList.html?${params.toString()}`);
	window.location.href = `foodList.html?${params.toString()}`;
});
