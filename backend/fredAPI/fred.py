from flask import Flask, jsonify
import requests
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)

FRED_API = os.getenv("FRED_API")

# Function to get GDP data from FRED
def get_gdp_data():
    url = "https://api.stlouisfed.org/fred/series/observations"
    params = {
        'series_id': 'GDPC1',  # Real GDP
        'file_type': 'json',
        'limit': 5,
        'sort_order': 'desc',
        'api_key': FRED_API
    }
    response = requests.get(url, params=params)
    print(response)  # Debugging print statement
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": "Unable to fetch data"}

# Create a route to serve GDP data
@app.route("/econ", methods=["GET"])
def get_econ_data():
    data = get_gdp_data()
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)

#run node mywebsite/src/components/EconDashboard/fredAPI/fred.py
