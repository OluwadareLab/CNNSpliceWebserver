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
  } else {
    document.getElementById("alart-box").style.display = "block";
  }
}
