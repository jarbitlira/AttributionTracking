import * as mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';

import { Logger } from '@nestjs/common';

export const databaseProvider = [{
  provide: 'DATABASE_CONNECTION',
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<typeof mongoose> => {
    const logger = new Logger('databaseProvider', { timestamp: true });
    return mongoose.connect(
      configService.get('database.host', ''),
      {
        dbName: configService.get('database.name'),
        user: configService.get('database.username'),
        pass: configService.get('database.password'),
      }).finally(() => {
      logger.log('Database connected');
    });
  },
}];
