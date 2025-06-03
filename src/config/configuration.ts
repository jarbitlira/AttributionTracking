import * as Joi from 'joi';

export default () => {
  return {
    validationSchema: Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision')
        .default('development'),
      PORT: Joi.number().port().default(3000),
      HOST_URL: Joi.string().required(),
      GA4_CREDENTIALS: Joi.string().required(),
      MONGODB_URI: Joi.string().required(),
      GA4_PROPERTY_ID: Joi.string().required(),
      SECRET_KEY: Joi.string().required().default('secret'),
    }),
    validationOptions: {
      allowUnknown: false,
      abortEarly: true,
    },
    host: process.env.HOST_URL,
    secretKey: process.env.SECRET_KEY,
    database: {
      uri: process.env.MONGODB_URI,
    },
    google: {
      credentials: JSON.parse(process.env.GA4_CREDENTIALS as string),
      oauth_client: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
      analytics: {
        propertyId: process.env.GA4_PROPERTY_ID,
      },
    },
  };
};
