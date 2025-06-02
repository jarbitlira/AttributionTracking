import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { parse, subDays } from 'date-fns';

import { Ga4Event } from '../../core/schemas/ga4-event.schema';
import { Ga4ClientService } from './ga4-client.service';
import { Ga4EventLogs } from '../../core/schemas/ga4-event-logs.schema';

@Injectable()
export class Ga4SeederService {

  private readonly logger = new Logger(Ga4SeederService.name);

  constructor(
    @InjectModel(Ga4Event.name)
    private ga4EventModel: Model<Ga4Event>,
    @InjectModel(Ga4EventLogs.name)
    private Ga4EventLogsModel: Model<Ga4EventLogs>,
    private ga4ClientService: Ga4ClientService,
  ) {
  }

  async onModuleInit() {
    const eventsStored = await this.validateEventsStored();

    if (!eventsStored) {
      await this.seedFromJsonFile();
      await this.seedFromGa4Api();
    }
  }

  async validateEventsStored(): Promise<boolean> {
    const existingEvents = await this.ga4EventModel.countDocuments();
    if (!!existingEvents) {
      this.logger.log('GA4 events already seeded.');
      return true;
    }

    return false;
  }

  async seedFromJsonFile() {
    try {
      this.logger.log('Seeding GA4 events from JSON file...');
      const events = await import ( '../../../ga4-events.json');
      const result = await this.ga4EventModel.insertMany(events);
      this.logger.log(`GA4 events seeded successfully from JSON. ${ result.length } records inserted.`);
    } catch (e) {
      this.logger.error('Error seeding GA4 events from JSON file:', e);
    }
  }

  async seedFromGa4Api(): Promise<void> {
    const today = new Date();
    const startDate = subDays(today, 30);

    const rawResponse = await this.ga4ClientService.getEventsReport(startDate, today);
    let parsedResponse = this.ga4ClientService.parseReportResult(rawResponse);
    parsedResponse = parsedResponse.map(event => {
      return {
        eventName: event.eventName,
        userId: event.audienceId,
        eventTimestamp: parse(event.dateHourMinute, 'yyyyMMddHHmm', new Date()), // transform dateHourMinute to Date object.
        params: event.params,
      };
    });

    const result = await this.ga4EventModel.insertMany(parsedResponse);

    await this.Ga4EventLogsModel.insertOne({
      rawResponse: rawResponse,
      parsedResponse: parsedResponse,
    });

    this.logger.log(`GA4 events seeded successfully from API. ${ result.length } records inserted.`);
  }

}
