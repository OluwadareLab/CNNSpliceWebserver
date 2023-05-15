window.onload = function () {
	let ref = sessionStorage.getItem("ref");
	let link = sessionStorage.getItem("link");
	document.getElementById('success-link').href = `${decodeURIComponent(link)}`;
	document.getElementById('success-link').innerHTML = `${decodeURIComponent(link)}`;
	document.getElementById('ref-id').innerHTML = "Reference: " + `${decodeURIComponent(ref)}`;
}

function backHome() {
	window.location.replace("./index.html");
	return;
}