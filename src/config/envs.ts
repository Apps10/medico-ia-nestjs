import * as Joi from "joi";
import { config } from "dotenv";
config()

interface Env {
  DATABASE_URL: string;
  PORT: string;
}

const envSchema = Joi.object({
  DATABASE_URL: Joi.string()
    .uri()
    .required()
    .messages({
      "string.empty": "DATABASE_URL cannot be empty",
      "string.uri": "DATABASE_URL must be a valid URI",
      "any.required": "DATABASE_URL is required",
    }),
  PORT: Joi.string()
    .pattern(/^\d+$/)
    .required()
    .messages({
      "string.empty": "PORT cannot be empty",
      "string.pattern.base": "PORT must be a number",
      "any.required": "PORT is required",
    }),
})
.unknown(true);

const { error, value } = envSchema.validate(process.env, { abortEarly: false });

if(error) {
  throw new Error(`Environment variable validation error: ${error.message}`);
}

const env: Env = value;

export default env;