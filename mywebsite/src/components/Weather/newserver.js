import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Simulate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load the .env file
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

console.log('API Key:', process.env.WEATHER_API || 'Not Found');

