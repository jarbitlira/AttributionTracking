import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Conversion } from './schemas/conversion.schema';
import { Ga4Event } from './schemas/ga4-event.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ConfigModule, MongooseModule.forFeature()],
  providers: [Conversion, Ga4Event],
  exports: [Conversion, Ga4Event],
})
export class CoreModule {}
