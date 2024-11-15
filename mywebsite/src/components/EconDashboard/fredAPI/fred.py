# app.py
from flask import Flask, jsonify
import requests
from dotenv import load_dotenv
import os
app = Flask(__name__)

FRED_API = os.getenv("FRED_API")
https://api.stlouisfed.org/fred/series/observations?series_id=GDPC1&file_type=json&limit=5&sort_order=desc
# Function to get GDP data from FRED
def get_gdp_data():
    url = "https://api.stlouisfed.org/fred/series/observations?"
    params = {
        'series_id': 'GDP', 
        'api_key': FRED_API

    }
    response = requests.get(url, params=params)
    console.log(response)
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": "Unable to fetch data"}

# Create a route to serve GDP data
@app.route("/gdp", methods=["GET"])
def get_gdp():
    data = get_gdp_data()
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)

