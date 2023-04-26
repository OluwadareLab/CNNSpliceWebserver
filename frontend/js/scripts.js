const paste_uri = "";
const upload_uri = ""

function onChange(val) {
	if (val == 0) {
		document.getElementById("upload-fastq-div").style.display = "none";
		document.getElementById("past-fastq-div").style.display = "block";
	}
	else {
		document.getElementById("past-fastq-div").style.display = "none";
		document.getElementById("upload-fastq-div").style.display = "block";
	}
	return;
}

function showMore() {
	document.getElementById('link').parentElement.removeChild('link');
	document.getElementById('more').style.display = "block";
}

function checkFasta(sequenceText) {
	var countHead = 0;
	var countSeq = 0;
	var regex = "^[ATGCatcg]{400}$";
	var lines = sequenceText.trim().split('\n');
	for (var i = 0; i < lines.length; i++) {
		var line = lines[i];
		if (line.startsWith(">")) {
			countHead++;
		} else if (countSeq < countHead) {
			if (!line.trim().match(regex)) {
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

async function readContent(file) {
	var reader = new FileReader();
	reader.readAsText(file);
	await new Promise(resolve => reader.onload = () => {
		reader.result;
		resolve();
	});
	return reader.result;
}

/*
const reader = new FileReader();
function handleEvent(event) {
	if (event.type === "load") {
		document.querySelector("p.preview").value = reader.result;
	}
}

function addListeners(reader) {
	reader.addEventListener("loadstart", handleEvent);
	reader.addEventListener("load", handleEvent);
	reader.addEventListener("loadend", handleEvent);
	reader.addEventListener("progress", handleEvent);
	reader.addEventListener("error", handleEvent);
	reader.addEventListener("abort", handleEvent);
}

function handleSelected(e) {
	const selectedFile = document.querySelector('input[type="file"]').files[0];
	if (selectedFile) {
		addListeners(reader);
		reader.readAsText(selectedFile);
	}
}

document.querySelector('input[type="file"]').addEventListener("change", handleSelected);
*/

document.getElementById("evalForm").addEventListener("submit", async (event) => {
	event.preventDefault();

	var email = document.getElementById("email").value;
	var model = document.getElementById("species").value;
	console.log('submit');

	var status = false;
	if (document.getElementById('paste-option').checked) {
		var sequenceText = document.getElementById('paste-data').value;
		status = checkFasta(sequenceText);

		if (status) {
			document.getElementById("alart-box").style.display = "none";

			var body = {
				"email": email,
				"model": model,
				"data": sequenceText
			};

			body = JSON.stringify(body);
			console.log(`${body}`);

			await fetch(paste_uri, {
				method: "post",
				body: body
			}).then(results => {
				results.json();
				document.getElementById("email").value = "";
				document.getElementById("species").selectedIndex = 0;
				window.location.replace("./success.html");
			}).catch((error) => {
				console.log("Something went wrong!", error);
				document.getElementById("email").value = "";
				document.getElementById("species").selectedIndex = 0;
				window.location.replace("./error.html");
			});
		} else {
			document.getElementById("alart-box").style.display = "block";
		}

	} else if (document.getElementById('upload-option').checked) {

		console.log('upload');

		var file = document.getElementById('file').files[0];
		console.log(file);

		// var sequenceText = document.querySelector("p.preview").value;

		var sequenceText = await readContent(file);
		console.log(`${sequenceText}`);
		status = checkFasta(sequenceText);

		if (status) {
			document.getElementById("alart-box").style.display = "none";

			var formData = new FormData();
			formData.append("email", email);
			formData.append("model", model);
			formData.append("data", file);

			console.log(`${JSON.stringify(formData)}`);

			await fetch(upload_uri, {
				method: "post",
				body: formData,
			}).then(results => {
				results.json();
				document.getElementById("email").value = "";
				document.getElementById("species").selectedIndex = 0;
				window.location.replace("./success.html");
			}).catch((error) => {
				console.log("Something went wrong!", error);
				document.getElementById("email").value = "";
				document.getElementById("species").selectedIndex = 0;
				window.location.replace("./error.html");
			});
		} else {
			document.getElementById("alart-box").style.display = "block";
		}
	}
});