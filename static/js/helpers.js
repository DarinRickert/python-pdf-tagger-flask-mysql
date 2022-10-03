
// pdf drop box
const pdfBox = document.getElementById("pdfBox");
pdfBox.value = 0
// file from manual input
const inputFile = document.getElementById("inputFile");
// name of file from input or drop
const fileName = document.getElementById("fileName");
// checkmark
const checkMark = document.getElementById("checkMark");
// submit button
const submitButton = document.getElementById("submitButton");
// loan number input
const numberTag = document.getElementById("numberTag");
// eFolder input
const dropdownTag = document.getElementById("dropdownTag");
// Output folder input
const fileFolderTag = document.getElementById("fileFolderTag");
// Checkbox Encompass
const checkbox = document.getElementById("checkbox");
checkbox.value = 0
// Success message
const successMessage = document.getElementById("successMessage");
// update file name
let newFileName = undefined;
async function updateName(doc) {
  newFileName = doc;
}
// update blob
let pdfBlob = undefined;
async function updateObj(obj) {
  // pdfBlob = JSON.stringify(obj);
  pdfBlob = obj
}
// check nulls
async function checkNulls() {
  if (fileFolderTag.value.length > 0) {fileFolderTag.value}
  else {fileFolderTag.value = "downloads"}
}
// current date
const getDate = () => {
    const today = new Date();
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const day = today.getDate()
    const hour = today.getHours()
    const min = today.getMinutes()
    const sec = today.getSeconds()
    return {year,month,day,hour,min,sec}
  };
const {year, month, day, hour, min, sec} = getDate();
const date = `${year}${month}${day}`
const dateTime = `${year}${month}${day}${hour}${min}${sec}`
// pdf library
const { degrees, PDFDocument, rgb, StandardFonts } = PDFLib
