import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Conversion } from '../schemas/conversion.schema';
import { ConversionInputDto } from '../dtos/conversion.dto';

@Resolver(() => Conversion)
export class ConversionResolver {

  constructor() {
  }

  @Query(() => Conversion)
  async conversion(@Args('id', { type: () => String }) id) {
    throw new Error('Not implemented');
  }

  @Mutation(() => Conversion)
  async createConversion(
    @Args('conversion', {
      type: () => ConversionInputDto,
    }) conversion: ConversionInputDto): Promise<any> {
    return {};
  }


}
