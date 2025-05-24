import dotenv from 'dotenv';
import path from 'path';

// Configure dotenv to load .env file
dotenv.config({ path: path.join(process.cwd(), '.env') });

// process.cwd() gets the current working directory (CWD) of the Node.js process. This typically points to the root directory of your project.
// Combines the current working directory (process.cwd()) with the string '.env' to create the full path to the .env file.
// dotenv.config is called with the { path } option to tell dotenv where to find the .env filedotenv.config is called with the { path } option to tell dotenv where to find the .env file

export default {
  NODE_ENV:process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_solt_rounds: process.env.BCYPT_SALT_ROUNDS,
  default_pass: process.env.DEFAULT_PASS,
  jwt_access_secret:process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret:process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in:process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in:process.env.JWT_REFRESH_EXPIRES_IN,
  reset_pass_ui_link:process.env.RESET_PASS_UI_LINK
  
};
