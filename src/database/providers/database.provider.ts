import { ConfigModule, ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { Connection } from 'mongoose';
import { Conversion, ConversionSchema } from '../schemas/conversion.schema';
import { createHmac } from 'node:crypto';

export const databaseProvider =
  async (configService: ConfigService) => {
    const logger = new Logger(databaseProvider.name);
    return (
      {
        uri: configService.get('database.uri'),
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
      });
  };


export const conversionProvider =

  {
    name: Conversion.name,
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      ConversionSchema.pre('save', function (next) {
        this.emailHash = createHmac('sha256', configService.get('secretKey') as string)
          .update(this.emailHash)
          .digest('hex');
        next();
      });
      return ConversionSchema;
    },
  };
