import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get('https://open-api.coinank.com/api/indicator/getMarketCapRank?symbol=BTC', {
      headers: {
        'apikey': process.env.COINANK_API_KEY
      }
    });

    return NextResponse.json({
      data: {
        marketCapRateList: response.data.data.marketCapRateList,
      }
    }); 
    
  } catch (error) {
    console.error('Error fetching btc marketcap index:', error);
    return NextResponse.json({ error: 'Failed to fetch btc marketcap index' }, { status: 500 });
  }
}