'use client';  // 这是前台的工作（在用户浏览器中运行）
import React, { useState } from 'react';  // 借用React工具来做界面

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
  minThreshold?: number;
  maxThreshold?: number;
  formula?: string;
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
  const [sortedIndicators, setSortedIndicators] = useState(() => {
    // 从本地存储读取排序
    const savedOrder = localStorage.getItem('investmentIndicatorsOrder');
    if (savedOrder) {
      const order = JSON.parse(savedOrder);
      // 根据保存的顺序重新排序指标
      return [...indicators].sort((a, b) => {
        const indexA = order.indexOf(a.name);
        const indexB = order.indexOf(b.name);
        return indexA - indexB;
      });
    }
    return indicators;
  });
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  // 计算指标总数和积极指标数量
  const totalIndicators = sortedIndicators.length;
  const positiveIndicators = sortedIndicators.filter(ind => {
    if (ind.name === '一年+HODL波' || ind.name === '一年+Hold波') {
      // 一年+HODL波：大于threshold才算命中
      return ind.value > ind.threshold;
    }
    if (ind.minThreshold !== undefined && ind.maxThreshold !== undefined) {
      return ind.value >= ind.minThreshold && ind.value <= ind.maxThreshold;
    }
    return ind.value <= ind.threshold;
  }).length;
  const isGoodTime = positiveIndicators > totalIndicators / 2;

  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetIndex: number) => {
    if (draggedItem === null) return;
    
    const newIndicators = [...sortedIndicators];
    const [draggedIndicator] = newIndicators.splice(draggedItem, 1);
    newIndicators.splice(targetIndex, 0, draggedIndicator);
    
    setSortedIndicators(newIndicators);
    // 保存新的排序到本地存储
    localStorage.setItem('investmentIndicatorsOrder', 
      JSON.stringify(newIndicators.map(ind => ind.name))
    );
    setDraggedItem(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* 合并标题和结论 */}
      <div className={`p-4 mb-6 rounded-lg ${isGoodTime ? 'bg-green-100' : 'bg-red-100'}`}>
        <p className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          {isGoodTime ? '适合定投' : '不适合定投'}
        </p>
        <span className="text-base font-normal text-gray-700">
            {positiveIndicators} / {totalIndicators} 个指标显示{isGoodTime ? '适合定投' : '不适合定投'}
        </span>
      </div>

      {/* 具体指标列表区域 */}
      <div className="grid gap-4">
        {sortedIndicators.map((indicator, index) => (
          <div 
            key={index} 
            className="p-4 border rounded-lg bg-white shadow-sm cursor-move"
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-900">{indicator.name}</h3>
              <span className={`px-2 py-1 rounded ${
                (indicator.name === '一年+HODL波' || indicator.name === '一年+Hold波')
                  ? (indicator.value > indicator.threshold
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800')
                  : (indicator.minThreshold !== undefined && indicator.maxThreshold !== undefined
                      ? indicator.value >= indicator.minThreshold && indicator.value <= indicator.maxThreshold
                      : indicator.value <= indicator.threshold)
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
              }`}>
                {indicator.value.toFixed(2)}
              </span>
            </div>
            <p className="text-sm text-gray-700">{indicator.description}</p>
            {indicator.formula && (
              <p className="text-xs text-gray-500">
                {indicator.formula}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {indicator.minThreshold !== undefined && indicator.maxThreshold !== undefined
                ? `区间: ${indicator.minThreshold.toFixed(2)} ~ ${indicator.maxThreshold.toFixed(2)}`
                : `阈值: ${indicator.threshold.toFixed(2)}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
} 