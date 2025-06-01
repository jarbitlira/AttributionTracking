import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AnalyticsResolver {

  constructor() {
  }

  @Query(() => String)
  async pageViewEvents(): Promise<String> {
    return 'This is a placeholder for the page view events query.';
  }
}
