from flask import Flask, jsonify
from flask_cors import CORS
import requests
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)

CORS(app, origins=["http://localhost:5173"])

FRED_API = os.getenv("FRED_API")
print(f'API Key: {FRED_API}')

# Function to get GDP data from FRED
def get_gdp_data(series_id, limit):
    url = "https://api.stlouisfed.org/fred/series/observations"
    params = {
        'series_id': series_id,  # Real GDP
        'file_type': 'json',
        'limit': limit,
        'sort_order': 'desc',
        'api_key': FRED_API
    }
    response = requests.get(url, params=params) 
    print(response)  # Debugging print statement
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": "Unable to fetch data"}
    
def get_gdp():
    return get_gdp_data('GDP', 5)

def get_real_gdp():
    return get_gdp_data('GDPC1', 5)

def get_nominal_gdp():
    return get_gdp_data('NGDPSAXDCUSQ', 5)



# Create a route to serve GDP data
@app.route("/econ/gdp", methods=["GET"])
def get_econ_data():
    gdp_data = get_gdp()
    real_gdp_data = get_real_gdp()
    nominal_gdp_data = get_nominal_gdp()
    combined_data = {
        "gdp": gdp_data,
        "real_gdp": real_gdp_data,
        "nominal_gdp": nominal_gdp_data
    }
    return jsonify(combined_data)

for rule in app.url_map.iter_rules():
    print(f"Endpoint: {rule.endpoint}, URL: {rule}")

if __name__ == "__main__":
    app.run(debug=True)

