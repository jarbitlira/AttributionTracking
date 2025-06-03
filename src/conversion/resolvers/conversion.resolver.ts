import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { ConversionInputDto, ConversionOutput } from '../dtos/conversion.dto';
import { ConversionService } from '../services/conversion.service';
import { Conversion } from '../../core/schemas/conversion.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UsePipes, ValidationPipe } from '@nestjs/common';

@Resolver(() => Conversion)
export class ConversionResolver {
  constructor(
    private readonly conversionService: ConversionService,
    private eventEmitter: EventEmitter2,
  ) {
  }

  @Query(() => ConversionOutput, {
    name: 'conversion',
    description: 'Get a conversion by ID',
    nullable: true,
  })
  async getConversionById(
    @Arg('id', () => String) id: string,
  ): Promise<Conversion | null> {
    return await this.conversionService.getConversionById(id);
  }

  @Query(() => [ConversionOutput], {
    name: 'conversions',
    description: 'Get all conversions',
    nullable: true,
  })
  async conversions() {
    return await this.conversionService.getConversions();
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Mutation(() => ConversionOutput)
  async createConversion(
    @Arg('conversion', () => ConversionInputDto)
    conversion: ConversionInputDto,
  ): Promise<ConversionOutput> {
    const newConversion = await this.conversionService.createConversion(conversion);
    // Emit an event after creating a conversion to notify other parts of the application
    this.eventEmitter.emit('conversion.created', newConversion);
    return newConversion;
  }
}
