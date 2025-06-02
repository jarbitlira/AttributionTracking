import { Field, InputType } from '@nestjs/graphql';
import { Min, IsNumber, IsDateString } from 'class-validator';

@InputType('ConversionInput')
export class ConversionInputDto {
  @Field()
  userId: string;

  @Field()
  email: string;

  @Field()
  conversionType: string;

  @Field({ nullable: true })
  @IsNumber()
  @Min(0)
  conversionValue: number;

  @Field()
  @IsDateString()
  timestamp: string;
}
