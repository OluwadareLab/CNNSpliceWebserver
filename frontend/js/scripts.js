/*!
* Start Bootstrap - Bare v5.0.9 (https://startbootstrap.com/template/bare)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-bare/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

const paste_uri = "";
const upload_uri = ""

var pastElement = document.getElementById("past-fastq-div");
var uploadElement = document.getElementById("upload-fastq-div");
var loginForm = document.getElementById("evalForm");
var alartBox = document.getElementById("alart-box");

function onChange(val) {
	if (val == 0) {
		uploadElement.style.display = "none";
		pastElement.style.display = "block";
	}
	else {
		pastElement.style.display = "none";
		uploadElement.style.display = "block";
	}
	return;
}

function backHome() {
	window.location.replace("./index.html");
	return;
}

function showMore() {
	document.getElementById('link').parentElement.removeChild('link');
	document.getElementById('more').style.display = "block";
}

async function readContent(file) {
	let reader = new FileReader()
	reader.readAsText(file)
	await new Promise(resolve => reader.onload = () => resolve())
	return reader.result
}

loginForm.addEventListener("submit", async (event) => {
	event.preventDefault();

	var email = document.getElementById("email");
	var model = document.getElementById("species");
	var data = "";

	var status = false;
	if (document.getElementById('paste-option').checked) {
		data = document.getElementById('paste-data').value;
		status = checkFasta(data);

		if (status) {
			var body = {
				"email": email.value,
				"model": model.value,
				"data": data.value
			};

			body = JSON.stringify(body);
			console.log(`${body}`);

			await fetch(paste_uri, {
				method: "post",
				body: body
			}).then(results => {
				results.json();
				window.location.replace("./thankyou.html");
			}).catch((error) => ("Something went wrong!", error));

		} else {
			document.getElementById("alart-box").style.display = "block";
		}

	} else if (document.getElementById('upload-option').checked) {
		var inputFiles = document.getElementById('file');
		data = await readContent(inputFiles.files[0]);
		status = checkFasta(data);

		if (status) {
			const formData = new FormData();
			formData.append("email", email.value);
			formData.append("model", model.value);
			formData.append("data", inputFiles.files[0]);

			console.log(`${JSON.stringify(formData)}`);
			
			await fetch(upload_uri, {
				method: "post",
				body: formData,
			}).then(results => {
				results.json();
				window.location.replace("./thankyou.html");
			}).catch((error) => ("Something went wrong!", error));

		} else {
			document.getElementById("alart-box").style.display = "block";
		}

	}

	email.value = "";
	species.selectedIndex = 0;

	return;
});

function sendRequest() {
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "https://jsonplaceholder.typicode.com/users");
	xhr.send();
	xhr.responseType = "json";
	xhr.onload = () => {
		if (xhr.readyState == 4 && xhr.status == 200) {
			const data = xhr.response;
			console.log(data);
		} else {
			console.log(`Error: ${xhr.status}`);
		}
	};
}

function checkFasta(data) {
	var countHead = 0;
	var countSeq = 0;
	var regex = "^[ATGCatcg]+$";
	var lines = data.trim().split('\n');
	for (var i = 0; i < lines.length; i++) {
		var line = lines[i];
		if (line.startsWith(">")) {
			countHead++;
		} else if (countSeq < countHead) {
			if (line.trim().length != 400) {
				return false;
			}
			if(!regex.match(line)) {
				return false;
			}
			countSeq++;
		} else {
			return false;
		}
	}

	if (countHead < 1 && countSeq < 1 && countHead != countSeq) {
		return false;
	}

	return true;
}