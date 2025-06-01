import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

export type ConversionDocument = HydratedDocument<Conversion>;

@ObjectType()
@Schema({ timestamps: true })
export class Conversion {

  @Prop(String)
  @Field()
  userId: string;
  @Prop(String)
  @Field({ nullable: true })
  conversionType: string;
  @Prop({ type: String })
  @Field({ nullable: true })
  emailHash: string;
  @Prop({ type: Date })
  @Field()
  timestamp: Date;
  @Prop()
  @Field()
  attributedSource: String;
  @Prop()
  @Field()
  attributedCampaign: String;

  @Prop(Types.ObjectId)
  @Field()
  _id: string;

  @Virtual()
  @Field()
  get id(): string {
    return this._id.toString();
  }
}

export const ConversionSchema = SchemaFactory.createForClass(Conversion);
