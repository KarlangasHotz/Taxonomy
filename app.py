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
    
    if not animal_name:
        return jsonify({"error": "No animal name provided."}), 400
    
    encoded_animal_name = animal_name.replace(" ", "%20")

    apiCall = f"https://www.ebi.ac.uk/ena/taxonomy/rest/any-name/{encoded_animal_name}"

    response = requests.get(apiCall)

    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch data from the API."}), response.status_code


    data = response.json()

    if not data or 'lineage' not in data[0]:
        return jsonify({"error": "No lineage data found for the specified animal."}), 404
      
   
    lineage = data[0]["lineage"]

    return jsonify(lineage)


if __name__ == '__main__':
    app.run(debug=True)
    


