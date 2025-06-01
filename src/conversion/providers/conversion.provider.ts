import {
  Conversion,
  ConversionSchema,
} from '../../core/schemas/conversion.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createHmac } from 'node:crypto';

export const conversionProvider = {
  name: Conversion.name,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    ConversionSchema.pre('save', function (next) {
      console.log(this);

      this.emailHash = createHmac(
        'sha256',
        configService.get('secretKey') as string,
      )
        .update('this.email')
        .digest('hex');
      next();
    });
    return ConversionSchema;
  },
};
