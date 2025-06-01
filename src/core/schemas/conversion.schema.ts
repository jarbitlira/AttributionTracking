import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

export type ConversionDocument = HydratedDocument<Conversion>;

@Schema({ timestamps: true })
@ObjectType('Conversion')
export class Conversion {
  @Prop(String)
  @Field()
  userId: string;

  @Prop(String)
  @Field({ nullable: true })
  conversionType: string;

  @Prop({ type: String })
  @Field()
  emailHash: string;

  @Prop({ type: Date })
  @Field({ nullable: true })
  timestamp: Date;

  @Prop()
  @Field({ nullable: true })
  attributedSource: string;

  @Prop()
  @Field({ nullable: true })
  attributedCampaign: string;

  @Field(() => String)
  _id: Types.ObjectId;

  @Virtual()
  @Field()
  get id(): string {
    return this._id.toString();
  }

  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}

export const ConversionSchema = SchemaFactory.createForClass(Conversion);
