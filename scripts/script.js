// Load Event Listener
document.addEventListener('DOMContentLoaded', async () => {
	// get song
	const response = await fetch('http://localhost:3000/api/songs');
	const songs = await response.json();

	// update HTML
	let html = "";
	for (let song of songs) {
		let songID = song._id
		html += `<li><a href="details.html?id=${songID}">${song.title} - ${song.artist}</a> (<a href="editor.html?id=${songID}&edit=true">Edit</a>)</li> `;
	}

	document.querySelector("#song-output").innerHTML = html;
	console.log(html)
});