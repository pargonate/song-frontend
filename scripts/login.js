let token;

document.querySelector("#loginButton").addEventListener("click", async() => {
	const username = document.querySelector("#username").value;
	const password = document.querySelector("#password").value;
	login(username, password);
});

async function login(username, password) {
	const login_credentials = {
		username,
		password
	}

	const response = await fetch("http://localhost:3000/api/auth", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(login_credentials)
	});	

	if (response.ok) {
		const tokenResponse = await response.json();
		token = tokenResponse.token;
		username = tokenResponse.foundUsername;
		auth = tokenResponse.auth;

		console.log(token)

		localStorage.setItem("token", token);
		localStorage.setItem("username", username);
		localStorage.setItem("auth", auth);

		window.location.replace("/index.html");
	} else {
		document.querySelector("#error").innerHTML = "Bad username and password"
	}
}