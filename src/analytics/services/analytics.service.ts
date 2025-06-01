import { Injectable } from '@nestjs/common';
import { Ga4Service } from './ga4.service';

@Injectable()
export class AnalyticsService {
  constructor(private readonly ga4Service: Ga4Service) {
  }

  async getPageViewEvents(): Promise<any> {
    return  await this.ga4Service.runPageViewReport();
  }
}
