import * as Joi from "joi";
import { config } from "dotenv";
config()

interface Env {
  DATABASE_URL: string;
  PORT: string;
  OPENAI_API_KEY: string;
  DEEPSEEK_API_KEY: string;
  GEMINI_API_KEY: string;
  JWT_SECRET: string;
}

const envSchema = Joi.object({
  DATABASE_URL: Joi.string()
    .uri()
    .required()
    .messages({
      "string.empty": "DATABASE_URL no se encuentra en el .env",
      "string.uri": "DATABASE_URL debe ser una URI valida",
      "any.required": "DATABASE_URL no se encuentra en el .env",
    }),
  PORT: Joi.string()
    .pattern(/^\d+$/)
    .required()
    .messages({
      "string.empty": "PORT no se encuentra en el .env",
      "string.pattern.base": "PORT debe ser un numero",
      "any.required": "PORT no se encuentra en el .env",
    }),
  OPENAI_API_KEY: Joi.string()
    .required()
    .messages({
      "string.empty": "OPENAI_API_KEY no se encuentra en el .env"
    }),
  DEEPSEEK_API_KEY: Joi.string()
    .required()
    .messages({
      "string.empty": "DEEPSEEK_API_KEY no se encuentra en el .env"
    }),
  GEMINI_API_KEY: Joi.string()
    .required()
    .messages({
      "string.empty": "DEEPSEEK_API_KEY no se encuentra en el .env"
    }),
  JWT_SECRET: Joi.string()
  .required()
  .messages({
    "string.empty": "JWT_SECRET no se encuentra en el .env"
  })
})
.unknown(true);

const { error, value } = envSchema.validate(process.env, { abortEarly: false });

if(error) {
  throw new Error(`Environment variable validation error: ${error.message}`);
}

const env: Env = value;

export default env;