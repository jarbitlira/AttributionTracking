import { Injectable } from '@nestjs/common';
import { Ga4Service } from './ga4.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AnalyticsService {
  constructor(private readonly ga4Service: Ga4Service) {}

  /**
   * Run page view event report each 30 seconds
   */
  @Cron('*/30 * * * * *')
  async runPageViewEvents(): Promise<void> {
    await this.getPageViewEvents().then((result) => {
      console.log(result);
    });
  }

  async getPageViewEvents(): Promise<any> {
    return await this.ga4Service.runPageViewReport();
  }
}
