/**
 * Required fields are also set as nullable to skip validation at the GraphQL level.
 * Validation is still enforced at the DTO level to allow better error messages.
 */
import { Field, InputType, ObjectType } from 'type-graphql';
import { IsDateString, IsDefined, IsEmail, IsIn, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Types } from 'mongoose';

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


@ObjectType('Conversion')
export class ConversionOutput {
  @Field({ description: 'Unique identifier for the user associated with the conversion.' })
  userId: string;

  @Field({ description: 'Type of conversion event (e.g., sale, signup).' })
  conversionType: string;

  @Field({
    nullable: true,
    description: 'Hashed email address of the user.' })
  emailHash: string;

  @Field({ defaultValue: new Date().toISOString(), description: 'Timestamp of the conversion event.' })
  timestamp: Date;

  @Field({ nullable: true, description: 'The amount value attributed to the conversion.' })
  conversionValue: number;

  @Field({ nullable: true, description: 'Source attributed to the conversion.' })
  attributedSource: string;

  @Field({ nullable: true, description: 'Campaign attributed to the conversion.' })
  attributedCampaign: string;

  @Field({ description: 'Date when the conversion record was created.' })
  createdAt: Date;

  @Field({ description: 'Date when the conversion record was last updated.' })
  updatedAt: Date;

  @Field(() => String, { description: 'ObjectId of the conversion.' })
  _id: Types.ObjectId;

  @Field({
    description: 'String representation of the conversion ObjectId.',
  })
  id: string;
}
