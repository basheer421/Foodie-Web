async function login(email, password) {
	try {
		const data = await fetch("http://vk4c4sk.68.183.80.161.sslip.io/api/login/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				mode: 'no-cors',
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
	localStorage.setItem('Authorization', response.result);
	return true;
	} catch (error) {
		alert("Error logging in");
		return false;
	}
}

const loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const success = await login(email, password);
	if (success) {
		window.location.href = "reqEmail.html";
	}
});

const formContainer = document.getElementById("formContainer");
formContainer.addEventListener("submit", (event) => {
	event.preventDefault();
});

if (localStorage.getItem('Authorization') !== null) {
	window.location.href = "reqEmail.html";
}
