// 导入axios HTTP客户端库
import axios from 'axios';

// 获取比特币当前价格和24小时价格变化的异步函数
export async function getBitcoinPrice() {
  try {
    // 调用CoinGecko API获取比特币价格数据
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd', {
      params: {
        ids: 'bitcoin',
        vs_currencies: 'usd',
        include_24hr_change: true
      }
    });
    
    // 从响应数据中提取价格和24小时变化并返回
    return {
      price: response.data.bitcoin.usd,
      change24h: response.data.bitcoin.usd_24h_change
    };
  } catch(error) {
    // 错误处理:记录错误并返回null
    console.error('Error fetching BTC price:', error);
    return null;
  }
} 