import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get('https://open-api.coinank.com/api/indicator/getAhr999', {
      headers: {
        'apikey': process.env.COINANK_API_KEY
      }
    });

    return NextResponse.json({
      data: {
        cnnValueList: response.data.data.ahr999,
      }
    });
  } catch (error) {
    console.error('Error fetching ahr999 index:', error);
    return NextResponse.json({ error: 'Failed to fetch ahr999 index' }, { status: 500 });
  }
}