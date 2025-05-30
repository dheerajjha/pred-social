export default () => ({
  port: parseInt(process.env.GATEWAY_PORT || '5010', 10),
  
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  },
  
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
    feed: {
      host: process.env.FEED_SERVICE_HOST || 'localhost',
      port: parseInt(process.env.FEED_SERVICE_PORT || '5015', 10),
    },
    notification: {
      host: process.env.NOTIFY_SERVICE_HOST || 'localhost',
      port: parseInt(process.env.NOTIFY_SERVICE_PORT || '5018', 10),
    },
    community: {
      host: process.env.COMMUNITY_SERVICE_HOST || 'localhost',
      port: parseInt(process.env.COMMUNITY_SERVICE_PORT || '5019', 10),
    },
  },
  
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD,
    db: parseInt(process.env.REDIS_DB || '0', 10),
  },
  
  rateLimiting: {
    ttl: parseInt(process.env.RATE_LIMIT_TTL || '60', 10),
    limit: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  },
}); 