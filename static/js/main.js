
// click event
pdfBox.addEventListener("click", function(event) {
  inputFile.click();
});

// input event
inputFile.addEventListener("input", function(event) {
  event.preventDefault();
  let fileFromInput = inputFile.files[0]
  let f = inputFile.files.length
  let t = fileFromInput.type

  if(f == 1 && t == 'application/pdf'){
    fileName.innerHTML = fileFromInput.name;
    checkMark.style.visibility = "visible";
   }
  else {
    alert("Please upload a pdf")
  }
});

// drag over
pdfBox.addEventListener("dragover", function(event) {
  event.preventDefault();
});

// drop event
pdfBox.addEventListener("drop", function(event) {
  event.preventDefault();
  let fileFromDrop = event.dataTransfer.files[0];
  let s = fileFromDrop.size
  let n = fileFromDrop.name

  if(s > 0 && n.includes(".pdf") == true){
    fileName.innerHTML = fileFromDrop.name;
    checkMark.style.visibility = "visible";
    pdfBox.value = fileFromDrop;
   }
  else {
    alert("Please upload a pdf")
  }
});

// checkbox change
checkbox.addEventListener("change", function(event) {
  event.preventDefault();
  if (this.checked) {
    checkbox.value = 1
  }
  else {
    checkbox.value = 0
  }
})

// submit
async function submitChecks() {
  submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    if (fileName.innerHTML.length < 1) {
      alert("Please upload a pdf")
    }
    else if (numberTag.value.length < 10) {
      alert("Double check your number. It should be 10 or 11 characters long")
    }
    else if (pdfBox.value.size > 0) {
      addMetaDrop();
    }
    else {
      addMetaFilePicker();
    }
  })
}

submitChecks();


// add meta data to file from file picker input
async function addMetaFilePicker() {

  const fileFromInput = inputFile.files[0]
  const f = inputFile.files.length
  const t = fileFromInput.type

  if(f == 1 && t == 'application/pdf'){
    // Load PDFDocument
    const fileURL = URL.createObjectURL(fileFromInput)
    const existingPdfBytes = await fetch(fileURL).then(res => res.arrayBuffer())
    const pdfDoc = await PDFDocument.load(existingPdfBytes)

    // Add number and dropdown as metadata
    pdfDoc.setKeywords(["number:"+numberTag.value+";dropdown:"+dropdownTag.value])

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save()
    const base64String = await pdfDoc.saveAsBase64()

    // Trigger the browser to download the PDF document
    const docName = fileFromInput.name.slice(0,-4) + "_tagged_" + date + ".pdf";
    download(pdfBytes, docName, "application/pdf");

    // Post data
    updateObj(base64String);
    updateName(docName);
    checkNulls();
    postData();
    successMessage.style.visibility="visible";
    setTimeout(function(){
      window.location.reload(1);
    }, 5000);
    
    }
  else {
    alert("Please upload a pdf")
  }
}

// add meta data to file from drop event
async function addMetaDrop() {

  const fileFromDrop = pdfBox.value
  const s = fileFromDrop.size
  const n = fileFromDrop.name

  if(s > 0 && n.includes(".pdf") == true){

    // Load PDFDocument
    const fileURL = URL.createObjectURL(fileFromDrop)
    const existingPdfBytes = await fetch(fileURL).then(res => res.arrayBuffer())
    const pdfDoc = await PDFDocument.load(existingPdfBytes)

    // Add number and dropdown as metadata
    pdfDoc.setKeywords(["number:"+numberTag.value+";dropdown:"+dropdownTag.value])

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save()
    const base64String = await pdfDoc.saveAsBase64()

    // Trigger the browser to download the PDF document
    const docName = n.slice(0,-4) + "_tagged_" + date + ".pdf"
    download(pdfBytes, docName, "application/pdf");

    // Post data
    updateObj(base64String);
    updateName(docName);
    checkNulls();
    postData();
    successMessage.style.visibility="visible";
    setTimeout(function(){
      window.location.reload(1);
    }, 5000);

   }
  else {
    alert("Please upload a pdf")
  }

}