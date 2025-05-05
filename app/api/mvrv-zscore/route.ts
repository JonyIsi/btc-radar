import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get('https://open-api.coinank.com/api/indicator/index/charts?type=/charts/mvrv-zscore/', {
      headers: {
        'apikey': process.env.COINANK_API_KEY
      }
    });
    return NextResponse.json({
        data: {
            mvrvList: response.data.data.value1,
            zscoreList: response.data.data.value4,
        }
    });

  } catch (error) {
    console.error('Error fetching index:', error);
    return NextResponse.json({ error: 'Failed to fetch index' }, { status: 500 });
  }
} 