# pdf-tagger
## Flask API

### Description

This application will take a pdf and tag it with meta data in the "keywords" section. After submitting the form, the tagged pdf will be available in the downloads folder. All the data from the form (including the tagged pdf) is sent to a MySQL database. Alternatively, the form data is stored in a pandas dataframe and can be stored in a csv.

Process flow:
1) Ingest pdf
2) Tag pdf with info from form
3) Send form data and tagged pdf to database

This application will work as is, but can be easily modified to add more features to suit the needs of the user.

### Application Use

The main value of this application is to store meta data in a pdf so that it can be later parsed and used elsewhere. 

E.g. you have pdfs of customer information that you want tied to their internal customer identification number. With this application you can tag the customer pdfs with their internal GUID, save the tagged pdfs in a database, and access them by another internal application.

### Pre-requisites:

1) Install python 3

https://www.python.org/downloads/


2) Install packages

* flask
* flask_cors
* mysql.connector
* python-dotenv
* pandas

Steps
* Open a terminal
* Run `pip install -r requirements.txt` in terminal

### Execute app.py file

Execute `app.py` using the python 3 version installed


