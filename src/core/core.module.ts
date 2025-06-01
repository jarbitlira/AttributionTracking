import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Conversion } from './schemas/conversion.schema';
import { Ga4Event } from './schemas/ga4-event';

@Module({
  imports: [ConfigModule],
  providers: [Conversion, Ga4Event],
})
export class CoreModule {}
