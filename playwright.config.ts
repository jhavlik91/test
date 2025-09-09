import type {PlaywrightTestConfig, TraceMode} from '@playwright/test';
import {headless, recordVideo, webBrowser} from './src/config';

const traceOptions: {mode: TraceMode; screenshots: boolean; snapshots: boolean} = {
    mode: 'retain-on-failure',
    screenshots: true,
    snapshots: true,
};

const config: PlaywrightTestConfig = {
    testDir: './tests', // 👈 only use the "tests" folder
    timeout: 30_000,
    reporter: [['html', {outputFolder: './playwright-report'}]],
    retries: 1,
    use: {
        headless,
        video: recordVideo ? 'on' : 'off',
        screenshot: 'only-on-failure',
        trace: traceOptions,
        browserName: webBrowser as 'chromium' | 'firefox' | 'webkit',
    },
};

export default config;
