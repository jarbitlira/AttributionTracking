import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as events from '../../../ga4-events.json';
import { Ga4Event } from '../../core/schemas/ga4-event.schema';

@Injectable()
export class Ga4SeederService {

  private readonly logger = new Logger(Ga4SeederService.name);

  constructor(
    @InjectModel(Ga4Event.name)
    private ga4EventModel: Model<Ga4Event>,
  ) {
  }

  async onModuleInit() {
    await this.seed();
  }

  async seed() {
    const existingEvents = await this.ga4EventModel.countDocuments();
    if (existingEvents > 0) {
      this.logger.log('GA4 events already seeded.');
      return;
    }

    const ga4Events = events.map(event => ({
      eventName: event.eventName,
      userId: event.userId,
      eventTimestamp: event.eventTimestamp,
      params: event.params,
    }));

    await this.ga4EventModel.insertMany(ga4Events);
    this.logger.log('GA4 events seeded successfully.');
  }

}
