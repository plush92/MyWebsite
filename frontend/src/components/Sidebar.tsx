import React, { useState } from 'react';
import "/src/styles/Sidebar.css";

const Sidebar = () => {
  const categories = [
    {
      name: 'Consumer Health',
      subcategories: [
        'Consumer Sentiment Index',
        'Personal Savings Rate',
        'Retail Sales Growth',
        'Consumer Debt Levels',
        'Disposable Personal Income',
        'Housing Affordability Index',
        'Credit Card Delinquency Rates',
        'Auto Loan Deliquency Rates',
        'Consumer Spending (PCE)',
        'Food and Energy Prices',
      ],
    },
    {
      name: 'Corporate Metrics',
      subcategories: [
        'Corporate Debt',
        'Earnings',
        'Corporate Profit Margins',
        'Business Confidence Index',
        'Capital Expenditures (CapEx)',
        'Nonfarm Payrolls (Employment Data)',
        'Business Formation Statistics',
        'Bankruptcies',
      ],
    },
    {
      name: 'Financial Metrics',
      subcategories: [
        'Personal Savings',
        'Consumer Sentiment',
        'Consumer Spending',
        'Retail Sales',
        'Household Debt-to-Income Ratio',
        'Credit Card Debt',
        'Auto Sales',
        'Inflation',
      ],
    },
    {
      name: 'Macro Indicators',
      subcategories: [
        'Balance of Trade',
        'Commodity Prices',
        'Corporate Debt',
        'GDP',
        'Government Debt-to-GDP Ratio',
        'Housing',
        'Inflation',
        'Interest Rates',
        'Money Supply',
        'Personal Consumption Expenditures (PCE)',
        'Purchasing Managers Index (PMI)',
      ],
    },
  ];

  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (categoryName: string) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName);
  };

  return (
    <div className="sidebar">
      <h2>Econ Dashboard</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <div
              className="category-name"
              onClick={() => toggleCategory(category.name)}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <span style={{ marginRight: '8px' }}>
                {openCategory === category.name ? '▼' : '▶'}
              </span>
              {category.name}
            </div>
            {openCategory === category.name && (
              <ul className="subcategory-list">
                {category.subcategories.map((sub, subIndex) => (
                  <li key={subIndex}>{sub}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
