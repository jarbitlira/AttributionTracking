import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Ga4SeederService } from './services/ga4-seeder.service';
import { CoreModule } from '../core/core.module';
import { Ga4Event, Ga4EventSchema } from '../core/schemas/ga4-event.schema';

@Module({
  imports: [
    ConfigModule,
    CoreModule,
    // MongooseModule.forFeature(),
    MongooseModule.forFeature([{ name: Ga4Event.name, schema: Ga4EventSchema }]),
  ],
  providers: [Ga4SeederService],
  exports: [Ga4SeederService],
})
export class Ga4EventsModule {
}
