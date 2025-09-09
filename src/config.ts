import {TraceMode} from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

// Browser settings (optional)
export const webBrowser = process.env.WEB_DRIVER_BROWSER || 'chromium';
export const headless = process.env.HEADLESS === 'true';

// Debug tools (optional)
export const recordVideo = process.env.RECORD_VIDEO === 'true';

// Debug tools: Trace settings (optional)
export const traceSetting = (process.env.TRACE_MODE || 'retain-on-failure') as TraceMode;
if (!['off', 'on', 'retain-on-failure', 'on-first-retry', 'on-all-retries'].includes(traceSetting)) {
    throw new Error(
        `Invalid setting for TRACE_MODE: ${traceSetting}.\n` +
            'Please use one of the following: off, on, retain-on-failure, on-first-retry, on-all-retries'
    );
}

//Base URLs
export const BASE_URL = process.env.BASE_URL || 'https://www.ima.cz/';
export const API_URL = process.env.API_URL || 'https://jsonplaceholder.typicode.com';
