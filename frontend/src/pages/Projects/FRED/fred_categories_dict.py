"""
FRED Categories Dictionary
Generated on 2025-10-27 19:30:34
Total categories: 101
"""

# Simple ID -> Name mapping
FRED_CATEGORIES_SIMPLE = {
  "1": "Production & Business Activity",
  "2": "Productivity & Costs",
  "3": "Industrial Production & Capacity Utilization",
  "4": "Employment Cost Index",
  "5": "Federal Government Debt",
  "6": "Retail Trade",
  "9": "Consumer Price Indexes (CPI and PCE)",
  "10": "Population, Employment, & Labor Markets",
  "11": "Current Employment Statistics (Establishment Survey)",
  "12": "Current Population Survey (Household Survey)",
  "13": "U.S. Trade & International Transactions",
  "15": "Exchange Rates",
  "16": "Exports",
  "17": "Imports",
  "18": "National Income & Product Accounts",
  "21": "Price Indexes & Deflators",
  "22": "Interest Rates",
  "23": "Banking",
  "24": "Monetary Data",
  "25": "M1 and Components",
  "26": "Memorandum Items",
  "28": "M3 and Components",
  "29": "M2 and Components",
  "30": "MZM",
  "31": "Producer Price Indexes (PPI)",
  "46": "Financial Indicators",
  "51": "Bankers Acceptance Rate",
  "64": "8th District Banking Performance",
  "65": "Arkansas",
  "66": "Illinois",
  "67": "Indiana",
  "68": "Kentucky",
  "69": "Mississippi",
  "70": "Missouri",
  "71": "Tennessee",
  "72": "8th District",
  "73": "United States",
  "82": "Treasury Inflation-Indexed Securities",
  "83": "Condition of Banks",
  "84": "New England Census Division",
  "85": "Middle Atlantic Census Division",
  "86": "East North Central Census Division",
  "87": "West North Central Census Division",
  "88": "South Atlantic Census Division",
  "89": "East South Central Census Division",
  "90": "West South Central Census Division",
  "91": "Mountain Census Division",
  "92": "Pacific Census Division",
  "93": "United States",
  "94": "Daily Rates",
  "95": "Monthly Rates",
  "96": "M2 Minus Small Time Deposits",
  "97": "Housing",
  "99": "Securities & Investments",
  "100": "Commercial Banking",
  "101": "Consumer Credit",
  "104": "Population",
  "105": "Trade-Weighted Indexes",
  "106": "GDP/GNP",
  "107": "Gov't Receipts, Expenditures & Investment",
  "108": "Foreign Transactions",
  "109": "Private Enterprise Income",
  "110": "Personal Income & Outlays",
  "112": "Domestic Capital Account (Saving & Investment)",
  "114": "Mortgage Rates",
  "115": "Treasury Constant Maturity",
  "116": "Treasury Bills",
  "117": "Prime Bank Loan Rate",
  "118": "FRB Rates - discount, fed funds, primary credit",
  "120": "Commercial Paper",
  "149": "Arkansas",
  "150": "Illinois",
  "151": "Indiana",
  "152": "Kentucky",
  "153": "Mississippi",
  "154": "Missouri",
  "158": "By Country",
  "191": "United Kingdom",
  "192": "Venezuela",
  "193": "Tennessee",
  "204": "Benton County, TN",
  "205": "Carroll County, TN",
  "206": "Chester County, TN",
  "207": "Crockett County, TN",
  "208": "Decatur County, TN",
  "209": "Dyer County, TN",
  "210": "Fayette County, TN",
  "211": "Gibson County, TN",
  "212": "Hardin County, TN",
  "213": "Hardeman County, TN",
  "214": "Haywood County, TN",
  "215": "Henderson County, TN",
  "216": "Henry County, TN",
  "217": "Lake County, TN",
  "218": "Lauderdale County, TN",
  "219": "Madison County, TN",
  "220": "McNairy County, TN",
  "221": "Obion County, TN",
  "222": "Shelby County, TN",
  "223": "Tipton County, TN",
  "224": "Weakley County, TN"
}

