import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { Connection } from 'mongoose';

export const databaseProvider = async (configService: ConfigService) => {
  const logger = new Logger(databaseProvider.name);
  return {
    uri: configService.get('database.uri') as string,
    onConnectionCreate: (connection: Connection) => {
      // connection.plugin(require('mongoose-autopopulate'));
      connection.on('connected', () => {
        logger.log('Database connection created');
      });
      connection.on('open', () => {
        logger.log('Database ready');
      });
      return connection;
    },
  };
};
