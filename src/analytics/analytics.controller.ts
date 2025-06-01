import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AnalyticsService } from './services/analytics.service';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';

// import { OAuth2Client } from 'google-auth-library';


@Controller('analytics')
export class AnalyticsController {
  private oAuth2Client: OAuth2Client;

  constructor(private readonly analyticsService: AnalyticsService,
    private readonly configService: ConfigService) {
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
  async authenticated(@Query() params) {
    const { code } = params;
    const result = await this.oAuth2Client.getToken(code);
    this.oAuth2Client.setCredentials(result.tokens);
    return result.tokens;
  }

  @Get('page-view-events')
  pageViewEvents() {
    return this.analyticsService.getPageViewEvents();
  }


}
