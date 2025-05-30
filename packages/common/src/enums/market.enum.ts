export enum MarketExchange {
  NSE = 'NSE',
  BSE = 'BSE',
  MCX = 'MCX',
  NCDEX = 'NCDEX'
}

export enum MarketSegment {
  EQUITY = 'equity',
  FUTURES = 'futures',
  OPTIONS = 'options',
  COMMODITY = 'commodity',
  CURRENCY = 'currency'
}

export enum MarketStatus {
  PRE_OPEN = 'pre_open',
  OPEN = 'open',
  CLOSED = 'closed',
  HOLIDAY = 'holiday'
}

export enum AssetType {
  STOCK = 'stock',
  INDEX = 'index',
  ETF = 'etf',
  MUTUAL_FUND = 'mutual_fund',
  BOND = 'bond',
  COMMODITY = 'commodity',
  CURRENCY = 'currency'
}

export enum OrderType {
  BUY = 'buy',
  SELL = 'sell'
} 