import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnalyticsModule } from './analytics/analytics.module';
import { CoreModule } from './core/core.module';
import { DatabaseModule } from './database/database.module';
import { GraphQlModule } from './graph-ql/graph-ql.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    AnalyticsModule, CoreModule, DatabaseModule, GraphQlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
