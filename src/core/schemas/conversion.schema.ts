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
  @Field()
  conversionType: string;

  @Prop({ type: String })
  @Field()
  emailHash: string;

  @Prop({ type: Date, default: () => new Date() })
  @Field({ defaultValue: new Date() })
  timestamp: Date;

  @Prop({ type: Number })
  @Field({ nullable: true })
  conversionValue: number;

  @Prop()
  @Field({ nullable: true })
  attributedSource: string;

  @Prop()
  @Field({ nullable: true })
  attributedCampaign: string;
  @Prop({ type: Date, default: () => new Date() })
  @Field()
  createdAt: Date;
  @Prop({ type: Date, default: () => new Date() })
  @Field()
  updatedAt: Date;

  @Field(() => String)
  _id: Types.ObjectId;

  @Virtual()
  @Field()
  get id(): string {
    return this._id.toString();
  }
}

export const ConversionSchema = SchemaFactory.createForClass(Conversion);
ConversionSchema.index({ userId: 1, timestamp: -1 });
