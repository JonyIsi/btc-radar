'use client';

import { useEffect, useState } from 'react';
import { getBitcoinPrice } from '../services/btcPrice';

interface PriceData {
  price: number;
  change24h: number;
}

export default function BitcoinPrice() {
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 获取比特币价格的异步函数
  const fetchPrice = async () => {
    try {
      // 设置加载状态
      setLoading(true);
      // 调用API获取价格数据
      const data = await getBitcoinPrice();
      // 调试日志
      console.log('Fetched price:', data);
      // 更新价格数据状态
      setPriceData(data);
      // 清除错误状态
      setError(null);
    } catch (err) {
      // 错误日志
      console.error('Error details:', err);
      // 设置错误信息
      setError('获取价格失败');
    } finally {
      // 完成后关闭加载状态
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrice();
  }, []);

  const renderPriceChange = (change: number) => {
    const isPositive = change >= 0;
    return (
      <p className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive ? '↑' : '↓'} {Math.abs(change).toFixed(2)}%
      </p>
    );
  };

  return (
    <div className="mb-8 p-6 bg-white rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">BTC 实时价格</h2>
        <button 
          onClick={fetchPrice}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {loading ? '刷新中...' : '刷新价格'}
        </button>
      </div>
      
      {loading ? (
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48"></div>
        </div>
      ) : error ? (
        <div>
          <p className="text-red-500">{error}</p>
          <p className="text-sm text-gray-500">请检查浏览器控制台获取详细错误信息</p>
        </div>
      ) : priceData ? (
        <div>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-blue-600">
              ${priceData.price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </p>
            {renderPriceChange(priceData.change24h)}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            最后更新时间: {new Date().toLocaleTimeString()}
          </p>
        </div>
      ) : null}
    </div>
  );
} 