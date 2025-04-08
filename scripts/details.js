addEventListener("DOMContentLoaded", async() => {
	// Get the params, then song
	const urlparam = new URLSearchParams(window.location.search);
	const songID = urlparam.get('id');
	console.log(songID);

	const response = await fetch("http://localhost:3000/api/songs/" + songID);
	const song = await response.json();
	console.log(song);

	// Populate HTML with song details
	let heading = "";
	heading += `${song.title}'s Details:`
	document.querySelector("h1").innerHTML = heading;

	let html = ""
	html += `
		<h2> Artist - ${song.artist} </h2>
		<h3> Popularity - ${song.popularity} </h3>
		<p> Released - ${song.releaseDate} </p>
		<p> Genre - ${song.genre} </p>
	`

	document.querySelector("div").innerHTML = html;	
});