import * as Joi from 'joi';

export default () => ({
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test', 'provision')
      .default('development'),
    PORT: Joi.number().port().default(3000),
    GA4_CREDENTIALS: Joi.string(),
    GA4_SERVICE_ACCOUNT_CREDENTIALS: Joi.string().required(),
    DB_HOST: Joi.string(),
    DB_PORT: Joi.number().port().default(5432),
    DB_DATABASE: Joi.string(),
    DB_USERNAME: Joi.string(),
    DB_PASSWORD: Joi.string(),
    GA4_PROPERTY_ID: Joi.string().required(),
  }),
  validationOptions: {
    allowUnknown: false,
    abortEarly: true,
  },
  database: {
    name: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  google: {
    credentials: JSON.parse(process.env.GA4_CREDENTIALS as string),
    serviceAccountCredentials: JSON.parse(process.env.GA4_SERVICE_ACCOUNT_CREDENTIALS as string),
    analytics: {
      propertyId: process.env.GA4_PROPERTY_ID,
    }
  },
});
