import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  main(): string {
    return 'GrowthOptix Attribution Tracking API!';
  }
}
