import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const drawerWidth = 280;

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

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({open, onClose }) => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (categoryName: string) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName);
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          p: 2,
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" fontWeight="bold" flexGrow={1}>
            Econ Dashboard
          </Typography>
          <IconButton onClick={onClose} size="small">
            <ChevronLeftIcon />
          </IconButton>
        </Box>
        <List>
          {categories.map((category, index) => (
            <Box key={index}>
              <ListItemButton onClick={() => toggleCategory(category.name)}>
                <ListItemText primary={category.name} />
                {openCategory === category.name ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openCategory === category.name} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {category.subcategories.map((sub, subIndex) => (
                    <ListItemButton key={subIndex} sx={{ pl: 4 }}>
                      <ListItemText primary={sub} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </Box>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;