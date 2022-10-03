import mysql.connector
import pandas as pd
import flask
from flask import request, jsonify, render_template
from flask_cors import CORS
from datetime import datetime
import os
from dotenv import load_dotenv


load_dotenv()

# creds from .env
prod_host = os.environ.get('prod_host')
prod_port = os.environ.get('prod_port')
prod_database = os.environ.get('prod_database')
prod_table = os.environ.get('prod_table')
prod_username = os.environ.get('prod_username')
prod_password = os.environ.get('prod_password')

app = flask.Flask(__name__)
app.config["DEBUG"] = True
CORS(app,send_wildcard=True)


# website
@app.route('/', methods=['GET', 'POST'])
def index():
    # optional to add authentication here
    return render_template(
      'index.html',
    )

try:
    # db
    db = mysql.connector.connect(
        host = prod_host,
        user = prod_username,
        password = prod_password,
        database = prod_database
        )

    cursor = db.cursor()

    # creates a python dictionary from sql result
    def dict_factory():
        desc = cursor.description
        records = cursor.fetchall()
        column_names = [str(col[0]) for col in desc]
        data = [dict(zip(column_names, row))  
            for row in records]
        return data

    # get route
    @app.route('/api/v1/pdf_tagger', methods=['GET'])
    def pdf_tagger_all():
        query = '''SELECT number, output_folder, dropdown, checkbox, 
        date_created, retries_remaining, upload_result, upload_timestamp, CONVERT(pdf_blob, CHAR) as pdf_blob, file_name FROM pdf_prop'''
        cursor.execute(query)
        result = dict_factory()
        res = jsonify(result)
        
        return res

    # return page if error
    @app.errorhandler(404)
    def page_not_found(e):
        return '<h1>404</h1><p>The resource could not be found.</p>', 404

    # post route
    @app.route('/api/v1/pdf_tagger', methods=['POST'])
    # @cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
    def pdf_tagger_post():

        now = datetime.now()
        formatted_date = now.strftime('%Y-%m-%d %H:%M:%S')

        req = request.get_json()
        
        number = None
        output_folder = None
        dropdown = None
        checkbox = None
        pdf_blob = None
        date_created = formatted_date
        retries_remaining = 25 # if sending from mysql database to another app
        file_name = None

        if req:
            if 'number' in req:
                number = req['number']
            if 'output_folder' in req:
                output_folder = req['output_folder']
            if 'dropdown' in req:
                dropdown = req['dropdown']
            if 'checkbox' in req:
                checkbox = req['checkbox']
            if 'pdf_blob' in req:
                pdf_blob = req['pdf_blob']
            if 'file_name' in req:
                file_name = req['file_name']
                    
    
        insert_stmt = (
        'INSERT INTO pdf_prop (number, output_folder, dropdown, checkbox, date_created, retries_remaining, pdf_blob, file_name)'
        'VALUES (%s, %s, %s, %s, %s, %s, %s, %s)'
        )

        data = (number, output_folder, dropdown, checkbox, date_created, retries_remaining, pdf_blob, file_name)
        cursor.execute(insert_stmt, data)
        db.commit()
        
        return req

except:
    # post data to pandas dataframe
    @app.route('/api/v1/pdf_tagger', methods=['POST'])
    # @cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
    def pdf_tagger_post():

        now = datetime.now()
        formatted_date = now.strftime('%Y-%m-%d %H:%M:%S')

        req = request.get_json()

        df = pd.DataFrame(req,index=[0])
        df['date_created'] = formatted_date
        # option to save df to csv
        # file_path = <YOUR FILE PATH>
        # df.to_csv(file_path, index=False, encoding='utf-8-sig')
        print(df.head())

        return req

if __name__ == "__main__":
    app.run()