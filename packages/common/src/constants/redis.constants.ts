// Redis-related constants
export const REDIS_HOST = 'localhost';
export const REDIS_PORT = 6379;

// Redis keys
export const REDIS_KEY_PREFIX = 'pred-social:';
export const REDIS_USER_KEY = `${REDIS_KEY_PREFIX}user:`;
export const REDIS_PREDICTION_KEY = `${REDIS_KEY_PREFIX}prediction:`;
export const REDIS_STOCK_KEY = `${REDIS_KEY_PREFIX}stock:`;
export const REDIS_FEED_KEY = `${REDIS_KEY_PREFIX}feed:`;

// Redis streams
export const REDIS_STREAM_PREDICTIONS = `${REDIS_KEY_PREFIX}stream:predictions`;
export const REDIS_STREAM_MARKET_DATA = `${REDIS_KEY_PREFIX}stream:market-data`;
export const REDIS_STREAM_NOTIFICATIONS = `${REDIS_KEY_PREFIX}stream:notifications`; 