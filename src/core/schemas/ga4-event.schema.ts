import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectType } from 'type-graphql';

export type Ga4EventDocument = HydratedDocument<Ga4Event>;

@ObjectType()
@Schema({ timestamps: true, collection: 'ga4_events' })
export class Ga4Event {
  @Prop({ type: String, required: true })
  eventName: string;

  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: Date, required: true })
  eventTimestamp: Date;

  @Prop(raw({
    utm_source: { type: String, required: false },
    utm_campaign: { type: String, required: false },
  }))
  params: {
    utm_source: { type: String, required: false },
    utm_campaign: { type: String, required: false },
  };

  createdAt: Date;
  updatedAt: Date;
}

export const Ga4EventSchema = SchemaFactory.createForClass(Ga4Event);

Ga4EventSchema.index({ userId: 1, eventTimestamp: -1 });
Ga4EventSchema.index({ userId: 1, eventName: 1, eventTimestamp: -1 });
