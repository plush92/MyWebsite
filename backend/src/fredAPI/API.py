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
def get_gdp_data():
    url = "https://api.stlouisfed.org/fred/series/observations"
    params = {
        'series_id': 'GDP',  # Real GDP
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

print(get_gdp_data())