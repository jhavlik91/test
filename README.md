# Playwright Test Automation

This project is a robust, Playwright-based test automation framework designed to handle both E2E (End-to-End) and API testing for web applications. With a focus on scalability and maintainability, it features a highly configurable structure to adapt to any project's needs.

### Project Structure

The project is structured to separate different components of the testing framework for clarity.

-   **`src`**: Contains all reusable code and configurations.

    -   `locators`: Stores selectors and locators to centralize maintenance.
    -   `types`: Defines TypeScript interfaces and types for strong type checking.
    -   `utils`: Houses utility functions for tasks like API requests and response validation.
    -   `config.ts`: Central configuration file for environment variables and settings.

-   **`tests`**: This is where all the test files are located.

    -   `be`: Contains backend-focused tests, such as API tests.
    -   `fe`: Contains frontend-focused tests, such as UI and E2E tests.

-   **`playwright.config.ts`**: The main configuration file for Playwright's test runner.
-   **`.prettierrc`**: Code formatting rules.
-   **`.eslintrc`**: ESLint configuration for code quality.

### Installation

To set up the project on your local machine, ensure you have Git and Node.js installed.

1.  **Clone the repository:**
2.  **Install dependencies:** This command installs all the necessary packages defined in `package.json`.
3.  **Install Playwright browsers:** This command downloads the browser binaries (Chromium, Firefox, WebKit) required by Playwright to run tests.

### Environment Variables

The framework uses environment variables for flexible configuration. Create a `.env` file in the project root to store your settings. You can find examples of these in `playwright.config.ts`.

### Running Tests

Tests can be executed using `npm test` or the Playwright CLI.

-   **Run all tests:**
-   **Run a specific test file:**
-   **Run tests with a specific tag:** Tests in this project can be tagged. You can run only the API tests by using the `@api` tag.

    This command runs all tests that have the `@api` tag. You can use other tags as well.

-   **Run tests in UI Mode:** The Playwright UI Mode provides a visual way to run and debug tests.
-   **Run tests with debugging:** To open the Playwright Inspector and pause the test for debugging, use the `--debug` flag.

    You can also use `page.pause()` in your code to pause the test at a specific point.

### Code Quality

This project uses ESLint and TypeScript for code quality and type checking.

-   **Code check:** Run a full code quality check locally before committing your changes.
-   **Linting:** Manually run the linter to check for style and coding errors.
-   **Formatting:** The project uses Prettier for consistent code formatting. It is recommended to use a Prettier plugin in your IDE to automatically format files on save.