# Comprehensive category data (ID -> full category object)
FRED_CATEGORIES_FULL = {
  "1": {
    "id": 1,
    "name": "Production & Business Activity",
    "parent_id": 0
  },
  "2": {
    "id": 2,
    "name": "Productivity & Costs",
    "parent_id": 10
  },
  "3": {
    "id": 3,
    "name": "Industrial Production & Capacity Utilization",
    "parent_id": 1
  },
  "4": {
    "id": 4,
    "name": "Employment Cost Index",
    "parent_id": 32455
  },
  "5": {
    "id": 5,
    "name": "Federal Government Debt",
    "parent_id": 32992
  },
  "6": {
    "id": 6,
    "name": "Retail Trade",
    "parent_id": 1
  },
  "9": {
    "id": 9,
    "name": "Consumer Price Indexes (CPI and PCE)",
    "parent_id": 32455
  },
  "10": {
    "id": 10,
    "name": "Population, Employment, & Labor Markets",
    "parent_id": 0
  },
  "11": {
    "id": 11,
    "name": "Current Employment Statistics (Establishment Survey)",
    "parent_id": 10,
    "notes": "The establishment survey provides data on employment, hours, and earnings by industry.\r\nNumerous conceptual and methodological differences between the current population (household) and establishment surveys result in important distinctions in the employment estimates derived from the surveys. Among these are: \r\nThe household survey includes agricultural workers, the self- employed, unpaid family workers, and private household workers among the employed. These groups are excluded from the establishment survey. \r\nThe household survey includes people on unpaid leave among the employed. The establishment survey does not. \r\nThe household survey is limited to workers 16 years of age and older. The establishment survey is not limited by age. \r\nThe household survey has no duplication of individuals, because individuals are counted only once, even if they hold more than one job. In the establishment survey, employees working at more than one job and thus appearing on more than one payroll are counted separately for each appearance. \r\nFor more information, visit http://www.bls.gov/news.release/empsit.tn.htm."
  },
  "12": {
    "id": 12,
    "name": "Current Population Survey (Household Survey)",
    "parent_id": 10,
    "notes": "The Current Population Survey (Household Survey) is a monthly survey of households conducted by the Bureau of Labor Statistics. It provides a comprehensive body of data on the labor force, employment, unemployment, persons not in the labor force, hours of work, earnings, and other demographic and labor force characteristics. \r\nNumerous conceptual and methodological differences between the current population (household) and establishment surveys result in important distinctions in the employment estimates derived from the surveys. Among these are: \r\nThe household survey includes agricultural workers, the self- employed, unpaid family workers, and private household workers among the employed. These groups are excluded from the establishment survey. \r\nThe household survey includes people on unpaid leave among the employed. The establishment survey does not. \r\nThe household survey is limited to workers 16 years of age and older. The establishment survey is not limited by age. \r\nThe household survey has no duplication of individuals, because individuals are counted only once, even if they hold more than one job. In the establishment survey, employees working at more than one job and thus appearing on more than one payroll are counted separately for each appearance. \r\n\r\nFor more information, visit http://www.bls.gov/news.release/empsit.tn.htm."
  },
  "13": {
    "id": 13,
    "name": "U.S. Trade & International Transactions",
    "parent_id": 32992
  },
  "15": {
    "id": 15,
    "name": "Exchange Rates",
    "parent_id": 32991
  },
  "16": {
    "id": 16,
    "name": "Exports",
    "parent_id": 13
  },
  "17": {
    "id": 17,
    "name": "Imports",
    "parent_id": 13
  },
  "18": {
    "id": 18,
    "name": "National Income & Product Accounts",
    "parent_id": 32992
  },
  "21": {
    "id": 21,
    "name": "Price Indexes & Deflators",
    "parent_id": 18
  },
  "22": {
    "id": 22,
    "name": "Interest Rates",
    "parent_id": 32991
  },
  "23": {
    "id": 23,
    "name": "Banking",
    "parent_id": 32991
  },
  "24": {
    "id": 24,
    "name": "Monetary Data",
    "parent_id": 32991
  },
  "25": {
    "id": 25,
    "name": "M1 and Components",
    "parent_id": 24
  },
  "26": {
    "id": 26,
    "name": "Memorandum Items",
    "parent_id": 24
  },
  "28": {
    "id": 28,
    "name": "M3 and Components",
    "parent_id": 24
  },
  "29": {
    "id": 29,
    "name": "M2 and Components",
    "parent_id": 24
  },
  "30": {
    "id": 30,
    "name": "MZM",
    "parent_id": 24
  },
  "31": {
    "id": 31,
    "name": "Producer Price Indexes (PPI)",
    "parent_id": 32455
  },
  "46": {
    "id": 46,
    "name": "Financial Indicators",
    "parent_id": 32991
  },
  "51": {
    "id": 51,
    "name": "Bankers Acceptance Rate",
    "parent_id": 22
  },
  "64": {
    "id": 64,
    "name": "8th District Banking Performance",
    "parent_id": 23
  },
  "65": {
    "id": 65,
    "name": "Arkansas",
    "parent_id": 64
  },
  "66": {
    "id": 66,
    "name": "Illinois",
    "parent_id": 64
  },
  "67": {
    "id": 67,
    "name": "Indiana",
    "parent_id": 64
  },
  "68": {
    "id": 68,
    "name": "Kentucky",
    "parent_id": 64
  },
  "69": {
    "id": 69,
    "name": "Mississippi",
    "parent_id": 64
  },
  "70": {
    "id": 70,
    "name": "Missouri",
    "parent_id": 64
  },
  "71": {
    "id": 71,
    "name": "Tennessee",
    "parent_id": 64
  },
  "72": {
    "id": 72,
    "name": "8th District",
    "parent_id": 64
  },
  "73": {
    "id": 73,
    "name": "United States",
    "parent_id": 64
  },
  "82": {
    "id": 82,
    "name": "Treasury Inflation-Indexed Securities",
    "parent_id": 22
  },
  "83": {
    "id": 83,
    "name": "Condition of Banks",
    "parent_id": 23,
    "notes": "For census division definitions, see http://research.stlouisfed.org/fred2/censusdivisions."
  },
  "84": {
    "id": 84,
    "name": "New England Census Division",
    "parent_id": 83,
    "notes": "For census division definitions, see http://research.stlouisfed.org/fred2/censusdivisions."
  },
  "85": {
    "id": 85,
    "name": "Middle Atlantic Census Division",
    "parent_id": 83,
    "notes": "For census division definitions, see http://research.stlouisfed.org/fred2/censusdivisions."
  },
  "86": {
    "id": 86,
    "name": "East North Central Census Division",
    "parent_id": 83,
    "notes": "For census division definitions, see http://research.stlouisfed.org/fred2/censusdivisions."
  },
  "87": {
    "id": 87,
    "name": "West North Central Census Division",
    "parent_id": 83,
    "notes": "For census division definitions, see http://research.stlouisfed.org/fred2/censusdivisions."
  },
  "88": {
    "id": 88,
    "name": "South Atlantic Census Division",
    "parent_id": 83,
    "notes": "For census division definitions, see http://research.stlouisfed.org/fred2/censusdivisions."
  },
  "89": {
    "id": 89,
    "name": "East South Central Census Division",
    "parent_id": 83,
    "notes": "For census division definitions, see http://research.stlouisfed.org/fred2/censusdivisions."
  },
  "90": {
    "id": 90,
    "name": "West South Central Census Division",
    "parent_id": 83,
    "notes": "For census division definitions, see http://research.stlouisfed.org/fred2/censusdivisions."
  },
  "91": {
    "id": 91,
    "name": "Mountain Census Division",
    "parent_id": 83,
    "notes": "For census division definitions, see http://research.stlouisfed.org/fred2/censusdivisions."
  },
  "92": {
    "id": 92,
    "name": "Pacific Census Division",
    "parent_id": 83,
    "notes": "For census division definitions, see http://research.stlouisfed.org/fred2/censusdivisions."
  },
  "93": {
    "id": 93,
    "name": "United States",
    "parent_id": 83
  },
  "94": {
    "id": 94,
    "name": "Daily Rates",
    "parent_id": 15,
    "notes": "Effective January 1, 2009, the Federal Reserve Board discontinued publication of the H.10 Daily Update, which provided U.S. dollar exchange rates against other currencies certified for customs purposes by the Federal Reserve Bank of New York and summary measures of the foreign exchange value of the dollar.   \r\n The Federal Reserve Board still makes the certified exchange rates available.  Effective January 5, 2009, the Board publishes the daily exchange rate data in a weekly version of the H.10 release.\r\n As a result, the daily exchange rates in the FRED database will be updated once each week to capture the daily data from the previous week."
  },
  "95": {
    "id": 95,
    "name": "Monthly Rates",
    "parent_id": 15
  },
  "96": {
    "id": 96,
    "name": "M2 Minus Small Time Deposits",
    "parent_id": 24
  },
  "97": {
    "id": 97,
    "name": "Housing",
    "parent_id": 1
  },
  "99": {
    "id": 99,
    "name": "Securities & Investments",
    "parent_id": 23
  },
  "100": {
    "id": 100,
    "name": "Commercial Banking",
    "parent_id": 23
  },
  "101": {
    "id": 101,
    "name": "Consumer Credit",
    "parent_id": 23
  },
  "104": {
    "id": 104,
    "name": "Population",
    "parent_id": 10
  },
  "105": {
    "id": 105,
    "name": "Trade-Weighted Indexes",
    "parent_id": 15
  },
  "106": {
    "id": 106,
    "name": "GDP/GNP",
    "parent_id": 18
  },
  "107": {
    "id": 107,
    "name": "Gov't Receipts, Expenditures & Investment",
    "parent_id": 18
  },
  "108": {
    "id": 108,
    "name": "Foreign Transactions",
    "parent_id": 18
  },
  "109": {
    "id": 109,
    "name": "Private Enterprise Income",
    "parent_id": 18
  },
  "110": {
    "id": 110,
    "name": "Personal Income & Outlays",
    "parent_id": 18
  },
  "112": {
    "id": 112,
    "name": "Domestic Capital Account (Saving & Investment)",
    "parent_id": 18
  },
  "114": {
    "id": 114,
    "name": "Mortgage Rates",
    "parent_id": 22
  },
  "115": {
    "id": 115,
    "name": "Treasury Constant Maturity",
    "parent_id": 22
  },
  "116": {
    "id": 116,
    "name": "Treasury Bills",
    "parent_id": 22
  },
  "117": {
    "id": 117,
    "name": "Prime Bank Loan Rate",
    "parent_id": 22
  },
  "118": {
    "id": 118,
    "name": "FRB Rates - discount, fed funds, primary credit",
    "parent_id": 22
  },
  "120": {
    "id": 120,
    "name": "Commercial Paper",
    "parent_id": 22
  },
  "149": {
    "id": 149,
    "name": "Arkansas",
    "parent_id": 27281
  },
  "150": {
    "id": 150,
    "name": "Illinois",
    "parent_id": 27281
  },
  "151": {
    "id": 151,
    "name": "Indiana",
    "parent_id": 27281
  },
  "152": {
    "id": 152,
    "name": "Kentucky",
    "parent_id": 27281
  },
  "153": {
    "id": 153,
    "name": "Mississippi",
    "parent_id": 27281
  },
  "154": {
    "id": 154,
    "name": "Missouri",
    "parent_id": 27281
  },
  "158": {
    "id": 158,
    "name": "By Country",
    "parent_id": 15
  },
  "191": {
    "id": 191,
    "name": "United Kingdom",
    "parent_id": 158
  },
  "192": {
    "id": 192,
    "name": "Venezuela",
    "parent_id": 158
  },
  "193": {
    "id": 193,
    "name": "Tennessee",
    "parent_id": 27281
  },
  "204": {
    "id": 204,
    "name": "Benton County, TN",
    "parent_id": 29802
  },
  "205": {
    "id": 205,
    "name": "Carroll County, TN",
    "parent_id": 29802
  },
  "206": {
    "id": 206,
    "name": "Chester County, TN",
    "parent_id": 29802
  },
  "207": {
    "id": 207,
    "name": "Crockett County, TN",
    "parent_id": 29802
  },
  "208": {
    "id": 208,
    "name": "Decatur County, TN",
    "parent_id": 29802
  },
  "209": {
    "id": 209,
    "name": "Dyer County, TN",
    "parent_id": 29802
  },
  "210": {
    "id": 210,
    "name": "Fayette County, TN",
    "parent_id": 29802
  },
  "211": {
    "id": 211,
    "name": "Gibson County, TN",
    "parent_id": 29802
  },
  "212": {
    "id": 212,
    "name": "Hardin County, TN",
    "parent_id": 29802
  },
  "213": {
    "id": 213,
    "name": "Hardeman County, TN",
    "parent_id": 29802
  },
  "214": {
    "id": 214,
    "name": "Haywood County, TN",
    "parent_id": 29802
  },
  "215": {
    "id": 215,
    "name": "Henderson County, TN",
    "parent_id": 29802
  },
  "216": {
    "id": 216,
    "name": "Henry County, TN",
    "parent_id": 29802
  },
  "217": {
    "id": 217,
    "name": "Lake County, TN",
    "parent_id": 29802
  },
  "218": {
    "id": 218,
    "name": "Lauderdale County, TN",
    "parent_id": 29802
  },
  "219": {
    "id": 219,
    "name": "Madison County, TN",
    "parent_id": 29802
  },
  "220": {
    "id": 220,
    "name": "McNairy County, TN",
    "parent_id": 29802
  },
  "221": {
    "id": 221,
    "name": "Obion County, TN",
    "parent_id": 29802
  },
  "222": {
    "id": 222,
    "name": "Shelby County, TN",
    "parent_id": 29802
  },
  "223": {
    "id": 223,
    "name": "Tipton County, TN",
    "parent_id": 29802
  },
  "224": {
    "id": 224,
    "name": "Weakley County, TN",
    "parent_id": 29802
  }
}

