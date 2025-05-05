/**
 * 投资指标数据结构
 * name: 指标名称
 * value: 当前值
 * threshold: 阈值
 * minThreshold?: 最小阈值
 * maxThreshold?: 最大阈值
 * description: 指标描述
 */
interface PeriodIndicatorData {
  name: string;
  value: number;
  threshold: number;
  minThreshold?: number;
  maxThreshold?: number;
  sellThreshold?: number;
  description: string;
  formula?: string;
}

export async function fetchPeriodIndicators(): Promise<PeriodIndicatorData[]> {
  try {
    // 服务器端 fetch 需要绝对路径
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';

    // 获取恐惧贪婪指数
    const fearGreedResponse = await fetch(`${baseUrl}/api/greed-fear`);
    const fearGreedData = await fearGreedResponse.json();
    const fearGreedValue = fearGreedData.data?.cnnValueList?.[fearGreedData.data.cnnValueList.length - 1] || 20;

    // 获取AHR999真实数据
    const ahr999Response = await fetch(`${baseUrl}/api/ahr999`);
    const ahr999Data = await ahr999Response.json();
    const ahr999List = ahr999Data.data?.cnnValueList;
    const ahr999Value = ahr999List?.[ahr999List.length - 1] ?? 0.0;

    // 获取Puell Multiple真实数据
    const puellResponse = await fetch(`${baseUrl}/api/puell-multiple`);
    const puellData = await puellResponse.json();
    const puellList = puellData.data?.puellMultiplList;
    const puellValue = puellList?.[puellList.length - 1] ?? 0.0;

    // 获取BTC市场市占率 
    const marketCapRateResponse = await fetch(`${baseUrl}/api/btc-marketcaprate`);
    const marketCapRateData = await marketCapRateResponse.json();
    const marketCapRateList = marketCapRateData.data?.marketCapRateList;
    const marketCapRateValue = marketCapRateList?.[marketCapRateList.length - 1] ?? 0.0;

    // 获取NUPL数据
    const nuplResponse = await fetch(`${baseUrl}/api/nupl`);
    const nuplData = await nuplResponse.json();
    const nuplList = nuplData.data?.nuplList;
    const nuplValue = nuplList?.[nuplList.length - 1] ?? 0.0;

    // 获取MVRV Z-Score
    const mvrvResponse = await fetch(`${baseUrl}/api/mvrv-zscore`);
    const mvrvData = await mvrvResponse.json();
    const zscoreList = mvrvData.data?.zscoreList; 
    const zscoreValue = zscoreList?.[zscoreList.length - 1] ?? 0.0;


    // 获取一年+Hold波
    const oneyearHoldwaveResponse = await fetch(`${baseUrl}/api/oneyear-holdwave`);
    const oneyearHoldwaveData = await oneyearHoldwaveResponse.json();
    const oneyearHoldwaveList = oneyearHoldwaveData.data?.oneyearHoldwaveList;
    const oneyearHoldwaveValue = oneyearHoldwaveList?.[oneyearHoldwaveList.length - 1] ?? 0.0;

    // 获取RHODL 比率
    const rhodlResponse = await fetch(`${baseUrl}/api/rhodl-ratio`);
    const rhodlData = await rhodlResponse.json();
    const rhodlList = rhodlData.data?.rhodlList;
    const rhodlValue = rhodlList?.[rhodlList.length - 1] ?? 0.0;

    // 获取彩虹图V2
    const rainbowResponse = await fetch(`${baseUrl}/api/rainbow-v2`);
    const rainbowData = await rainbowResponse.json();
    const value4 = rainbowData.data?.value4;
    const value5 = rainbowData.data?.value5;
    const timeList = rainbowData.data?.timeList;
    
    // 查找今天的数据索引
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 设置为今天的0点
    const todayTimestamp = today.getTime();
    
    let todayIndex = -1;
    if (timeList && timeList.length > 0) {
      // 查找今天或最近的日期
      for (let i = timeList.length - 1; i >= 0; i--) {
        if (timeList[i] <= todayTimestamp) {
          todayIndex = i;
          break;
        }
      }
    }
    
    // 如果找到今天的索引，使用对应的value4值，否则使用最后一个值
    const value4Today = todayIndex !== -1 && value4 ? value4[todayIndex] : (value4?.[value4?.length - 1] ?? 0);
    const value5Today = todayIndex !== -1 && value5 ? value5[todayIndex] : (value5?.[value5?.length - 1] ?? 0);
    
    // 获取BTC价格
    const btcPriceResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
    const btcPriceData = await btcPriceResponse.json();
    const btcPrice = btcPriceData.bitcoin?.usd ?? 0.0;

    return [
      {
        name: 'AHR999指数',
        value: ahr999Value,
        threshold: 1.2,
        sellThreshold: 1.2,
        description: '判断比特币当前价格是高估还是低估。',
        formula: '过去999天BTC价格的最高价 ÷ 当前BTC价格',
      },
      {
        name: '比特币普尔系数',
        value: puellValue,
        threshold: 1,
        sellThreshold: 1.5,
        description: '普尔系数衡量矿工收入，研究供给侧（矿工）的抛售压力。',
        formula: '当天新发行BTC的美元价值 ÷ 365天新发行BTC的美元价值平均值',
      },
      {
        name: '未实现净损益（NUPL）',
        value: nuplValue,
        threshold: 0.5,
        sellThreshold: 0.75,
        description: '判断多数人是否盈利，数值越大，盈利越多，NUPL>0.75为顶部。',
        formula: '(当前市值−已实现市值) ÷ 当前市值',
      },
      {
        name: '一年+HODL波',
        value: oneyearHoldwaveValue,
        threshold: 0.63,
        sellThreshold: 0.5,
        description: '一年+Hold波大于0.63时适合定投，低于0.5为顶部。',
        formula: '持有超过1年的BTC数量 ÷ 流通总量',
      },
      {
        name: 'RHODL 比率',
        value: rhodlValue,
        threshold: 3000, 
        sellThreshold: 5000,
        description: 'RHODL 比率低于3000适合定投。高于5000为顶部风险区间。',
        formula: '短期HODL者(1周内转移的币的已实现价值) ÷ 长期HODL者(1、2年未转移的币的已实现价值)',
      },
      {
        name: 'MVRV Z-Score',
        value: zscoreValue,
        threshold: 3,
        sellThreshold: 3.5,
        description: 'MVRV Z-Score 小于3时适合定投，大于3.5时考虑抛售。',
        formula: '（市场价值 - 已实现价值） ÷ （市场价值与已实现价值之差的标准差）',
      },
      {
        name: 'BTC市场市占率',
        value: marketCapRateValue,
        threshold: 0.6,
        sellThreshold: 0.8,
        description: 'BTC市场市占率，数据低于0.6区间时，适合定投，高于0.8为顶部。',
        formula: 'BTC市值 ÷ 所有加密货币市值'
      },
      {
        name: '彩虹图V2',
        value: btcPrice,
        threshold: value4Today,
        sellThreshold: value5Today,
        description: '当前价格低于"价格便宜"区间时候，适合定投，远高于该区间时考虑抛售。',
        formula: 'exp( a × ln(从创世区块以来的天数) + b )，a和b是根据历史数据拟合的常数'
      },
      {
        name: '恐惧贪婪指数',
        value: fearGreedValue,
        threshold: 50,
        sellThreshold: 75,
        description: '代表当前比特币交易市场情绪，越低越恐惧。',
        formula: 'CoinAnk上的加权指标，由波动率（25%）、市场动量/交易量（25%）、社交媒体（15%）、市场调查（15%）、主导地位（10%）、Google趋势（10%）组成'
      },
    ];
  } catch (error) {
    console.error('Error fetching BTC indicators:', error);
    throw error;
  }
} 