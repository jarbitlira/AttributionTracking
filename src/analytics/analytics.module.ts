import { Module } from '@nestjs/common';
import { AnalyticsService } from './services/analytics.service';
import { ConfigModule } from '@nestjs/config';
import { AnalyticsController } from './controllers/analytics.controller';
import { Ga4EventsModule } from '../ga4-events/ga4-events.module';

@Module({
  imports: [ConfigModule, Ga4EventsModule],
  providers: [ AnalyticsService],
  exports: [AnalyticsService],
  controllers: [AnalyticsController],
})
export class AnalyticsModule {}
