import * as Joi from 'joi';

export default () => ({
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test', 'provision')
      .default('development'),
    PORT: Joi.number().port().default(3000),
  }),
  validationOptions: {
    allowUnknown: false,
    abortEarly: true,
  },
  database: {
    name: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
});
