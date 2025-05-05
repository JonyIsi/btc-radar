import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get('https://open-api.coinank.com/api/indicator/getCnnEntity', {
      headers: {
        'apikey': process.env.COINANK_API_KEY
      }
    });

    return NextResponse.json(response.data);
    
  } catch (error) {
    console.error('Error fetching greed fear index:', error);
    return NextResponse.json({ error: 'Failed to fetch greed fear index' }, { status: 500 });
  }
}