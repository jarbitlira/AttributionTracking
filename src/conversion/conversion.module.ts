import { Module } from '@nestjs/common';
import { ConversionResolver } from './resolvers/conversion.resolver';
import { ConversionService } from './services/conversion.service';
import { CoreModule } from '../core/core.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Ga4EventsModule } from '../ga4-events/ga4-events.module';
import { conversionProvider } from './providers/conversion.provider';

@Module({
  imports: [
    CoreModule,
    ConfigModule,
    Ga4EventsModule,
    MongooseModule.forFeatureAsync([
      conversionProvider
    ]),
  ],
  providers: [ConversionResolver, ConversionService],
  exports: [ConversionResolver, ConversionService],
})
export class ConversionModule {
}
