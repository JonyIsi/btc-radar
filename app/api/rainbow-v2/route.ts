import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get('https://open-api.coinank.com/api/indicator/index/charts?type=bitcoin-rainbow-v2', {
      headers: {
        'apikey': process.env.COINANK_API_KEY
      }
    });

    return NextResponse.json({
      data: {
        btcPrice: response.data.data.btcPrice,
        value2: response.data.data.value2,
        value3: response.data.data.value3,
        value4: response.data.data.value4,
        value5: response.data.data.value5, 
        timeList: response.data.data.timeList,
      }
    });

  } catch (error) {
    console.error('Error fetching rainbow-v2:', error);
    return NextResponse.json({ error: 'Failed to fetch rainbow-v2' }, { status: 500 });
  }
} 