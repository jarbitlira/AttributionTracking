import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ga4Event } from '../../core/schemas/ga4-event.schema';

@Injectable()
export class Ga4EventService {

  constructor(
    @InjectModel(Ga4Event.name)
    private ga4EventModel: Model<Ga4Event>,
  ) {
  }

  getGa4EventById(id: string): Promise<Ga4Event | null> {
    return this.ga4EventModel.findById(id);
  }

  /**
   * Get the most recent page_view event by user ID
   * @param userId
   * @param conversionTimestamp
   */
  async getAttributionPageViewEventByUserId(userId: string, conversionTimestamp: Date): Promise<Ga4Event | null> {
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
}
