
async function login(email, password) {
	try {
		const data = await fetch("http://localhost:80/api/login/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: email, password: password }),
		});
	if (localStorage.getItem('Authorization') !== null) {
		localStorage.removeItem('Authorization');
	}
	const response = await data.json();
	if (response.error) {
		alert(response.error);
		return false;
	}
	localStorage.setItem('Authorization', response.result.access_token);
	return true;
	} catch (error) {
		alert("Error logging in");
		return false;
	}
}

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

const loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const success = await login(email, password);
    if (success) {
        window.location.href = "reqEmail.html";
    } else {
		alert("Invalid email or password");
	}
});
