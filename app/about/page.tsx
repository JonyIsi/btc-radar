import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto py-8 px-4">
        
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">投资时机指标</h2>
          <p className="mb-4 text-gray-700">
            BTC Radar跟踪多个关键指标来帮助确定最佳的比特币投资时机：
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <strong className="text-gray-900">AHR999指数：</strong>
              <br />
              该指标由微博用户ahr999创建，辅助比特币定投用户结合择机策略做出投资决策。该指标隐含了比特币短期定投的收益率及比特币价格与预期估值的偏离度。
              <br />
              当ahr999指数 &lt; 0.45 ，就可以抄底；
              <br />
              当ahr999在0.45-1.2之间，则适合定投；
              <br />          
              当ahr999 &gt;1.2，那么币价已经比较高了，不适合操作。
              <br />
              从长期来看，比特币价格与区块高度呈现出一定的正相关，同时借助定投方式的优势，用户可以控制短期定投成本，使其大都位于比特币价格之下。
              <br />  
            </li>
            <li>
              <strong className="text-gray-900">比特币普尔系数：</strong>
              <br />
              比特币普尔系数（BTC.PPL）是衡量比特币矿工收入与比特币价格之间关系的指标。该指标由比特币矿工收入除以比特币价格计算得出。
              <br />
              当比特币普尔系数 &lt; 1 ，表示矿工收入低于比特币价格，矿工抛售压力较小，适合定投；
              <br />
              当比特币普尔系数 &gt; 1.5 ，表示矿工收入高于比特币价格，矿工抛售压力较大，考虑抛售。
            </li>
            <li>
              <strong className="text-gray-900">未实现净损益（NUPL）：</strong>
              <br />
              未实现净损益（NUPL）是衡量比特币网络中未实现盈利或亏损的指标。该指标由未实现盈利或亏损的比特币数量除以流通中的比特币数量计算得出。
              <br />
              当未实现净损益 &lt; 0.5 ，表示多数人盈利，适合定投；
              <br />
              当未实现净损益 &gt; 0.75 ，表示多数人亏损，考虑抛售。
            </li>
            <li>
              <strong className="text-gray-900">一年+HODL波：</strong>
              <br />
              该指标使用已实现价值 HODL Waves 的比率。
              <br />
              总之，已实现价值 HODL 波是 UTXO（硬币）的不同年龄带，由每个带内硬币的已实现价值加权。
              <br />
              已实现价值是 UTXO（硬币）最后从一个钱包转移到另一个钱包时的价格。
              <br />
              RHODL 比率查看 1 周的 RHODL 波段与 1-2 年的 RHODL 波段之间的比率。
              <br />
              它还通过将比率乘以市场天数来校准随时间增加的囤积和丢失的硬币。
              <br />
            当 1 周的值显着高于 1-2 年时，这是市场变得过热的信号。
            </li>
            <li>
              <strong className="text-gray-900">MVRV Z-Score：</strong>衡量比特币相对于其实现价值的估值。小于3适合定投，大于3.5考虑抛售。
            </li>
            <li>
              <strong className="text-gray-900">BTC市场市占率：</strong>BTC市值占所有加密货币市值的比例。低于0.6适合定投，高于0.8为顶部。
            </li>
            <li>
              <strong className="text-gray-900">彩虹图V2：</strong>基于对数回归的价格预测模型。当前价格低于&ldquo;价格便宜&rdquo;区间适合定投，远高于该区间考虑抛售。
            </li>
            <li>
              <strong className="text-gray-900">恐惧贪婪指数：</strong>代表当前比特币交易市场情绪。低于50适合定投，高于75考虑抛售。
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">投资策略</h2>
          <p className="mb-4 text-gray-700">
            当超过一半的指标显示有利条件时，可能是考虑定投比特币的好时机。但请记住，投资需谨慎，不要投入超过你能承受损失的资金。每个指标都有其特定的阈值，可以根据个人风险偏好进行调整。
          </p>
          <p className="text-gray-700">
            指标排序可以根据个人偏好通过拖拽来调整，排序结果会自动保存。这样可以让你更关注对你来说最重要的指标。
          </p>
        </div>
      </main>
    </div>
  );
} 