import { Injectable } from '@nestjs/common';

import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { ConfigService } from '@nestjs/config';
import { format, subDays } from 'date-fns';
import { google } from '@google-analytics/data/build/protos/protos';
import IRunReportResponse = google.analytics.data.v1beta.IRunReportResponse;

@Injectable()
export class Ga4Service {

  private analyticsDataClient: BetaAnalyticsDataClient;

  constructor(private configService: ConfigService) {
    this.initClient();
  }

  initClient(auth = undefined) {
    this.analyticsDataClient = new BetaAnalyticsDataClient((auth ? {
        authClient: auth,
      } :
      { credentials: this.configService.get('google.serviceAccountCredentials') }));
  }

  parseReportResult(reportResult: IRunReportResponse) {
    const headers = reportResult.dimensionHeaders?.map(header => header.name) ?? [];
    return reportResult.rows?.map(row => {
      return row.dimensionValues?.reduce((dimension, item, index) => {
        const key = headers[index] as string;
        return {
          ...dimension,
          [key]: item.value,
        };

      }, {});
    });
  }


  async runPageViewReport(): Promise<any> {
    this.initClient();
    const today = new Date();

    const [reportResult] = await this.analyticsDataClient.runReport({
      property: `properties/${ this.configService.get('google.analytics.propertyId') }`,
      dimensions: [{ name: 'eventName' }, { name: 'dateHourMinute' }, { name: 'pagePath' }],
      dateRanges: [
        {
          startDate: format(subDays(today, 7), 'yyyy-MM-dd'),
          endDate: format(today, 'yyyy-MM-dd'),
        },
      ],
      metrics: [{ name: 'eventCount' }],
      dimensionFilter: {
        filter: {
          fieldName: 'eventName',
          stringFilter: { value: 'page_view' },
        },
      },
    });


    return this.parseReportResult(reportResult);
  }
}
