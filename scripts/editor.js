// Frequent Variables
var editorMode = "false";
var method = "POST";
var endpoint = "http://localhost:3000/api/songs/"
var songID = 0

addEventListener("DOMContentLoaded", async () => {
	const urlparam = new URLSearchParams(window.location.search);
	const editorMode = urlparam.get('edit');
	console.log(editorMode)

	// Change scope if editing a song
	if (editorMode == "true") {
		autofill();
		method = "PUT";
		document.querySelector("#header").textContent = "Update a Song:"
	}

	document.querySelector("#updateButton").addEventListener("click", uploadSong);
})

// upload the song into the database
async function uploadSong() {
	const song = {
		title: document.querySelector("#title").value,
		artist: document.querySelector("#artist").value,
		releaseDate: document.querySelector("#released").value,
		popularity: document.querySelector("#popularity").value,
		genre: document.querySelector("#genre").value ? document.querySelector("#genre").value.split(",") : []
	}

	const response = await fetch(endpoint, {
		method: method,
		headers: {
			"Content-Type": "application/json"
		}, 
		body: JSON.stringify(song)
	})

	if (response.ok) {
		// if we're editing, then we'll have the ID via the endpoint
		if (editorMode == "true") {
			alert(`Updated Database (Song ID: ${songID})`);
			window.location.assign("/index.html");
		}
		// if not, then we need to query the response
		let results = await response.json();
		alert(`Updated Database (Song ID: ${results._id})`);
		document.querySelector("#add-song-form").reset();
	} else {
		document.querySelector("#error").innerHTML = "Cannot add/update song"
	}
}

async function autofill() {
	const urlparam = new URLSearchParams(window.location.search);
	songID = urlparam.get('id');
	endpoint += songID;
	const response = await fetch("http://localhost:3000/api/songs/" + songID);

	if (response.ok) {
		let song = await response.json();
		document.querySelector("#id").value = song._id;
		document.querySelector("#title").value = song.title;
		document.querySelector("#artist").value = song.artist;
		document.querySelector("#released").value = song.releaseDate.substring(0,10);
		document.querySelector("#popularity").value = song.popularity;
		document.querySelector("#genre").value = song.genre;
	}
}