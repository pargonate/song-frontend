// Load Event Listener
document.addEventListener('DOMContentLoaded', async () => {
	const response = await fetch('http://localhost:3000/api/songs');
	const songs = await response.json();

	let html = "";
	for (let song of songs) {
		html += `<li>${song.title} - ${song.artist}</li>`;
	}

	document.querySelector("#song-output").innerHTML = html;
	console.log(html)
});