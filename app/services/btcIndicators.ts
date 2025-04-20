
/**
 * 投资指标数据结构
 * name: 指标名称
 * value: 当前值
 * threshold: 阈值
 * description: 指标描述
 */
interface IndicatorData {
  name: string;
  value: number;
  threshold: number;
  description: string;
}

export async function fetchBtcIndicators(): Promise<IndicatorData[]> {
  try {
    // In a real app, these would be actual API calls
    // For now, we'll return mock data
    return [
      {
        name: 'MVRV Z-Score',
        value: 0.3,
        threshold: 0.5,
        description: '市场价值与实现价值比率'
      },
      {
        name: '恐惧贪婪指数',
        value: 20,
        threshold: 25,
        description: 'CMC恐惧贪婪指数'
      },
      {
        name: '长期持有者占比',
        value: 65,
        threshold: 60,
        description: '币龄>155天的地址占比'
      },
      {
        name: 'AHR999指数',
        value: 0.4,
        threshold: 0.45,
        description: '比特币价格指数'
      },
      {
        name: 'NUPL',
        value: -0.1,
        threshold: 0,
        description: '未实现盈亏'
      },
      {
        name: 'Puell Multiple',
        value: 0.4,
        threshold: 0.5,
        description: '矿工收入指标'
      },
      {
        name: 'RHODL Ratio',
        value: 0.8,
        threshold: 1.0,
        description: '新币占比指标'
      }
    ];
  } catch (error) {
    console.error('Error fetching BTC indicators:', error);
    throw error;
  }
} 