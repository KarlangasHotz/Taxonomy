from flask import Flask, jsonify, render_template, request
import requests


app = Flask(__name__)

app.static_folder = 'static'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_lineage')
def get_lineage():
    animal_name = request.args.get('animalName')
    encoded_animal_name = animal_name.replace(" ", "%20")
    
    apiCall = f"https://www.ebi.ac.uk/ena/taxonomy/rest/any-name/{encoded_animal_name}"
    response = requests.get(apiCall)
    data = response.json()
    lineage = data[0]["lineage"]

    return jsonify({'lineage': lineage})


if __name__ == '__main__':
    app.run()
    


