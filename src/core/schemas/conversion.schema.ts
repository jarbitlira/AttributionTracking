import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

export type ConversionDocument = HydratedDocument<Conversion>;

@Schema({ timestamps: true })
@ObjectType('Conversion')
export class Conversion {
  @Prop(String)
  @Field({ description: 'Unique identifier for the user associated with the conversion.' })
  userId: string;

  @Prop(String)
  @Field({ description: 'Type of conversion event (e.g., sale, signup).' })
  conversionType: string;

  @Prop({ type: String, nullable: true })
  @Field({ description: 'Hashed email address of the user.', nullable: true })
  emailHash: string;

  @Prop({ type: Date, default: () => new Date().toISOString() })
  @Field({ defaultValue: new Date().toISOString(), description: 'Timestamp of the conversion event.' })
  timestamp: Date;

  @Prop({ type: Number })
  @Field({ nullable: true, description: 'The amount value attributed to the conversion.' })
  conversionValue: number;

  @Prop()
  @Field({ nullable: true, description: 'Source attributed to the conversion.' })
  attributedSource: string;

  @Prop()
  @Field({ nullable: true, description: 'Campaign attributed to the conversion.' })
  attributedCampaign: string;

  @Field({ description: 'Date when the conversion record was created.' })
  createdAt: Date;

  @Field({ description: 'Date when the conversion record was last updated.' })
  updatedAt: Date;

  @Field(() => String, { description: 'ObjectId of the conversion.' })
  _id: Types.ObjectId;

  @Virtual()
  @Field({ description: 'String representation of the conversion ObjectId.' })
  get id(): string {
    return this._id.toString();
  }
}

export const ConversionSchema = SchemaFactory.createForClass(Conversion);
ConversionSchema.index({ userId: 1, timestamp: -1 });
