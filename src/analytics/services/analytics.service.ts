import { Injectable } from '@nestjs/common';
import { Ga4ClientService } from '../../ga4-events/services/ga4-client.service';
import { subDays } from 'date-fns';

@Injectable()
export class AnalyticsService {
  constructor(private readonly ga4ClientService: Ga4ClientService) {
  }

  async getGa4Events(): Promise<any> {
    return await this.ga4ClientService.getEventsReport(subDays(new Date(), 7), new Date())
      .then(response => this.ga4ClientService.parseReportResult(response));
  }
}
