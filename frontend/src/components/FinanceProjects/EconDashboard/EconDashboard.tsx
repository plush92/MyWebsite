import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import MacroIndicators from './macroindicators/MacroIndicators';
import ConsumerHealth from './consumerhealth/ConsumerHealth';
import FinancialMarkets from './financialmarkets/FinancialMarkets';
import CorporateMetrics from './corporatemetrics/CorporateMetrics';

const EconDashboard: React.FC = () => {
    return (
        <Box maxWidth="md" mx="auto" mt={4} component={Paper} p={4} elevation={3}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
                Econ Dashboard
            </Typography>
            <Typography variant="body1" mb={3}>
                The Econ Dashboard provides an overview of key economic metrics that impact financial markets,
                businesses, and consumer behavior. These metrics are carefully chosen to give a comprehensive
                understanding of the economic landscape, enabling better decision-making and insights.
            </Typography>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Purpose
            </Typography>
            <Typography variant="body1" mb={3}>
                This dashboard serves as an educational tool, helping users understand the interconnectedness
                of economic indicators and their implications on various sectors. Each metric is explained in
                context to ensure clarity for users of all levels of expertise.
            </Typography>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Metrics Overview
            </Typography>
            <Typography variant="body1" mb={1}>
                The metrics are grouped into four categories:
            </Typography>
            <List>
                <ListItem>
                    <ListItemText
                        primary={<b>Macro Indicators</b>}
                        secondary="Broad economic trends such as GDP and inflation."
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={<b>Consumer Health</b>}
                        secondary="Insights into consumer spending, housing, and employment."
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={<b>Corporate Metrics</b>}
                        secondary="Key data on business performance and productivity."
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={<b>Financial Markets</b>}
                        secondary="Indicators that reflect the state of financial systems."
                    />
                </ListItem>
            </List>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Explore the Metrics
            </Typography>
            <Typography variant="body1">
                Use the sidebar to navigate through each category for detailed information and data visualizations.
            </Typography>
        </Box>
    );
}

export default EconDashboard;