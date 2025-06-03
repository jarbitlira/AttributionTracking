import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectType } from '@nestjs/graphql';

export type Ga4EventLogsDocument = HydratedDocument<Ga4EventLogs>;

/**
 * Schema for Google Analytics 4 (GA4) event logs.
 * This schema captures events such as page views, conversions, and other user interactions.
 * It stores the responses from GA4, including user identifiers, event names, timestamps, and parameters.
 */
@ObjectType()
@Schema({ timestamps: true, collection: 'ga4_events_logs' })
export class Ga4EventLogs {
  _id: string;

  @Prop({ type: Object, required: true })
  parsedResponse: object;

  @Prop({ type: Array<object>, required: true })
  rawResponse: Array<object>;

  createdAt: Date;
  updatedAt: Date;
}

export const Ga4EventLogsSchema = SchemaFactory.createForClass(Ga4EventLogs);
