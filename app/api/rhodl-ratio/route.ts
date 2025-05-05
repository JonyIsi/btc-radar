import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get('https://open-api.coinank.com/api/indicator/index/charts?type=/charts/rhodl-ratio/', {
      headers: {
        'apikey': process.env.COINANK_API_KEY
      }
    });
    return NextResponse.json({
        data: {
            rhodlList: response.data.data.value1,
        }
    });
  } catch (error) {
    console.error('Error fetching rhodl-ratio:', error);
    return NextResponse.json({ error: 'Failed to fetch rhodl-ratio' }, { status: 500 });
  }
} 