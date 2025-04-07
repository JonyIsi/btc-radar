'use client';

import React from 'react';

interface Indicator {
  name: string;
  value: number;
  threshold: number;
  description: string;
}

interface InvestmentIndicatorsProps {
  indicators: Indicator[];
}

export default function InvestmentIndicators({ indicators }: InvestmentIndicatorsProps) {
  const totalIndicators = indicators.length;
  const positiveIndicators = indicators.filter(ind => ind.value <= ind.threshold).length;
  const isGoodTime = positiveIndicators > totalIndicators / 2;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">BTC投资时机指标</h2>
      
      <div className={`p-4 mb-6 rounded-lg ${isGoodTime ? 'bg-green-100' : 'bg-red-100'}`}>
        <p className="text-lg font-semibold text-gray-900">
          {isGoodTime ? '✅ 适合定投' : '❌ 不适合定投'}
        </p>
        <p className="text-sm text-gray-700">
          {positiveIndicators} / {totalIndicators} 个指标显示{isGoodTime ? '适合' : '不适合'}定投
        </p>
      </div>

      <div className="grid gap-4">
        {indicators.map((indicator, index) => (
          <div key={index} className="p-4 border rounded-lg bg-white shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-900">{indicator.name}</h3>
              <span className={`px-2 py-1 rounded ${
                indicator.value <= indicator.threshold ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {indicator.value.toFixed(2)}
              </span>
            </div>
            <p className="text-sm text-gray-700">{indicator.description}</p>
            <p className="text-xs text-gray-500 mt-1">
              阈值: {indicator.threshold.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
} 