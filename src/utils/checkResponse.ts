import type {APIResponse} from '@playwright/test';

type SuccessResponse = {id?: string; [key: string]: unknown};
type ErrorResponse = {message?: string; [key: string]: unknown};
type ParsedResponse = SuccessResponse | ErrorResponse | null;

/**
 * Validate API response status, timing, and report payload length.
 *
 * - Throws with details when status != expected (includes response length).
 * - If duration provided:
 *    - warns when >= somewhatOk (default 500 ms) and < notOkAtAll (default 1000 ms)
 *    - throws when >= notOkAtAll
 * - On success, logs a concise summary incl. length (bytes) and duration.
 */
export async function checkResponse(
    response: APIResponse,
    expectedStatus: number,
    url?: string,
    requestPayload?: unknown,
    requestDurationMs?: number,
    thresholds: {somewhatOk?: number; notOkAtAll?: number} = {}
): Promise<ParsedResponse> {
    const {somewhatOk = 500, notOkAtAll = 1000} = thresholds;

    const statusCode = response.status();
    const bodyBuffer = await response.body();
    const responseLengthBytes = bodyBuffer.length;
    const bodyText = bodyBuffer.toString();

    let parsed: ParsedResponse = null;
    try {
        parsed = JSON.parse(bodyText);
    } catch {
        // Non-JSON; keep as null
    }

    if (statusCode !== expectedStatus) {
        const errorDetails =
            `Failed with ${statusCode} expected: ${expectedStatus}t \n` +
            `URL: ${url ?? '(unknown)'}\n` +
            `Response length (bytes): ${responseLengthBytes}\n` +
            `Request duration (ms): ${typeof requestDurationMs === 'number' ? requestDurationMs : 'N/A'}\n` +
            `Error body: ${truncate(bodyText, 800)}\n` +
            `Request data: ${safeStringify(requestPayload)}\n`;
        throw new Error(errorDetails);
    }

    if (typeof requestDurationMs === 'number') {
        if (requestDurationMs >= notOkAtAll) {
            throw new Error(
                `Request too slow: ${requestDurationMs} ms (limit ${notOkAtAll} ms). URL: ${
                    url ?? '(unknown)'
                } | Length: ${responseLengthBytes} B`
            );
        } else if (requestDurationMs >= somewhatOk) {
            console.warn(
                `Slow-ish response: ${requestDurationMs} ms (warn ≥ ${somewhatOk} ms) | ${
                    url ?? '(unknown)'
                } | Length: ${responseLengthBytes} B`
            );
        }
    }

    console.info(
        `Passed[${statusCode}] ${url ?? '(unknown)'} | Duration: ${
            typeof requestDurationMs === 'number' ? `${requestDurationMs} ms` : 'N/A'
        } | Length: ${responseLengthBytes} B`
    );

    return parsed;
}

// Helpers
function truncate(text: string, max = 500): string {
    return text.length > max ? text.slice(0, max) + `… [truncated ${text.length - max} chars]` : text;
}

function safeStringify(value: unknown): string {
    try {
        return JSON.stringify(value, null, 2);
    } catch {
        return String(value);
    }
}
