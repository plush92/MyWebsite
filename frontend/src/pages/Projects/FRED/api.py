import requests
import json
import time
from datetime import datetime
import os

# Get FRED API key from environment
FRED_API_KEY = os.getenv('FRED_API')
FRED_BASE_URL = "https://api.stlouisfed.org/fred"

def fetch_category(category_id):
    """Fetch a specific category by ID"""
    url = f"{FRED_BASE_URL}/category"
    params = {
        "category_id": category_id,
        "api_key": FRED_API_KEY,
        "file_type": "json"
    }
    
    try:
        response = requests.get(url, params=params)
        if response.status_code == 200:
            data = response.json()
            categories = data.get("categories", [])
            if categories:
                return categories[0]  # Should be one category
        elif response.status_code == 400:
            # Category doesn't exist - this is expected for many IDs
            return None
        else:
            print(f"Unexpected status {response.status_code} for category {category_id}")
            return None
    except Exception as e:
        print(f"Error fetching category {category_id}: {e}")
        return None

def fetch_all_categories():
    """Iterate through category IDs and collect all valid categories"""
    print("🔍 Fetching all FRED categories...")
    
    all_categories = []
    max_category_id = 1000  # Start with reasonable upper limit
    consecutive_failures = 0
    max_consecutive_failures = 50  # Stop after 50 consecutive failures
    
    for category_id in range(1, max_category_id + 1):
        print(f"Checking category {category_id}...", end=" ")
        
        category = fetch_category(category_id)
        
        if category:
            all_categories.append(category)
            consecutive_failures = 0
            print(f"✅ Found: {category['name']}")
        else:
            consecutive_failures += 1
            print("❌ Not found")
            
            # If we've had too many consecutive failures, probably reached the end
            if consecutive_failures >= max_consecutive_failures:
                print(f"\n🛑 Stopping after {max_consecutive_failures} consecutive failures")
                break
        
        # Be nice to the API - small delay
        time.sleep(0.1)
    
    return all_categories

def save_categories_to_file(categories, filename="fred_categories.json"):
    """Save categories to a JSON file"""
    with open(filename, 'w') as f:
        json.dump(categories, f, indent=2)
    print(f"💾 Saved {len(categories)} categories to {filename}")

def print_category_summary(categories):
    """Print a summary of found categories"""
    print(f"\n📊 Found {len(categories)} categories:")
    print("-" * 60)
    
    for cat in categories[:20]:  # Show first 20
        print(f"ID: {cat['id']:>3} | {cat['name'][:50]}")
    
    if len(categories) > 20:
        print(f"... and {len(categories) - 20} more categories")

if __name__ == "__main__":
    print("🚀 FRED Category Fetcher")
    print("=" * 40)
    
    # Check if API key is set
    if FRED_API_KEY == "your_actual_fred_api_key_here":
        print("❌ Please set your FRED_API_KEY in the script!")
        print("Get your free API key from: https://fred.stlouisfed.org/docs/api/api_key.html")
        exit(1)
    
    # Fetch all categories
    start_time = datetime.now()
    categories = fetch_all_categories()
    end_time = datetime.now()
    
    # Display results
    print_category_summary(categories)
    
    # Save to file
    save_categories_to_file(categories)
    
    print(f"\n⏱️  Total time: {end_time - start_time}")
    print(f"✅ Complete! Found {len(categories)} total categories")