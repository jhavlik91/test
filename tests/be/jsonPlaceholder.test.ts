import {test, expect} from '@playwright/test';
import {getJsonRequest, postJsonRequest, putJsonRequest, deleteJsonRequest} from '../../src/utils/apiClient';
import type {Post} from '../../src/types/api';
import {API_URL} from '../../src/config';

test.describe('JSONPlaceholder API', () => {
    test('GET /posts/1 returns a post', {tag: '@api'}, async ({request}) => {
        const {json} = await getJsonRequest<Post>(request, `${API_URL}/posts/1`);
        expect(json?.id).toBe(1);
        expect(typeof json?.userId).toBe('number');
        expect(typeof json?.title).toBe('string');
        expect(typeof json?.body).toBe('string');
    });

    test('POST /posts creates a post (fake)', {tag: '@api'}, async ({request}) => {
        type PostCreate = Omit<Post, 'id'>;
        type PostCreateResponse = Post & {id: number};

        const payload: PostCreate = {title: 'Hello', body: 'From Playwright', userId: 1};

        const {json} = await postJsonRequest<PostCreateResponse, PostCreate>(request, `${API_URL}/posts`, {
            data: payload,
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
        });

        expect(json).toMatchObject(payload);
        expect(typeof json?.id).toBe('number');
    });

    test('PUT /posts/1 updates a post (fake)', {tag: '@api'}, async ({request}) => {
        const update: Post = {id: 1, title: 'Updated', body: 'Edited body', userId: 1};

        const {json} = await putJsonRequest<Post, Post>(request, `${API_URL}/posts/1`, {
            data: update,
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
        });

        expect(json).toMatchObject(update);
    });

    test('DELETE /posts/1 deletes a post (fake)', {tag: '@api'}, async ({request}) => {
        const {json} = await deleteJsonRequest<{[key: string]: never}>(request, `${API_URL}/posts/1`);
        expect(json).toEqual({});
    });
});
