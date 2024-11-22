import MacroIndicators from './macroindicators/macroindicators';
import ConsumerHealth from './ConsumerHealth/ConsumerHealth';
import FinancialMarkets from './FinancialMarkets/FinancialMarkets';
import CorporateMetrics from './CorporateMetrics/CorporateMetrics';

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
