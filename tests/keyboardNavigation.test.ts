import {test, expect} from '@playwright/test';
import {BASE_URL} from '../src/config';
import {coDelame} from '../src/locators/selectors';

test.describe('Menu keyboard focus', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(BASE_URL);
        await page.waitForLoadState('domcontentloaded');
    });

    test('First menu item is keyboard focusable', async ({page}) => {
        await page.keyboard.press('Tab');

        await expect(page.locator(coDelame)).toBeFocused();
    });
});
