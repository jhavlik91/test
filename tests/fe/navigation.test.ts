import {test, expect} from '@playwright/test';
import {BASE_URL} from '../../src/config';
import {reference, vyzkumVyvoj, vyvojNaZakazku} from '../../src/locators/selectors';

test.describe('Navigation: Main Menu', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(BASE_URL);
        await page.waitForLoadState('domcontentloaded');
    });

    test(
        'Case 1: User can navigate to the "Reference" page via the main menu',
        {tag: '@navigation @smoke'},
        async ({page}) => {
            await page.locator(reference).click();

            expect(page.url()).toBe(`${BASE_URL}reference/`);

            const h1 = page.locator('h1');
            await expect(h1).toHaveText('Staráme se o víc než 3000 klientů v Česku i ve světě.');
        }
    );

    test(
        'Case 2: User can navigate to the "Vývoj na zakázku" page via the mega menu',
        {tag: '@navigation @smoke'},
        async ({page}) => {
            const vyvojNaZakazkuLink = page.getByRole(vyvojNaZakazku.role, {name: vyvojNaZakazku.name});
            await page.locator(vyzkumVyvoj).hover();
            await expect(vyvojNaZakazkuLink).toBeVisible();
            await vyvojNaZakazkuLink.click();

            expect(page.url()).toBe(`${BASE_URL}vyzkum-a-vyvoj/vyvoj-na-zakazku/`);

            const h1 = page.locator('h1');
            await expect(h1).toHaveText('Vývoj na zakázku');
        }
    );
});
