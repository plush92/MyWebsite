# activate virtual env:
# cd /Users/brendanduffy/Documents/MyWebsite
# source venv/bin/activate
# uvicorn frontend.src.pages.Projects.War.api:app --reload
# to deactivate virtual environment: deactivate

import requests
import json
import time
from datetime import datetime

# FRED API configuration
FRED_API_KEY = "cdbd4a97125872d227112aa4a6f2a7ef"
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
    max_category_id = 2000  # Start with reasonable upper limit
    consecutive_failures = 0
    max_consecutive_failures = 100  # Stop after 100 consecutive failures
    
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
        time.sleep(0.05)  # 50ms delay
    
    return all_categories

def save_categories_to_file(categories, filename="fred_categories.json"):
    """Save categories to a JSON file"""
    with open(filename, 'w') as f:
        json.dump(categories, f, indent=2)
    print(f"💾 Saved {len(categories)} categories to {filename}")

def save_categories_as_js(categories, filename="fred_categories.js"):
    """Save categories as a JavaScript/TypeScript file for frontend use"""
    js_content = f"""// FRED Categories - Generated on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
export const FRED_CATEGORIES = {json.dumps(categories, indent=2)};

export const CATEGORY_MAP = {{
{','.join([f'  {cat["id"]}: "{cat["name"]}"' for cat in categories])}
}};

export default FRED_CATEGORIES;
"""
    
    with open(filename, 'w') as f:
        f.write(js_content)
    print(f"💾 Saved {len(categories)} categories to {filename} (JavaScript format)")

def print_category_summary(categories):
    """Print a summary of found categories"""
    print(f"\n📊 Found {len(categories)} categories:")
    print("-" * 80)
    
    for cat in categories[:25]:  # Show first 25
        print(f"ID: {cat['id']:>4} | {cat['name'][:60]}")
    
    if len(categories) > 25:
        print(f"... and {len(categories) - 25} more categories")
    
    # Show some interesting stats
    parent_categories = [cat for cat in categories if cat.get('parent_id') == 0]
    print(f"\n📈 Stats:")
    print(f"   Total categories: {len(categories)}")
    print(f"   Root categories: {len(parent_categories)}")

if __name__ == "__main__":
    print("🚀 FRED Category Fetcher")
    print("=" * 50)
    
    # Fetch all categories
    start_time = datetime.now()
    categories = fetch_all_categories()
    end_time = datetime.now()
    
    # Display results
    print_category_summary(categories)
    
    # Save to both JSON and JS formats
    save_categories_to_file(categories)
    save_categories_as_js(categories)
    
    print(f"\n⏱️  Total time: {end_time - start_time}")
    print(f"✅ Complete! Found {len(categories)} total categories")
    print(f"\n📁 Files created:")
    print(f"   - fred_categories.json (for backend/analysis)")
    print(f"   - fred_categories.js (for frontend import)")
