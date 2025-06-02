import { Controller, Get, HttpException, HttpStatus, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import { AnalyticsService } from '../services/analytics.service';
import { Ga4ClientService } from '../../ga4-events/services/ga4-client.service';
import { subDays } from 'date-fns';

@Controller('analytics')
export class AnalyticsController {
  private oAuth2Client: OAuth2Client;

  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly ga4ClientService: Ga4ClientService,
    private readonly configService: ConfigService,
  ) {
    this.oAuth2Client = new OAuth2Client(
      this.configService.get('google.credentials.client_id'),
      this.configService.get('google.credentials.client_secret'),
      this.configService.get('google.credentials.redirect_uris')[0],
    );
  }

  @Get()
  auth(@Res() res: Response) {
    const authorizationUrl = this.oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/analytics',
        'https://www.googleapis.com/auth/analytics.readonly',
      ],
    });

    res.redirect(authorizationUrl);
  }

  @Get('authenticated')
  async authenticated(@Query() params: { code: string }) {
    const today = new Date();
    const startDate = subDays(today, 30);

    const { code } = params;
    const result = await this.oAuth2Client.getToken(code);
    this.oAuth2Client.setCredentials(result.tokens);
    // const auth = new GoogleAuth({ authClient: this.oAuth2Client });
    // this.ga4ClientService.initClient(auth);
    const response = this.ga4ClientService.getEventsReport(startDate, today, this.oAuth2Client);
    // const response = this.ga4ClientService.getEventsReport(this.oAuth2Client);
    return this.ga4ClientService.parseReportResult(response);
  }

  @Get('page-view-events')
  async pageViewEvents(@Res() res: Response) {
    try {
      return await this.analyticsService.getGa4Events();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.ALREADY_REPORTED);
    }
  }
}
