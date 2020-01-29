import * as dotenv from 'dotenv';
import ProcessEnv = NodeJS.ProcessEnv;

dotenv.config();
const env: ProcessEnv = process.env;

export const environment: any = {
  // authUrl: env.MICRO_URL_AUTH,
  // commerceosFrontendUrl: env.MICRO_URL_FRONTEND_COMMERCEOS,
  // proxyUrl: env.MICRO_URL_CUSTOM_PROXY,
  //
  // defaultUserEmail: env.DEFAULT_USER_EMAIL,
  // defaultUserPass: env.DEFAULT_USER_PASS,
};
