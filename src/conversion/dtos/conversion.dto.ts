/**
 * Required fields are also set as nullable to skip validation at the GraphQL level.
 * Validation is still enforced at the DTO level to allow better error messages.
 */
import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsDefined, IsEmail, IsIn, IsNotEmpty, IsNumber, Min } from 'class-validator';

@InputType('ConversionInput')
export class ConversionInputDto {
  @Field({
    nullable: true,
    description: 'Unique identifier for the user associated with the conversion.',
  })
  @IsNotEmpty()
  @IsDefined()
  userId: string;

  @Field({
    nullable: true,
    description: 'Email address of the user. Must be a valid email format.',
  })
  @IsEmail()
  email: string;

  @Field({
    nullable: true,
    description: 'Type of conversion event (e.g., sale, lead, signup, purchase, other).',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsIn(['sale', 'lead', 'signup', 'purchase', 'other'])
  conversionType: string;

  @Field({
    nullable: true,
    description: 'The amount value attributed to the conversion.',
  })
  @IsNumber()
  @Min(0)
  conversionValue: number;

  @Field({
    nullable: true,
    description: 'Timestamp of the conversion event in ISO date string format.',
  })
  @IsDefined()
  @IsDateString()
  timestamp: string;
}
