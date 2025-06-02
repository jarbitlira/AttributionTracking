import { Injectable, Logger } from '@nestjs/common';
import { Conversion } from '../../core/schemas/conversion.schema';
import { ConversionInputDto } from '../dtos/conversion.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ga4EventService } from '../../ga4-events/services/ga4-event.service';
import { Ga4Event } from '../../core/schemas/ga4-event.schema';

@Injectable()
export class ConversionService {

  private readonly logger = new Logger(ConversionService.name);

  constructor(
    private readonly ga4EventService: Ga4EventService,
    @InjectModel(Conversion.name) private conversionModel: Model<Conversion>,
  ) {
  }

  getConversionById(id: string): Promise<Conversion | null> {
    return this.conversionModel.findById(id);
  }

  getConversions(): Promise<Conversion[]> {
    return this.conversionModel.find().sort({ createdAt: -1 }).exec();
  }

  async createConversion(
    conversionData: ConversionInputDto,
  ): Promise<Conversion> {
    const conversion = new this.conversionModel(conversionData);

    /**
     * Attribution logic using the Ga4Events records
     */
    await this.ga4EventService.getLatestPageViewEventByUserId(conversionData.userId)
      .then((ga4Event: Ga4Event) => {

        if (!ga4Event) {
          this.logger.warn('No page view event found for user');
          return;
        }

        const {
          utm_source: attributedSource,
          utm_campaign: attributedCampaign,
        } = ga4Event.params as any;

        /**
         * Update the conversion with the attributed source and campaign
         */
        conversion.set({
          attributedSource,
          attributedCampaign,
          timestamp: ga4Event.eventTimestamp,
        });
      });

    return conversion.save();
  }

  updateConversion(id: string, conversionData: ConversionInputDto) {
    return this.conversionModel.findByIdAndUpdate(id, conversionData, {
      new: true,
    });
  }

  deleteConversion(id: string) {
    return this.conversionModel.findByIdAndDelete(id);
  }
}
