/*!
* Start Bootstrap - Bare v5.0.9 (https://startbootstrap.com/template/bare)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-bare/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

var past_element = document.getElementById("past-fastq-div");
var upload_element = document.getElementById("upload-fastq-div");

function onChange(val) {
	if(val==0) {
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

function showMore(){
    //removes the link
    document.getElementById('link').parentElement.removeChild('link');
    //shows the #more
    document.getElementById('more').style.display = "block";
}

let loginForm = document.getElementById("evalForm");

loginForm.addEventListener("submit", (e) => {
	e.preventDefault();
		
	if(document.getElementById('paste-option').checked) {
		console.log("paste");
		let data = document.getElementById('paste-data');
		console.log(`${data.value}`);
	}else if(document.getElementById('upload-option').checked) {
		console.log("upload");
		let file = document.getElementById("formFile").value;
		console.log(`${file.value}`);
	}

	let email = document.getElementById("email");
	let species = document.getElementById("species");
			
	email.value = "";
	species.selectedIndex = 0;
	
	//console.log(`This form has a username of ${species.value} and password of ${email.value}`);
			
	
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
