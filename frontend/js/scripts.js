/*!
* Start Bootstrap - Bare v5.0.9 (https://startbootstrap.com/template/bare)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-bare/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

const paste_uri = "";
const upload_uri = ""

var past_element = document.getElementById("past-fastq-div");
var upload_element = document.getElementById("upload-fastq-div");

function onChange(val) {
	if (val == 0) {
		upload_element.style.display = "none";
		past_element.style.display = "block";
	}
	else {
		past_element.style.display = "none";
		upload_element.style.display = "block";
	}
	return;
}

function backHome() {
	window.location.replace("./index.html");
	return;
}

function showMore() {
	//removes the link
	document.getElementById('link').parentElement.removeChild('link');
	//shows the #more
	document.getElementById('more').style.display = "block";
}

var loginForm = document.getElementById("evalForm");

loginForm.addEventListener("submit", (e) => {
	e.preventDefault();

	var email = document.getElementById("email");
	var model = document.getElementById("species");

	var status = true;
	if (document.getElementById('paste-option').checked) {
		console.log("paste");
		var data = document.getElementById('paste-data');
		console.log(`${data.value}`);
		status = checkFasta(file.value);

		if (status) {
			var body = {
				"email" : email.value,
				"model" : model.value,
				"data" : data.value
			};

			fetch(paste_uri, {
				method: "post",
				body: JSON.stringify(body)
			})
			.then(results => results.json())
			.catch((error) => ("Something went wrong!", error));
		} else {

		}

	} else if (document.getElementById('upload-option').checked) {
		console.log("upload");
		var inputFile = document.getElementById("formFile");
		for (const file of inputFile.files) {
			console.log(`${file.value}`);
			status = checkFasta(file.value);
		}

		if (status) {
			const formData = new FormData();
			formData.append("email", email.value);
			formData.append("model", model.value);
			formData.append("data", inputFile.files[0]);
			fetch(upload_uri, {
				method: "post",
				body: formData,
			}).catch((error) => ("Something went wrong!", error));
		} else {

		}
	}

	email.value = "";
	species.selectedIndex = 0;
	window.location.replace("./thankyou.html");
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
	const regex = new RegExp("ab+c");
	data.on('line', function (text) {
		if (text.startWith(">example")) {
			countHead++;
		} else if (countSeq < countHead) {
			if (text.trim().length != 400) {
				return false;
			}
			countSeq++;
		} else {
			return false;
		}
	});

	if (countHead != 4 && countSeq != 4) {
		return false;
	}

	return true;
}


function send() {
	const formData = new FormData();
}