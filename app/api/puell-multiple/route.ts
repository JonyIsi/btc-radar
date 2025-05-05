import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get('https://open-api.coinank.com/api/indicator/getPuellMultiple', {
      headers: {
        'apikey': process.env.COINANK_API_KEY
      }
    });

    return NextResponse.json({
      data: {
        puellMultiplList: response.data.data.puellMultiplList,
        priceList: response.data.data.priceList,
      }
    });
    
  } catch (err) {
    console.error('Failed to fetch puell multiple:', err);
    return NextResponse.json({ error: 'Failed to fetch puell multiple' }, { status: 500 });
  }
}