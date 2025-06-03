import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Field, ObjectType } from 'type-graphql';

export type ConversionDocument = HydratedDocument<Conversion>;

@Schema({ timestamps: true })
export class Conversion {
  @Prop(String)
  userId: string;

  @Prop(String)
  conversionType: string;

  @Prop({ type: String, nullable: true })
  emailHash: string;

  @Prop({ type: Date, default: () => new Date().toISOString() })
  timestamp: Date;

  @Prop({ type: Number })
  conversionValue: number;

  @Prop()
  attributedSource: string;

  @Prop()
  attributedCampaign: string;

  createdAt: Date;

  updatedAt: Date;

  _id: Types.ObjectId;

  @Virtual()

  get id(): string {
    return this._id?.toString();
  }
}

export const ConversionSchema = SchemaFactory.createForClass(Conversion);
ConversionSchema.index({ userId: 1, timestamp: -1 });
