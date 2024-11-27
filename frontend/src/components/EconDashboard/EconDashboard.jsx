import MacroIndicators from './macroindicators/MacroIndicators';
import ConsumerHealth from './consumerhealth/ConsumerHealth';
import FinancialMarkets from './financialmarkets/FinancialMarkets';
import CorporateMetrics from './corporatemetrics/CorporateMetrics';

function EconDashboard() {
    return (
        <div>
            <header>
                <h1>Econ Dashboard</h1>
            </header>
            <MacroIndicators />
            <ConsumerHealth />
            <FinancialMarkets />
            <CorporateMetrics />
        </div>
    );
}

export default EconDashboard;
