import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnalyticsModule } from './analytics/analytics.module';
import { CoreModule } from './core/core.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule, GraphQLTimestamp } from '@nestjs/graphql';
import { ConversionModule } from './conversion/conversion.module';
import { Ga4EventsModule } from './ga4-events/ga4-events.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { SentryModule } from '@sentry/nestjs/setup';
import { configSetup } from './config/configuration';
import { TypeGraphQLModule } from 'typegraphql-nestjs';

@Module({
  imports: [
    SentryModule.forRoot(),
    ConfigModule.forRoot(
      {
        ...configSetup,
        isGlobal: true,
      },
    ),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    AnalyticsModule,
    CoreModule,
    DatabaseModule,
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: true,
    // }),

    TypeGraphQLModule.forRoot({
      driver: ApolloDriver,
      emitSchemaFile: true,
      scalarsMap: [{ type: Date, scalar: GraphQLTimestamp }],
    }),

    ConversionModule,
    Ga4EventsModule,
    IntegrationsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {
}
