from flask import Flask, jsonify
from flask_cors import CORS
import requests
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Allow CORS from specific origin (React dev server)
CORS(app)
# CORS(app, origins=["http://localhost:5173"])

# Fetch FRED API key
FRED_API = os.getenv("FRED_API")
print(f"FRED API Key Loaded: {'Yes' if FRED_API else 'No'}")

# Function to get GDP data from FRED
def get_gdp_data(series_id, limit):
    url = "https://api.stlouisfed.org/fred/series/observations"
    params = {
        'series_id': series_id,
        'file_type': 'json',
        'limit': limit,
        'sort_order': 'desc',
        'api_key': FRED_API
    }
    try:
        response = requests.get(url, params=params)
        if response.status_code == 200:
            return response.json()
        else:
            return {"error": f"Failed to fetch data: {response.status_code}"}
    except Exception as e:
        return {"error": f"Exception occurred: {str(e)}"}

# Wrappers for specific GDP metrics
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

# Debugging: List all routes
for rule in app.url_map.iter_rules():
    print(f"Endpoint: {rule.endpoint}, URL: {rule}")

# Run Flask app
if __name__ == "__main__":
    app.run(debug=True)
