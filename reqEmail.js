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

const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", async () => {
    await logout();
    window.location.href = "login.html";
});
