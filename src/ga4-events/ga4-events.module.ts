import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Ga4SeederService } from './services/ga4-seeder.service';
import { CoreModule } from '../core/core.module';
import { Ga4EventService } from './services/ga4-event.service';
import { Ga4ClientService } from './services/ga4-client.service';

@Module({
  imports: [
    ConfigModule,
    CoreModule,
    MongooseModule,
  ],
  providers: [Ga4ClientService, Ga4SeederService, Ga4EventService],
  exports: [Ga4ClientService, Ga4SeederService, Ga4EventService],
})
export class Ga4EventsModule {
}
