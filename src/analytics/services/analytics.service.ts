import { Injectable } from '@nestjs/common';
import { Ga4EventService } from '../../ga4-events/services/ga4-event.service';

@Injectable()
export class AnalyticsService {
  constructor(private readonly ga4EventService: Ga4EventService) {
  }

  getGa4Events(): Promise<any> {
    return this.ga4EventService.importEventDataFromGa4();
  }
}
