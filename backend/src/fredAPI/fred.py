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
    max_category_id = 250  # Set to 250 since you know they end at 224
    
    for category_id in range(1, max_category_id + 1):
        print(f"Checking category {category_id}...", end=" ")
        
        category = fetch_category(category_id)
        
        if category:
            all_categories.append(category)
            print(f"✅ Found: {category['name']}")
        else:
            print("❌ Not found")
        
        # Save progress every 50 categories in case of interruption
        if len(all_categories) > 0 and len(all_categories) % 50 == 0:
            print(f"\n💾 Saving progress... ({len(all_categories)} categories so far)")
            save_categories_to_file(all_categories, f"fred_categories_partial_{len(all_categories)}.json")
        
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

def save_categories_as_dict(categories, filename="fred_categories_dict.py"):
    """Save categories as a Python dictionary file"""
    
    # Create simple ID -> Name mapping dictionary
    simple_dict = {cat['id']: cat['name'] for cat in categories}
    
    # Create comprehensive dictionary with all category data
    comprehensive_dict = {cat['id']: cat for cat in categories}
    
    # Create parent-child relationship dictionary
    parent_child_dict = {}
    for cat in categories:
        parent_id = cat.get('parent_id', 0)
        if parent_id not in parent_child_dict:
            parent_child_dict[parent_id] = []
        parent_child_dict[parent_id].append(cat)
    
    dict_content = f'''"""
FRED Categories Dictionary
Generated on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
Total categories: {len(categories)}
"""

# Simple ID -> Name mapping
FRED_CATEGORIES_SIMPLE = {json.dumps(simple_dict, indent=2)}

# Comprehensive category data (ID -> full category object)
FRED_CATEGORIES_FULL = {json.dumps(comprehensive_dict, indent=2)}

# Parent-child relationships (Parent ID -> list of child categories)
FRED_PARENT_CHILD = {json.dumps(parent_child_dict, indent=2, default=str)}

# Root categories (parent_id = 0)
ROOT_CATEGORIES = {json.dumps([cat for cat in categories if cat.get('parent_id') == 0], indent=2)}

# Helper functions
def get_category_name(category_id):
    """Get category name by ID"""
    return FRED_CATEGORIES_SIMPLE.get(category_id, "Unknown Category")

def get_category_details(category_id):
    """Get full category details by ID"""
    return FRED_CATEGORIES_FULL.get(category_id, None)

def get_child_categories(parent_id):
    """Get child categories for a given parent ID"""
    return FRED_PARENT_CHILD.get(parent_id, [])

def get_root_categories():
    """Get all root level categories"""
    return ROOT_CATEGORIES

# Usage examples:
if __name__ == "__main__":
    print("FRED Categories Dictionary")
    print(f"Total categories: {{len(FRED_CATEGORIES_SIMPLE)}}")
    print(f"Root categories: {{len(ROOT_CATEGORIES)}}")
    
    # Example usage
    print("\\nFirst 5 categories:")
    for cat_id, cat_name in list(FRED_CATEGORIES_SIMPLE.items())[:5]:
        print(f"  {{cat_id}}: {{cat_name}}")
'''
    
    with open(filename, 'w') as f:
        f.write(dict_content)
    print(f"💾 Saved {len(categories)} categories to {filename} (Python dictionary format)")

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
    
    try:
        # Fetch all categories
        start_time = datetime.now()
        categories = fetch_all_categories()
        end_time = datetime.now()
        
        # Display results
        print_category_summary(categories)
        
        # Save to multiple formats
        save_categories_to_file(categories)
        save_categories_as_js(categories)
        save_categories_as_dict(categories)
        
        print(f"\n⏱️  Total time: {end_time - start_time}")
        print(f"✅ Complete! Found {len(categories)} total categories")
        print(f"\n📁 Files created:")
        print(f"   - fred_categories.json (for backend/analysis)")
        print(f"   - fred_categories.js (for frontend import)")
        print(f"   - fred_categories_dict.py (Python dictionary format)")
        
    except KeyboardInterrupt:
        print(f"\n🛑 Process interrupted by user")
        print(f"📁 Check for partial files: fred_categories_partial_*.json")