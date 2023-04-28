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

function loadExample() {
	document.getElementById('paste-data').value = ">example\nTTTTTTCGCATTGCTACGTCTGTCACCTTTCCCCACCAAGTTTGCAGTAAATGACGTGGAGCTTAGAATACCAAACCATATACATTGGGATGGGGACAATATTCGCAAAACGCAATCCGCTACATTAACACACTCCCAATCAGCAATCTAGCGATCCGTCTGGCGTGGAAAAAGAAAGATTTATAGTTACTGGGAGCCACCCCAATATTGCATGACTTCTCGCGTGTGTCGCAGACGTAATGACGACGACTCGGTCCGGCACGTTCCTTACGGTTGGCTAAATCTCGCCCAACCGTCTGAAGGTACGTGAGTCACCGCACACAAAGTAAGGGGCGACGGAGCCAACAGTGGTTCATATTTATTTGATCCAACAAACCCAACAAGACTCGCCCGGGTGTAT";
	document.getElementById("model").selectedIndex = 1;
}

document.getElementById("evalForm").addEventListener("submit", async (event) => {
	event.preventDefault();

	var email = document.getElementById("email").value;
	var model = document.getElementById("model").value;

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

			await fetch(paste_uri, {
				method: "post",
				body: body
			}).then(results => {
				results.json();
				document.getElementById("email").value = "";
				document.getElementById("model").selectedIndex = 0;
				window.location.replace('./success.html?link=' + encodeURIComponent('https://github.com/OluwadareLab/CNNSplice'));
			}).catch((error) => {
				document.getElementById("email").value = "";
				document.getElementById("model").selectedIndex = 0;
				window.location.replace("./error.html");
			});
		} else {
			document.getElementById("alart-box").style.display = "block";
		}

	} else if (document.getElementById('upload-option').checked) {

		const start = Date.now();

		var file = document.getElementById('file').files[0];
		var sequenceText = await readContent(file);
		status = checkFasta(sequenceText);

		const end = Date.now();
		console.log(`Execution time: ${end - start} ms`);

		if (status) {
			document.getElementById("alart-box").style.display = "none";

			var formData = new FormData();
			formData.append("email", email);
			formData.append("model", model);
			formData.append("data", file);

			await fetch(upload_uri, {
				method: "post",
				body: formData,
			}).then(results => {
				results.json();
				document.getElementById("email").value = "";
				document.getElementById("model").selectedIndex = 0;
				window.location.replace('./success.html?link=' + encodeURIComponent('https://github.com/OluwadareLab/CNNSplice'));
			}).catch((error) => {
				document.getElementById("email").value = "";
				document.getElementById("model").selectedIndex = 0;
				window.location.replace("./error.html");
			});
		} else {
			document.getElementById("alart-box").style.display = "block";
		}
	}
});