# Parent-child relationships (Parent ID -> list of child categories)
FRED_PARENT_CHILD = {
  "0": [
    {
      "id": 1,
      "name": "Production & Business Activity",
      "parent_id": 0
    },
    {
      "id": 10,
      "name": "Population, Employment, & Labor Markets",
      "parent_id": 0
    }
  ],
  "10": [
    {
      "id": 2,
      "name": "Productivity & Costs",
      "parent_id": 10
    },
    {
      "id": 11,
      "name": "Current Employment Statistics (Establishment Survey)",
      "parent_id": 10,
      "notes": "The establishment survey provides data on employment, hours, and earnings by industry.\r\nNumerous conceptual and methodological differences between the current population (household) and establishment surveys result in important distinctions in the employment estimates derived from the surveys. Among these are: \r\nThe household survey includes agricultural workers, the self- employed, unpaid family workers, and private household workers among the employed. These groups are excluded from the establishment survey. \r\nThe household survey includes people on unpaid leave among the employed. The establishment survey does not. \r\nThe household survey is limited to workers 16 years of age and older. The establishment survey is not limited by age. \r\nThe household survey has no duplication of individuals, because individuals are counted only once, even if they hold more than one job. In the establishment survey, employees working at more than one job and thus appearing on more than one payroll are counted separately for each appearance. \r\nFor more information, visit http://www.bls.gov/news.release/empsit.tn.htm."
    },
    {
      "id": 12,
      "name": "Current Population Survey (Household Survey)",
      "parent_id": 10,
      "notes": "The Current Population Survey (Household Survey) is a monthly survey of households conducted by the Bureau of Labor Statistics. It provides a comprehensive body of data on the labor force, employment, unemployment, persons not in the labor force, hours of work, earnings, and other demographic and labor force characteristics. \r\nNumerous conceptual and methodological differences between the current population (household) and establishment surveys result in important distinctions in the employment estimates derived from the surveys. Among these are: \r\nThe household survey includes agricultural workers, the self- employed, unpaid family workers, and private household workers among the employed. These groups are excluded from the establishment survey. \r\nThe household survey includes people on unpaid leave among the employed. The establishment survey does not. \r\nThe household survey is limited to workers 16 years of age and older. The establishment survey is not limited by age. \r\nThe household survey has no duplication of individuals, because individuals are counted only once, even if they hold more than one job. In the establishment survey, employees working at more than one job and thus appearing on more than one payroll are counted separately for each appearance. \r\n\r\nFor more information, visit http://www.bls.gov/news.release/empsit.tn.htm."
    },
    {
      "id": 104,
      "name": "Population",
      "parent_id": 10
    }
  ],
  "1": [
    {
      "id": 3,
      "name": "Industrial Production & Capacity Utilization",
      "parent_id": 1
    },
    {
      "id": 6,
      "name": "Retail Trade",
      "parent_id": 1
    },
    {
      "id": 97,
      "name": "Housing",
      "parent_id": 1
    }
  ],
  "32455": [
    {
      "id": 4,
      "name": "Employment Cost Index",
      "parent_id": 32455
    },
    {
      "id": 9,
      "name": "Consumer Price Indexes (CPI and PCE)",
      "parent_id": 32455
    },
    {
      "id": 31,
      "name": "Producer Price Indexes (PPI)",
      "parent_id": 32455
    }
  ],
  "32992": [
    {
      "id": 5,
      "name": "Federal Government Debt",
      "parent_id": 32992
    },
    {
      "id": 13,
      "name": "U.S. Trade & International Transactions",
      "parent_id": 32992
    },
    {
      "id": 18,
      "name": "National Income & Product Accounts",
      "parent_id": 32992
    }
  ],
  "32991": [
    {
      "id": 15,
      "name": "Exchange Rates",
      "parent_id": 32991
    },
    {
      "id": 22,
      "name": "Interest Rates",
      "parent_id": 32991
    },
    {
      "id": 23,
      "name": "Banking",
      "parent_id": 32991
    },
    {
      "id": 24,
      "name": "Monetary Data",
      "parent_id": 32991
    },
    {
      "id": 46,
      "name": "Financial Indicators",
      "parent_id": 32991
    }
  ],
  "13": [
    {
      "id": 16,
      "name": "Exports",
      "parent_id": 13
    },
    {
      "id": 17,
      "name": "Imports",
      "parent_id": 13
    }
  ],
  "18": [
    {
      "id": 21,
      "name": "Price Indexes & Deflators",
      "parent_id": 18
    },
    {
      "id": 106,
      "name": "GDP/GNP",
      "parent_id": 18
    },
    {
      "id": 107,
      "name": "Gov't Receipts, Expenditures & Investment",
      "parent_id": 18
    },
    {
      "id": 108,
      "name": "Foreign Transactions",
      "parent_id": 18
    },
    {
      "id": 109,
      "name": "Private Enterprise Income",
      "parent_id": 18
    },
    {
      "id": 110,
      "name": "Personal Income & Outlays",
      "parent_id": 18
    },
    {
      "id": 112,
      "name": "Domestic Capital Account (Saving & Investment)",
      "parent_id": 18
    }
  ],
  "24": [
    {
      "id": 25,
      "name": "M1 and Components",
      "parent_id": 24
    },
    {
      "id": 26,
      "name": "Memorandum Items",
      "parent_id": 24
    },
    {
      "id": 28,
      "name": "M3 and Components",
      "parent_id": 24
    },
    {
      "id": 29,
      "name": "M2 and Components",
      "parent_id": 24
    },
    {
      "id": 30,
      "name": "MZM",
      "parent_id": 24
    },
    {
      "id": 96,
      "name": "M2 Minus Small Time Deposits",
      "parent_id": 24
    }
  ],
  "22": [
    {
      "id": 51,
      "name": "Bankers Acceptance Rate",
      "parent_id": 22
    },
    {
      "id": 82,
      "name": "Treasury Inflation-Indexed Securities",
      "parent_id": 22
    },
    {
      "id": 114,
      "name": "Mortgage Rates",
      "parent_id": 22
    },
    {
      "id": 115,
      "name": "Treasury Constant Maturity",
      "parent_id": 22
    },
    {
      "id": 116,
      "name": "Treasury Bills",
      "parent_id": 22
    },
    {
      "id": 117,
      "name": "Prime Bank Loan Rate",
      "parent_id": 22
    },
    {
      "id": 118,
      "name": "FRB Rates - discount, fed funds, primary credit",
      "parent_id": 22
    },
    {
      "id": 120,
      "name": "Commercial Paper",
      "parent_id": 22
    }
  ],
  "23": [
    {
      "id": 64,
      "name": "8th District Banking Performance",
      "parent_id": 23
    },
    {
      "id": 83,
      "name": "Condition of Banks",
      "parent_id": 23,
      "notes": "For census division definitions, see http://research.stlouisfed.org/fred2/censusdivisions."
    },
    {
      "id": 99,
      "name": "Securities & Investments",
      "parent_id": 23
    },
    {
      "id": 100,
      "name": "Commercial Banking",
      "parent_id": 23
    },
    {
      "id": 101,
      "name": "Consumer Credit",
      "parent_id": 23
    }
  ],
  "64": [
    {
      "id": 65,
      "name": "Arkansas",
      "parent_id": 64
    },
    {
      "id": 66,
      "name": "Illinois",
      "parent_id": 64
    },
    {
      "id": 67,
      "name": "Indiana",
      "parent_id": 64
    },
    {
      "id": 68,
      "name": "Kentucky",
      "parent_id": 64
    },
    {
      "id": 69,
      "name": "Mississippi",
      "parent_id": 64
    },
    {
      "id": 70,
      "name": "Missouri",
      "parent_id": 64
    },
    {
      "id": 71,
      "name": "Tennessee",
      "parent_id": 64
    },
    {
      "id": 72,
      "name": "8th District",
      "parent_id": 64
    },
    {
      "id": 73,
      "name": "United States",
      "parent_id": 64
    }
  ],
  "83": [
    {
      "id": 84,
      "name": "New England Census Division",
      "parent_id": 83,
      "notes": "For census division definitions, see http://research.stlouisfed.org/fred2/censusdivisions."
    },
    {
      "id": 85,
      "name": "Middle Atlantic Census Division",
      "parent_id": 83,
      "notes": "For census division definitions, see http://research.stlouisfed.org/fred2/censusdivisions."
    },
    {
      "id": 86,
      "name": "East North Central Census Division",
      "parent_id": 83,
      "notes": "For census division definitions, see http://research.stlouisfed.org/fred2/censusdivisions."
    },
    {
      "id": 87,
      "name": "West North Central Census Division",
      "parent_id": 83,
      "notes": "For census division definitions, see http://research.stlouisfed.org/fred2/censusdivisions."
    },
    {
      "id": 88,
      "name": "South Atlantic Census Division",
      "parent_id": 83,
      "notes": "For census division definitions, see http://research.stlouisfed.org/fred2/censusdivisions."
    },
    {
      "id": 89,
      "name": "East South Central Census Division",
      "parent_id": 83,
      "notes": "For census division definitions, see http://research.stlouisfed.org/fred2/censusdivisions."
    },
    {
      "id": 90,
      "name": "West South Central Census Division",
      "parent_id": 83,
      "notes": "For census division definitions, see http://research.stlouisfed.org/fred2/censusdivisions."
    },
    {
      "id": 91,
      "name": "Mountain Census Division",
      "parent_id": 83,
      "notes": "For census division definitions, see http://research.stlouisfed.org/fred2/censusdivisions."
    },
    {
      "id": 92,
      "name": "Pacific Census Division",
      "parent_id": 83,
      "notes": "For census division definitions, see http://research.stlouisfed.org/fred2/censusdivisions."
    },
    {
      "id": 93,
      "name": "United States",
      "parent_id": 83
    }
  ],
  "15": [
    {
      "id": 94,
      "name": "Daily Rates",
      "parent_id": 15,
      "notes": "Effective January 1, 2009, the Federal Reserve Board discontinued publication of the H.10 Daily Update, which provided U.S. dollar exchange rates against other currencies certified for customs purposes by the Federal Reserve Bank of New York and summary measures of the foreign exchange value of the dollar.   \r\n The Federal Reserve Board still makes the certified exchange rates available.  Effective January 5, 2009, the Board publishes the daily exchange rate data in a weekly version of the H.10 release.\r\n As a result, the daily exchange rates in the FRED database will be updated once each week to capture the daily data from the previous week."
    },
    {
      "id": 95,
      "name": "Monthly Rates",
      "parent_id": 15
    },
    {
      "id": 105,
      "name": "Trade-Weighted Indexes",
      "parent_id": 15
    },
    {
      "id": 158,
      "name": "By Country",
      "parent_id": 15
    }
  ],
  "27281": [
    {
      "id": 149,
      "name": "Arkansas",
      "parent_id": 27281
    },
    {
      "id": 150,
      "name": "Illinois",
      "parent_id": 27281
    },
    {
      "id": 151,
      "name": "Indiana",
      "parent_id": 27281
    },
    {
      "id": 152,
      "name": "Kentucky",
      "parent_id": 27281
    },
    {
      "id": 153,
      "name": "Mississippi",
      "parent_id": 27281
    },
    {
      "id": 154,
      "name": "Missouri",
      "parent_id": 27281
    },
    {
      "id": 193,
      "name": "Tennessee",
      "parent_id": 27281
    }
  ],
  "158": [
    {
      "id": 191,
      "name": "United Kingdom",
      "parent_id": 158
    },
    {
      "id": 192,
      "name": "Venezuela",
      "parent_id": 158
    }
  ],
  "29802": [
    {
      "id": 204,
      "name": "Benton County, TN",
      "parent_id": 29802
    },
    {
      "id": 205,
      "name": "Carroll County, TN",
      "parent_id": 29802
    },
    {
      "id": 206,
      "name": "Chester County, TN",
      "parent_id": 29802
    },
    {
      "id": 207,
      "name": "Crockett County, TN",
      "parent_id": 29802
    },
    {
      "id": 208,
      "name": "Decatur County, TN",
      "parent_id": 29802
    },
    {
      "id": 209,
      "name": "Dyer County, TN",
      "parent_id": 29802
    },
    {
      "id": 210,
      "name": "Fayette County, TN",
      "parent_id": 29802
    },
    {
      "id": 211,
      "name": "Gibson County, TN",
      "parent_id": 29802
    },
    {
      "id": 212,
      "name": "Hardin County, TN",
      "parent_id": 29802
    },
    {
      "id": 213,
      "name": "Hardeman County, TN",
      "parent_id": 29802
    },
    {
      "id": 214,
      "name": "Haywood County, TN",
      "parent_id": 29802
    },
    {
      "id": 215,
      "name": "Henderson County, TN",
      "parent_id": 29802
    },
    {
      "id": 216,
      "name": "Henry County, TN",
      "parent_id": 29802
    },
    {
      "id": 217,
      "name": "Lake County, TN",
      "parent_id": 29802
    },
    {
      "id": 218,
      "name": "Lauderdale County, TN",
      "parent_id": 29802
    },
    {
      "id": 219,
      "name": "Madison County, TN",
      "parent_id": 29802
    },
    {
      "id": 220,
      "name": "McNairy County, TN",
      "parent_id": 29802
    },
    {
      "id": 221,
      "name": "Obion County, TN",
      "parent_id": 29802
    },
    {
      "id": 222,
      "name": "Shelby County, TN",
      "parent_id": 29802
    },
    {
      "id": 223,
      "name": "Tipton County, TN",
      "parent_id": 29802
    },
    {
      "id": 224,
      "name": "Weakley County, TN",
      "parent_id": 29802
    }
  ]
}

# Root categories (parent_id = 0)
ROOT_CATEGORIES = [
  {
    "id": 1,
    "name": "Production & Business Activity",
    "parent_id": 0
  },
  {
    "id": 10,
    "name": "Population, Employment, & Labor Markets",
    "parent_id": 0
  }
]

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
    print(f"Total categories: {len(FRED_CATEGORIES_SIMPLE)}")
    print(f"Root categories: {len(ROOT_CATEGORIES)}")
    
    # Example usage
    print("\nFirst 5 categories:")
    for cat_id, cat_name in list(FRED_CATEGORIES_SIMPLE.items())[:5]:
        print(f"  {cat_id}: {cat_name}")
