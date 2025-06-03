import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ga4Event } from '../../core/schemas/ga4-event.schema';
import { Ga4ClientService } from './ga4-client.service';
import { Cron } from '@nestjs/schedule';
import { Ga4EventLogs } from '../../core/schemas/ga4-event-logs.schema';
import { differenceInDays, parse, subDays } from 'date-fns';

@Injectable()
export class Ga4EventService {
  private logger = new Logger(Ga4EventService.name);

  constructor(
    @InjectModel(Ga4Event.name)
    private ga4EventModel: Model<Ga4Event>,
    @InjectModel(Ga4Event.name)
    private ga4EventLogs: Model<Ga4EventLogs>,
    private ga4ClientService: Ga4ClientService,
  ) {
  }

  getGa4EventById(id: string): Promise<Ga4Event | null> {
    return this.ga4EventModel.findById(id);
  }

  /**
   * Get the most recent page_view event by user ID
   * @param {string} userId
   * @param {Date} conversionTimestamp
   */
  async getAttributionEvent(userId: string, conversionTimestamp: Date): Promise<Ga4Event | null> {
    return await this.ga4EventModel.findOne({
      userId,
      eventName: 'page_view',
      eventTimestamp: { $lte: conversionTimestamp },
    }).sort({ eventTimestamp: -1 }).exec();
  }

  async createGa4Event(
    eventData: Ga4Event,
  ): Promise<Ga4Event> {
    const ga4Event = new this.ga4EventModel(eventData);
    return ga4Event.save();
  }

  /**
   * Run page view event report every day at midnight
   */
  @Cron('0 0 * * *')
  async cronImportEventDataFromGa4(): Promise<void> {
    try {
      await this.importEventDataFromGa4();
    } catch (e) {
      this.logger.error(e.message);
    }
  }

  async importEventDataFromGa4(): Promise<void> {
    const today = new Date();
    const latestImport = await this.ga4EventLogs.findOne({})
      .select({ createdAt: 1 })
      .sort({ createdAt: -1 }).lean().exec();

    let latestDateImport = latestImport?.createdAt ?? subDays(new Date(), 30);

    if (differenceInDays(latestDateImport, new Date()) === 0) {
      const message = 'Events already imported for today.';
      this.logger.log(message);
      return;
    }

    this.logger.log(latestDateImport);

    return (await this.ga4ClientService.getEventsReport(latestDateImport, today)
        .then(async (result) => {
          let parsedResponse = this.ga4ClientService.parseReportResult(result);

          parsedResponse = parsedResponse.map(event => {
            return {
              eventName: event.eventName,
              userId: event.audienceId,
              eventTimestamp: parse(event.dateHourMinute, 'yyyyMMddHHmm', new Date()).toISOString(), // transform dateHourMinute to Date object.
              params: {
                utm_source: event.sessionSource,
                utm_campaign: event.sessionCampaignName,
              },
            };
          });
          const ga4EventsResult = await this.ga4EventModel.insertMany(parsedResponse);
          this.logger.log(`Imported ${ ga4EventsResult.length } GA4 events from API.`);
          return parsedResponse;
        })
    );
  }


}
