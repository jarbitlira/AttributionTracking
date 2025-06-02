import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ConversionInputDto } from '../dtos/conversion.dto';
import { ConversionService } from '../services/conversion.service';
import { Conversion } from '../../core/schemas/conversion.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Resolver(() => Conversion)
export class ConversionResolver {
  constructor(
    private readonly conversionService: ConversionService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Query(() => Conversion, {
    name: 'conversion',
    description: 'Get a conversion by ID',
    nullable: true,
  })
  async getConversionById(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Conversion | null> {
    return await this.conversionService.getConversionById(id);
  }

  @Query(() => [Conversion], {
    name: 'conversions',
    description: 'Get all conversions',
    nullable: true,
  })
  async conversions() {
    return await this.conversionService.getConversions();
  }

  @Mutation(() => Conversion)
  async createConversion(
    @Args('conversion', {
      type: () => ConversionInputDto,
    })
    conversion: ConversionInputDto,
  ): Promise<any> {
    const newConversion = await this.conversionService.createConversion(conversion);
    // Emit an event after creating a conversion to notify other parts of the application
    this.eventEmitter.emit('conversion.created', newConversion);
    return newConversion;
  }
}
