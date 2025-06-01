import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnalyticsModule } from './analytics/analytics.module';
import { CoreModule } from './core/core.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    AnalyticsModule,
    CoreModule,
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
