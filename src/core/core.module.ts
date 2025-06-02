import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Conversion, ConversionSchema } from './schemas/conversion.schema';
import { Ga4Event, Ga4EventSchema } from './schemas/ga4-event.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { HashingService } from './services/hashing.service';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature(
      [
        { name: Conversion.name, schema: ConversionSchema },
        { name: Ga4Event.name, schema: Ga4EventSchema },
      ]),
  ],
  providers: [Conversion, Ga4Event, HashingService],
  exports: [Conversion, Ga4Event, HashingService, MongooseModule],
})
export class CoreModule {
}
