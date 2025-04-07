import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">关于BTC Radar</h1>
        
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">投资时机指标</h2>
          <p className="mb-4 text-gray-700">
            BTC Radar跟踪多个关键指标来帮助确定最佳的比特币投资时机：
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <strong className="text-gray-900">MVRV Z-Score：</strong>衡量比特币相对于其实现价值的估值。低于0.5表示被低估。
            </li>
            <li>
              <strong className="text-gray-900">恐惧贪婪指数：</strong>追踪市场情绪。低于25表示极度恐惧，通常是买入机会。
            </li>
            <li>
              <strong className="text-gray-900">长期持有者占比：</strong>币龄超过155天的地址占比。高于60%表示长期持有者占主导。
            </li>
            <li>
              <strong className="text-gray-900">AHR999指数：</strong>结合价格和200日均线。低于0.45表示良好的买入机会。
            </li>
            <li>
              <strong className="text-gray-900">NUPL：</strong>未实现盈亏。负值表示市场整体亏损。
            </li>
            <li>
              <strong className="text-gray-900">Puell Multiple：</strong>衡量矿工收入。低于0.5表示矿工在低价出售。
            </li>
            <li>
              <strong className="text-gray-900">RHODL Ratio：</strong>衡量新币占比。低于历史低位表示新币占比高，通常是买入机会。
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">投资策略</h2>
          <p className="mb-4 text-gray-700">
            当超过一半的指标显示有利条件时，可能是考虑定投比特币的好时机。但请记住，投资需谨慎，不要投入超过你能承受损失的资金。
          </p>
        </div>
      </main>
    </div>
  );
} 