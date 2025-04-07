import InvestmentIndicators from './components/InvestmentIndicators';
import { fetchBtcIndicators } from './services/btcIndicators';

export default async function Home() {
  const indicators = await fetchBtcIndicators();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto py-8">
        <InvestmentIndicators indicators={indicators} />
      </main>
    </div>
  );
}
