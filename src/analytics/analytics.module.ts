import { Module } from '@nestjs/common';
import { AnalyticsService } from './services/analytics.service';
import { Ga4Service } from './services/ga4.service';
import { ConfigModule } from '@nestjs/config';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsResolver } from './resolver/analytics.resolver';

@Module({
  imports: [ConfigModule],
  providers: [
    Ga4Service,
    AnalyticsService,
    AnalyticsResolver,
  ],
  exports: [AnalyticsService, AnalyticsResolver],
  controllers: [AnalyticsController],
})
export class AnalyticsModule {
}
