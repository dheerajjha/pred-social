import * as Joi from 'joi';

// Validation schema for environment variables
export const environmentValidationSchema = Joi.object({
  // Node environment
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  // API Configuration
  GATEWAY_PORT: Joi.number().default(5010),
  API_PREFIX: Joi.string().default('api'),
  API_VERSION: Joi.string().default('v1'),

  // JWT Configuration
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION: Joi.string().default('1h'),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_REFRESH_EXPIRATION: Joi.string().default('7d'),

  // Database Configuration
  DATABASE_URL: Joi.string().required(),

  // Redis Configuration
  REDIS_HOST: Joi.string().default('localhost'),
  REDIS_PORT: Joi.number().default(6379),
  REDIS_PASSWORD: Joi.string().allow('').optional(),

  // Web App URL
  WEB_APP_URL: Joi.string().default('http://localhost:3000'),
  
  // Market API Keys
  UPSTOX_API_KEY: Joi.string().optional(),
  UPSTOX_API_SECRET: Joi.string().optional(),
  KITE_API_KEY: Joi.string().optional(),
  KITE_API_SECRET: Joi.string().optional(),
}); 