import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Ga4SeederService } from './services/ga4-seeder.service';
import { CoreModule } from '../core/core.module';
import { Ga4Event, Ga4EventSchema } from '../core/schemas/ga4-event.schema';
import { Ga4EventService } from './services/ga4-event.service';

@Module({
  imports: [
    ConfigModule,
    CoreModule,
    MongooseModule.forFeature([{ name: Ga4Event.name, schema: Ga4EventSchema }]),
  ],
  providers: [Ga4SeederService, Ga4EventService],
  exports: [Ga4SeederService, Ga4EventService],
})
export class Ga4EventsModule {
}
