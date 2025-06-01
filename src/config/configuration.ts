import * as Joi from 'joi';

export default () => {
  return {
    validationSchema: Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision')
        .default('development'),
      PORT: Joi.number().port().default(3000),
      GA4_CREDENTIALS: Joi.string(),
      GA4_SERVICE_ACCOUNT_CREDENTIALS: Joi.string().required(),
      MONGODB_URI: Joi.string().required(),
      GA4_PROPERTY_ID: Joi.string().required(),
      SECRET_KEY: Joi.string().required().default('secret'),
    }),
    validationOptions: {
      allowUnknown: false,
      abortEarly: true,
    },
    secretKey: process.env.SECRET_KEY,
    database: {
      uri: process.env.MONGODB_URI,
    },
    google: {
      credentials: JSON.parse(process.env.GA4_CREDENTIALS as string),
      serviceAccountCredentials: JSON.parse(
        process.env.GA4_SERVICE_ACCOUNT_CREDENTIALS as string,
      ),
      analytics: {
        propertyId: process.env.GA4_PROPERTY_ID,
      },
    },
  };
};
