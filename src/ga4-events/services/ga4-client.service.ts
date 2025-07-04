import { Injectable, Logger } from '@nestjs/common';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { ConfigService } from '@nestjs/config';
import { format } from 'date-fns';

@Injectable()
export class Ga4ClientService {
  private analyticsDataClient: BetaAnalyticsDataClient;
  private logger: Logger = new Logger(Ga4ClientService.name);

  constructor(private configService: ConfigService) {
    this.initClient();
  }

  initClient(auth: any = undefined) {
    this.analyticsDataClient = auth
      ? new BetaAnalyticsDataClient({ authClient: auth as any })
      : new BetaAnalyticsDataClient({
        credentials: this.configService.get(
          'google.credentials',
        ),
      });
  }

  parseReportResult(reportResult: any) {
    const headers =
      reportResult.dimensionHeaders?.map((header) => header.name) ?? [];
    return reportResult.rows?.map((row) => {
      return row.dimensionValues?.reduce((dimension, item, index) => {
        let key = headers[index] as string;
        let value = item.value;
        return {
          ...dimension,
          [key]: value,
        };
      }, {});
    });
  }

  async getEventsReport(
    startDate: Date,
    endDate: Date,
    auth: any = undefined): Promise<any> {
    if (auth) {
      this.initClient(auth);
    }

    if (!startDate || !endDate) {
      throw new Error('Both startDate and endDate are required.');
    }
    if (startDate > endDate) {
      throw new Error('startDate must be before or equal to endDate.');
    }

    try {
      const [reportResult] = await this.analyticsDataClient.runReport({
        property: `properties/${ this.configService.get('google.analytics.propertyId') }`,
        dimensions: [
          { name: 'eventName' },
          // { name: 'userId' },
          // { name: 'userPseudoId' },
          { name: 'sessionSource' },         // utm_source
          { name: 'sessionMedium' },         // utm_medium
          { name: 'sessionCampaignName' },   // utm_campaign
          { name: 'dateHourMinute' },
          { name: 'pagePath' },
          { name: 'audienceId' }, // Audience ID will simulate the userId
        ],
        dateRanges: [
          {
            startDate: format(startDate, 'yyyy-MM-dd'),
            endDate: format(endDate, 'yyyy-MM-dd'),
          },
        ],
        metrics: [{ name: 'eventCount' }],
        dimensionFilter: {
          filter: {
            fieldName: 'eventName',
            // stringFilter: { value: 'purchase', matchType: 'EXACT' },
            inListFilter: {
              values: ['purchase', 'page_view', 'session_start', 'first_visit', 'click'],
            },
          },
        },
      });
      return reportResult;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
