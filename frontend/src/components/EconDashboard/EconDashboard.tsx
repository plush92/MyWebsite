import React from 'react';
import MacroIndicators from './macroindicators/MacroIndicators';
import ConsumerHealth from './consumerhealth/ConsumerHealth';
import FinancialMarkets from './financialmarkets/FinancialMarkets';
import CorporateMetrics from './corporatemetrics/CorporateMetrics';

const EconDashboard: React.FC = () => {
    return (
        <div>
            <header>
                <h1>Econ Dashboard</h1>
                <p>
                    The Econ Dashboard provides an overview of key economic metrics that impact financial markets,
                    businesses, and consumer behavior. These metrics are carefully chosen to give a comprehensive
                    understanding of the economic landscape, enabling better decision-making and insights.
                </p>
            </header>
            <section>
                <h2>Purpose</h2>
                <p>
                    This dashboard serves as an educational tool, helping users understand the interconnectedness
                    of economic indicators and their implications on various sectors. Each metric is explained in
                    context to ensure clarity for users of all levels of expertise.
                </p>
            </section>
            <section>
                <h2>Metrics Overview</h2>
                <p>
                    The metrics are grouped into four categories:
                </p>
                <ul>
                    <li><strong>Macro Indicators</strong>: Broad economic trends such as GDP and inflation.</li>
                    <li><strong>Consumer Health</strong>: Insights into consumer spending, housing, and employment.</li>
                    <li><strong>Corporate Metrics</strong>: Key data on business performance and productivity.</li>
                    <li><strong>Financial Markets</strong>: Indicators that reflect the state of financial systems.</li>
                </ul>
            </section>
            <section>
                <h2>Explore the Metrics</h2>
                <p>
                    Use the sidebar to navigate through each category for detailed information and data visualizations.
                </p>
            </section>

        </div>
    );
}

export default EconDashboard;

