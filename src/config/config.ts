import dotenv from 'dotenv';
import { logger } from '../utils/logger';

// Load environment variables
dotenv.config();

interface Config {
  port: number;
  mongoUri: string;
  jwtSecret: string;
  web3Provider: string;
  tokenContractAddress: string;
  marketplaceContractAddress: string;
  environment: string;
}

// Validate required environment variables
const requiredEnvVars = [
  'PORT',
  'MONGO_URI',
  'JWT_SECRET',
  'WEB3_PROVIDER',
  'TOKEN_CONTRACT_ADDRESS',
  'MARKETPLACE_CONTRACT_ADDRESS',
  'NODE_ENV'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    logger.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

export const config: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  mongoUri: process.env.MONGO_URI || '',
  jwtSecret: process.env.JWT_SECRET || '',
  web3Provider: process.env.WEB3_PROVIDER || '',
  tokenContractAddress: process.env.TOKEN_CONTRACT_ADDRESS || '',
  marketplaceContractAddress: process.env.MARKETPLACE_CONTRACT_ADDRESS || '',
  environment: process.env.NODE_ENV || 'development'
}; 