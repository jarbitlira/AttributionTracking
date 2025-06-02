import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectType } from '@nestjs/graphql';

export type Ga4EventDocument = HydratedDocument<Ga4Event>;

@ObjectType()
@Schema({ timestamps: true, collection: 'GA4Event' })
export class Ga4Event {
  @Prop({ type: String, required: true })
  eventName: string;

  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: String, required: true })
  eventTimestamp: string;

  @Prop({ type: Object, required: true })
  params: Object;

  // @Prop({ type: Date, required: true })
  // createdAt: Date;

}

export const Ga4EventSchema = SchemaFactory.createForClass(Ga4Event);

Ga4EventSchema.index({ userId: 1, eventTimestamp: -1 });
