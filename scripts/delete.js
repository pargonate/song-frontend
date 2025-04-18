document.addEventListener("DOMContentLoaded", async() => {
	document.querySelector("#deleteButton").addEventListener("click", deleteSong);
	getAllSongs();
});

async function getAllSongs() {
	const response = await fetch("http://localhost:3000/api/songs");
	if (response.ok) {
		const songs = await response.json();
		let html = ""
		for (let song of songs) {
			html += `<option value="${song._id}">${song.title}</option>`;
		}

		document.querySelector("#songDropdown").innerHTML = html;
	}
}

async function deleteSong() {
	const songID = document.querySelector("#songDropdown option:checked").value;
	const response = await fetch(`http://localhost:3000/api/songs/${songID}`, {
		method: "DELETE"
	});

	if (response.ok) {
		getAllSongs();
		alert(`Song with ID: ${songID} deleted`);
	} else {
		document.querySelector("#error").innerHTML = `Cannot delete song with ID: ${songID}`;
	}
}