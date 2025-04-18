class Auth {
	constructor() {
		document.querySelector("body").style.display = "none";
		const auth = localStorage.getItem("auth");
		this.validate(auth);
	}

	validate(auth) {
		if (auth != 1) {
			window.location.replace("/login.html");
		} else {
			document.querySelector("body").style.display = "block";
		}
	}

	logOut() {
		localStorage.removeItem("auth");
		localStorage.removeItem("token");
		localStorage.removeItem("username");

		window.location.replace("/login.html");
	}
}