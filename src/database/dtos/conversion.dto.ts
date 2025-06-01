import { Field, InputType } from '@nestjs/graphql';

@InputType('ConversionInput')
export class ConversionInputDto {
  @Field()
  userId: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  conversionType: string;

  @Field({ nullable: true })
  timestamp: string;

  // createdAt: Date;
  // updatedAt: Date;
}

