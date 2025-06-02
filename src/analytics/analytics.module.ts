import { Module } from '@nestjs/common';
import { AnalyticsService } from './services/analytics.service';
import { Ga4Service } from './services/ga4.service';
import { ConfigModule } from '@nestjs/config';
import { AnalyticsController } from './controllers/analytics.controller';

@Module({
  imports: [ConfigModule],
  providers: [Ga4Service, AnalyticsService],
  exports: [AnalyticsService],
  controllers: [AnalyticsController],
})
export class AnalyticsModule {}
