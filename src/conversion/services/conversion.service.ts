import { Injectable } from '@nestjs/common';
import { Conversion } from '../../core/schemas/conversion.schema';
import { ConversionInputDto } from '../dtos/conversion.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ConversionService {
  constructor(
    @InjectModel(Conversion.name)
    private conversionModel: Model<Conversion>,
  ) {}

  getConversionById(id: string): Promise<Conversion | null> {
    return this.conversionModel.findById(id);
  }

  getConversions(): Promise<Conversion[]> {
    return this.conversionModel.find().exec();
  }

  async createConversion(
    conversionData: ConversionInputDto,
  ): Promise<Conversion> {
    const conversion = new this.conversionModel(conversionData);
    return conversion.save();
  }

  updateConversion(id, conversionData: ConversionInputDto) {
    return this.conversionModel.findByIdAndUpdate(id, conversionData, {
      new: true,
    });
  }

  deleteConversion(id) {
    return this.conversionModel.findByIdAndDelete(id);
  }
}
