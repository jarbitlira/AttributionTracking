import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { createHmac } from 'node:crypto';

@Injectable()
export class HashingService {
  private secretKey: string;

  constructor(private readonly configService: ConfigService) {
    this.secretKey = this.configService.get<string>('secretKey') as string;
  }

  hashValue(value: string): string {
    return createHmac(
      'sha256',
      this.secretKey,
    )
      .update(value)
      .digest('hex');
  }

}
