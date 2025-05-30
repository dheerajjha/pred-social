// Environment configuration
export const isProduction = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isTest = process.env.NODE_ENV === 'test';

// Common configuration function to load into NestJS ConfigModule
export default () => ({
  environment: process.env.NODE_ENV || 'development',
  
  // API configuration
  gateway: {
    port: parseInt(process.env.GATEWAY_PORT || '5010', 10),
    prefix: process.env.API_PREFIX || 'api',
    version: process.env.API_VERSION || 'v1',
  },
  
  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRATION || '1h',
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRATION || '7d',
  },
  
  // Database configuration
  database: {
    url: process.env.DATABASE_URL,
  },
  
  // Redis configuration
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD || undefined,
  },
  
  // Web app URL
  webAppUrl: process.env.WEB_APP_URL || 'http://localhost:3000',
  
  // Microservices configuration
  microservices: {
    auth: {
      host: process.env.AUTH_SERVICE_HOST || 'localhost',
      port: parseInt(process.env.AUTH_SERVICE_PORT || '5011', 10),
    },
    user: {
      host: process.env.USER_SERVICE_HOST || 'localhost',
      port: parseInt(process.env.USER_SERVICE_PORT || '5012', 10),
    },
    prediction: {
      host: process.env.PREDICTION_SERVICE_HOST || 'localhost',
      port: parseInt(process.env.PREDICTION_SERVICE_PORT || '5013', 10),
    },
    scoring: {
      host: process.env.SCORING_WORKER_HOST || 'localhost',
      port: parseInt(process.env.SCORING_WORKER_PORT || '5014', 10),
    },
    feed: {
      host: process.env.FEED_SERVICE_HOST || 'localhost',
      port: parseInt(process.env.FEED_SERVICE_PORT || '5015', 10),
    },
    market: {
      host: process.env.MARKET_INGEST_HOST || 'localhost',
      port: parseInt(process.env.MARKET_INGEST_PORT || '5016', 10),
    },
    news: {
      host: process.env.NEWS_INGEST_HOST || 'localhost',
      port: parseInt(process.env.NEWS_INGEST_PORT || '5017', 10),
    },
    notify: {
      host: process.env.NOTIFY_SERVICE_HOST || 'localhost',
      port: parseInt(process.env.NOTIFY_SERVICE_PORT || '5018', 10),
    },
    community: {
      host: process.env.COMM_SERVICE_HOST || 'localhost',
      port: parseInt(process.env.COMM_SERVICE_PORT || '5019', 10),
    },
  },
  
  // Market API keys
  marketApi: {
    upstox: {
      apiKey: process.env.UPSTOX_API_KEY,
      apiSecret: process.env.UPSTOX_API_SECRET,
    },
    kite: {
      apiKey: process.env.KITE_API_KEY,
      apiSecret: process.env.KITE_API_SECRET,
    },
  },
}); 