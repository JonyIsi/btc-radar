import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: 'bitcoin',
        vs_currencies: 'usd',
      },
    });
    const price = response.data.bitcoin?.usd || null;

    return NextResponse.json({ price });
    
  } catch (error) {
    console.error('Error fetching BTC price:', error);
    return NextResponse.json({ error: 'Failed to fetch BTC price' }, { status: 500 });
  }
} 