import {test, type APIRequestContext, type APIResponse} from '@playwright/test';
import {checkResponse} from './checkResponse';

export type ApiThresholds = {somewhatOk?: number; notOkAtAll?: number};
export type ApiHttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type ApiRequestOptions<TRequest = unknown> = {
    data?: TRequest;
    headers?: {[key: string]: string};
    expectedStatus?: number;
    thresholds?: ApiThresholds;
};

export type ApiResponseSummary<TResponse> = {
    json: TResponse | null;
    durationMs: number;
    response: APIResponse;
};

function defaultExpectedStatus(method: ApiHttpMethod): number {
    return method === 'POST' ? 201 : 200;
}

type RequestFunction = (
    url: string,
    options?: {data?: unknown; headers?: {[key: string]: string}}
) => Promise<APIResponse>;

/** Typed, trace-visible JSON request (no `any`). */
export async function sendJsonRequest<TResponse = unknown, TRequest = unknown>(
    apiRequestContext: APIRequestContext,
    httpMethod: ApiHttpMethod,
    url: string,
    options: ApiRequestOptions<TRequest> = {}
): Promise<ApiResponseSummary<TResponse>> {
    const {data, headers, thresholds, expectedStatus} = options;

    return await test.step(`API ${httpMethod} ${url}`, async () => {
        const requestStart = typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now();

        const methodMap: {GET: RequestFunction; POST: RequestFunction; PUT: RequestFunction; DELETE: RequestFunction} =
            {
                GET: (u, o) => apiRequestContext.get(u, o),
                POST: (u, o) => apiRequestContext.post(u, o),
                PUT: (u, o) => apiRequestContext.put(u, o),
                DELETE: (u, o) => apiRequestContext.delete(u, o),
            };

        const callRequest = methodMap[httpMethod];
        const response = await callRequest(url, {data, headers});

        const requestEnd = typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now();
        const durationMs = Math.round(requestEnd - requestStart);

        const expected = expectedStatus ?? defaultExpectedStatus(httpMethod);
        const json = (await checkResponse(response, expected, url, data, durationMs, thresholds)) as TResponse | null;

        return {json, durationMs, response};
    });
}

export const getJsonRequest = <TResponse = unknown>(
    apiRequestContext: APIRequestContext,
    url: string,
    options?: ApiRequestOptions<never>
) => sendJsonRequest<TResponse, never>(apiRequestContext, 'GET', url, options);

export const postJsonRequest = <TResponse = unknown, TRequest = unknown>(
    apiRequestContext: APIRequestContext,
    url: string,
    options?: ApiRequestOptions<TRequest>
) => sendJsonRequest<TResponse, TRequest>(apiRequestContext, 'POST', url, options);

export const putJsonRequest = <TResponse = unknown, TRequest = unknown>(
    apiRequestContext: APIRequestContext,
    url: string,
    options?: ApiRequestOptions<TRequest>
) => sendJsonRequest<TResponse, TRequest>(apiRequestContext, 'PUT', url, options);

export const deleteJsonRequest = <TResponse = unknown>(
    apiRequestContext: APIRequestContext,
    url: string,
    options?: ApiRequestOptions<never>
) => sendJsonRequest<TResponse, never>(apiRequestContext, 'DELETE', url, options);
