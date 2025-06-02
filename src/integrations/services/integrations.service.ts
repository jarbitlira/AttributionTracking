import { Injectable, Logger } from '@nestjs/common';
import { Conversion } from '../../core/schemas/conversion.schema';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class IntegrationsService {

  private readonly logger = new Logger(IntegrationsService.name);

  constructor() {
  }

  /**
   * Parses a conversion to the format required by Meta (Facebook) Conversions API.
   * @param conversion
   */
  parseConversionToMetaFormat(conversion: Conversion) {
    this.logger.log("Report conversion to Meta Conversions API");
    return {
      event_name: conversion.conversionType,
      event_time: conversion.timestamp,
      user_data: {
        em: conversion.emailHash,
      },
      custom_data: {
        value: conversion.conversionValue,
        'currency': 'USD',
      },
    };
  }

  /**
   * Parses a conversion to the format required by Google Ads.
   * @param conversion
   */
  parseConversionToGoogleAdsFormat(conversion: Conversion) {
    this.logger.log("Report conversion to Google Ads API");
    return {
      conversion_id: conversion.id,
      'value': conversion.conversionValue,
      currency: 'USD',
      timestamp: conversion.timestamp,
    };
  }

  /**
   * This method is called when a conversion is created.
   * It will report the conversion to the respective platform based on the attributed source.
   * @param conversion
   */
  @OnEvent('conversion.created', { async: true })
  reportConversion(conversion: Conversion) {
    switch (conversion.attributedSource) {
      case 'google':
        this.logger.log(this.parseConversionToGoogleAdsFormat(conversion));
        break;
      case 'facebook':
        this.logger.log(this.parseConversionToMetaFormat(conversion));
        break;
      default:
        if (conversion.attributedSource)
          this.logger.log(`No integration found for source: ${ conversion.attributedSource }`);
        else
          this.logger.log('Conversion has no attributed source, skipping integration reporting.');
        break;
    }
  }
}
