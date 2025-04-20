'use client';  // 这是前台的工作（在用户浏览器中运行）
import React from 'react';  // 借用React工具来做界面

/**
 * 投资指标数据结构
 * name: 指标名称
 * value: 当前值
 * threshold: 阈值
 * description: 指标描述
 */
interface Indicator {
  name: string;
  value: number;
  threshold: number;
  description: string;
}

/**
 * 组件属性定义
 * indicators: 投资指标数组
 */
interface InvestmentIndicatorsProps {
  indicators: Indicator[];
}

/**
 * 投资指标展示组件
 * 根据指标数据展示当前是否适合定投
 * 并显示每个具体指标的详细信息
 */
export default function InvestmentIndicators({ indicators }: InvestmentIndicatorsProps) {
  // 计算指标总数和积极指标数量
  const totalIndicators = indicators.length;
  const positiveIndicators = indicators.filter(ind => ind.value <= ind.threshold).length;
  const isGoodTime = positiveIndicators > totalIndicators / 2;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* 标题区域 */}
      <h2 className="text-2xl font-bold mb-6 text-gray-900">BTC投资时机指标</h2>
      
      {/* 投资建议总览区域 */}
      <div className={`p-4 mb-6 rounded-lg ${isGoodTime ? 'bg-green-100' : 'bg-red-100'}`}>
        <p className="text-lg font-semibold text-gray-900">
          {isGoodTime ? '✅ 适合定投' : '❌ 不适合定投'}
        </p>
        <p className="text-sm text-gray-700">
          {positiveIndicators} / {totalIndicators} 个指标显示{isGoodTime ? '适合' : '不适合'}定投
        </p>
      </div>

      {/* 具体指标列表区域 */}
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