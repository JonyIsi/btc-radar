import InvestmentIndicators from './components/InvestmentIndicators';
import SellIndicators from './components/SellIndicators';
import { fetchPeriodIndicators } from './services/PeriodIndicators';
import BitcoinPrice from './components/BitcoinPrice';
// import GreedFearIndex from './components/GreedFearInde';

export default async function Home() {
  const Periodindicators = await fetchPeriodIndicators();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto py-8">
        <div className="flex flex-row gap-8">
          <div className="flex-1">
            <BitcoinPrice />
          </div>
          <div className="flex-1">
            <div className="bg-white rounded-xl p-6">
              <InvestmentIndicators indicators={Periodindicators} />
            </div>
          </div>
          <div className="flex-1">
            <div className="bg-white rounded-xl p-6">
              <SellIndicators indicators={Periodindicators} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

