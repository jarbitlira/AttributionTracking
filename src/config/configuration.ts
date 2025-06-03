import * as Joi from 'joi';
import { registerAs } from '@nestjs/config';


export const databaseConfig =
  registerAs('database', () => ({
    uri: process.env.MONGODB_URI,
  }));

export const googleConfig =
  registerAs('google', () => ({
    credentials: JSON.parse(process.env.GA4_CREDENTIALS as string),
    oauth: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
    },
    analytics: {
      propertyId: process.env.GA4_PROPERTY_ID,
    },
  }));

export const defaultConfig = () => ({
  host: process.env.HOST_URL,
  secretKey: process.env.SECRET_KEY,
});


export const configSetup = {
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test', 'provision')
      .default('development'),
    MONGODB_URI: Joi.string().required(),
    PORT: Joi.number().port().default(3000),
    HOST_URL: Joi.string().required(),
    GA4_PROPERTY_ID: Joi.string().required(),
    GA4_CREDENTIALS: Joi.string().required(),
    SECRET_KEY: Joi.string().required().default('secret'),
  }),
  validationOptions: {
    allowUnknown: true,
    abortEarly: true,
  },
  load: [
    defaultConfig,
    databaseConfig,
    googleConfig,
  ],
};

