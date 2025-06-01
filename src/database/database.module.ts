import { conversionProvider, databaseProvider } from './providers/database.provider';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Conversion } from './schemas/conversion.schema';
import { Ga4Event } from './schemas/ga4-event';
import { ConversionResolver } from './resolvers/conversion.resolver';
import { ConversionInputDto } from './dtos/conversion.dto';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: databaseProvider,
      inject: [ConfigService],
    }),
    MongooseModule.forFeatureAsync([
      conversionProvider,
    ]),
  ],
  providers: [
    Conversion,
    ConversionInputDto,
    Ga4Event,

    ConversionResolver
  ],
  exports: [Conversion, Ga4Event, ConversionResolver, ConversionInputDto],
})
export class DatabaseModule {
}
