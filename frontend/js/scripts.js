// const post_url = "http://52.14.14.177:8080/job/submit"
const post_url = "http://127.0.0.1:8000/job/submit";

function onChange(val) {
  if (val == 0) {
    document.getElementById("upload-fastq-div").style.display = "none";
    document.getElementById("past-fastq-div").style.display = "block";
  } else {
    document.getElementById("past-fastq-div").style.display = "none";
    document.getElementById("upload-fastq-div").style.display = "block";
  }
  return;
}

function showMore() {
  document.getElementById("link").parentElement.removeChild("link");
  document.getElementById("more").style.display = "block";
}

function loadExample() {
  var seq =
    ">example 0\nTGAAAATGCGTATTTCGCAACCTATTTGACGCGCAAAATATCTCGTAGCGAAAACTATAGTAATTCTTTAAATGACTACTGTAGCGCTTGTGTCGATTTACGGGCTCGATTTTTAAAATGAATTAAAATAATTTATTAATTTAAATAACGATAGAATATTAAAATTAAGTTTCATTTCAAAAATCGAGTTCCCGTAAATCGACACAAGCCCTACAGTAGTGGTTTAAAGAGTTACTGTAGTTTTCGCTACGAGATATTTTGTCAAATATGTTGCTCAATGTACGCATTCTCAGAATTCTGTGTTACCGTAATATATTTGTGTTTTATTATTTCAAAAAAAAAAAACAAAAATGGCGAAGTGTGAAAATATTATTCGGAAAATTGAATTGTTTTTCTTCCA\n>example 1\nACATGGAAACGAGATATTCTTAACGTTTTCTTCAAGTTCAATTAAAACCAATGCGAACATATTGTCAAAATCTACCTCCTGTTCTTTAACATTGATTAGTACCGCCTGAAAATGCTTGATGATGTTTGTAAAATGAGCTATGGAATTACTTTTTTTGGTTTCAAATAACATTGACTAGATGAGCAGTTTCCTGGGATCACCTTCATATTTTTTGTCACTTCTTCGGGAATTATTGCGCTTCTGCAAATATGGGAGTTTTCGAGAACATGATTCGATTACGAAATTCTTCAAAGTAGGCGTAGGTAATCTTTGAAGATGGAGTAATGTGTCTGGGTGTTTTCAATGTAAAGAGCAAAAAAGTGCCCACATTAATGAATTTCGTAATGCAACTTCTCAAAAA\n>example 2\nGTCCATCACAGTCTGTTAGCCAGTCATTTTTGGGTACCTCATTTGCAAGCAGCTATTTGTAAATCTTATTTCTAGCTCGCGATTTTATTGAAATGTTTCTTGATCTATTTTAAATCTGTTGAGTAGTGTTCTTAAATCTGAATTACACTTTTTTTTGCTCATGTTGTTATCTATGAAAGGTTTTTTGAAATGTCTATATATTTTTCTAGCCTAGAAGAAGGAAGAGGAAATTGAAATTGTTCTGATCTGAGAATCGGGATACGGTAGAGATAACATGTTTGAAACGAAATTGAAACAATCATGGTTGCAAAAATACCTTCAGTCTACACGGCCTCTCTCAATTTCATTTATTTCAAAATTCCTCTTTTTCTCTCACACTCTCTCACGTGAGATTGAAAAT";
  document.getElementById("paste-data").value = seq;
  document.getElementById("model").selectedIndex = 2;
}

function checkFasta(sequenceText) {
  var countHead = 0;
  var countSeq = 0;
  var regex = "^[ATGCatcg]{400}$";
  var lines = sequenceText.trim().split("\n");
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
  await new Promise(
    (resolve) =>
      (reader.onload = () => {
        reader.result;
        resolve();
      })
  );
  return reader.result;
}

async function onSubmit() {
  var status = false;
  var sequenceText;
  if (document.getElementById("paste-option").checked) {
    sequenceText = document.getElementById("paste-data").value;
  } else if (document.getElementById("upload-option").checked) {
    var file = document.getElementById("file").files[0];
    sequenceText = await readContent(file);
  }

  status = checkFasta(sequenceText);
  if (status) {
    document.getElementById("alart-box").style.display = "none";
    document.getElementById("is-valid").value = "true";
  } else {
    document.getElementById("alart-box").style.display = "block";
    document.getElementById("is-valid").value = "faslse";
  }

  return;
}

document
  .getElementById("evalForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    var email = document.getElementById("email").value;
    var model = document.getElementById("model").value;

    var status = false;
    var formData = new FormData();
    formData.append("email", email);
    formData.append("model_name", model);

    if (document.getElementById("paste-option").checked) {
      var sequenceText = document.getElementById("paste-data").value;
      status = checkFasta(sequenceText);
      if (status) {
        document.getElementById("alart-box").style.display = "none";
        formData.append("text_data", sequenceText);
      } else {
        document.getElementById("alart-box").style.display = "block";
      }
    } else if (document.getElementById("upload-option").checked) {
      const start = Date.now();
      var file = document.getElementById("file").files[0];
      var sequenceText = await readContent(file);
      status = checkFasta(sequenceText);
      const end = Date.now();
      console.log(`Execution time: ${end - start} ms`);
      if (status) {
        document.getElementById("alart-box").style.display = "none";
        formData.append("file_data", file);
      } else {
        document.getElementById("alart-box").style.display = "block";
      }
    }

    if (status) {
      document.getElementById("alart-box").style.display = "none";
      await fetch(post_url, {
        // mode: 'no-cors',
        method: "post",
        body: formData,
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          res = JSON.stringify(response);
          ref = response["reference"];
          link = response["link"];
          sessionStorage.setItem("ref", ref);
          sessionStorage.setItem("link", link);
          window.location.replace("./success.html");
        })
        .catch((error) => {
          document.getElementById("email").value = "";
          document.getElementById("model").selectedIndex = 0;
          window.location.replace("./error.html");
        });
    } else {
      document.getElementById("alart-box").style.display = "block";
    }
  });
