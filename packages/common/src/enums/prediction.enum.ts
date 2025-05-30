export enum PredictionStatus {
  PENDING = 'pending',
  HIT = 'hit',
  MISS = 'miss',
  PARTIAL = 'partial',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled'
}

export enum PredictionPredicate {
  GREATER_THAN = '>',
  LESS_THAN = '<',
  GREATER_THAN_OR_EQUAL = '>=',
  LESS_THAN_OR_EQUAL = '<=',
  EQUAL = '='
}

export enum PredictionMetric {
  CLOSE = 'close',
  OPEN = 'open',
  HIGH = 'high',
  LOW = 'low',
  VOLUME = 'volume'
}

export enum PredictionTimeframe {
  INTRADAY = 'intraday',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  YEARLY = 'yearly'
} 