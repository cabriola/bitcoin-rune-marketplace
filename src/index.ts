import mongoose from 'mongoose';
import { config } from './config/config';
import { logger } from './utils/logger';
import app from './app';

// Connect to MongoDB
mongoose
  .connect(config.mongoUri)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (error: Error) => {
  logger.error('Unhandled Promise Rejection:', error);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
}); 