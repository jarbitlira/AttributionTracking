import { Module } from '@nestjs/common';
import { ConversionResolver } from './resolvers/conversion.resolver';
import { ConversionService } from './services/conversion.service';
import { CoreModule } from '../core/core.module';
import { MongooseModule } from '@nestjs/mongoose';
import { conversionProvider } from './providers/conversion.provider';

@Module({
  imports: [CoreModule, MongooseModule.forFeatureAsync([conversionProvider])],
  providers: [ConversionResolver, ConversionService],
  exports: [ConversionResolver, ConversionService],
})
export class ConversionModule {}
