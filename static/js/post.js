function postData() {

    const fetchData = {
        number : numberTag.value,
        output_folder : fileFolderTag.value,
        dropdown : dropdownTag.value,
        checkbox : checkbox.value,
        pdf_blob : pdfBlob,
        file_name : newFileName
    };

    $.ajax({
        url: 'http://localhost:5000/api/v1/pdf_tagger',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(fetchData),
        dataType: 'json'
    });

    console.dir(fetchData)
}






