import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get('https://open-api.coinank.com/api/indicator/index/charts?type=/charts/relative-unrealized-prof/', {
      headers: {
        'apikey': process.env.COINANK_API_KEY
      }
    });

    console.log('NUPL第三方接口完整响应:', response.data);

    return NextResponse.json({
        data: {
            nuplList: response.data.data.value1,
        }
    });
    
  } catch (error) {
    console.error('Error fetching index:', error);
    return NextResponse.json({ error: 'Failed to fetch index' }, { status: 500 });
  }
}