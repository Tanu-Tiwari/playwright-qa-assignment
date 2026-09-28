import { test, expect } from '@playwright/test';

const BASE_URL = 'https://reqres.in/api';
const newUser = { name: 'morpheus', job: 'leader' };

test('GET /users?page=2 returns a list of users', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users?page=2`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);

    for (const user of body.data) {
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('first_name');
        expect(user).toHaveProperty('last_name');
    }
});

test('POST /users creates a user', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/users`, { data: newUser });
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.name).toBe(newUser.name);
    expect(body.job).toBe(newUser.job);
    expect(body.id).toBeTruthy();
    expect(body.createdAt).toBeTruthy();
});

// reqres doesn't save data, so there is nothing to GET back.
// This shows how I'd structure create -> verify if the API did persist.
test('create then verify user', async ({ request }) => {
    const created = await test.step('create user', async () => {
        const response = await request.post(`${BASE_URL}/users`, { data: newUser });
        expect(response.status()).toBe(201);
        return response.json();
    });

    await test.step('verify created user', async () => {
        expect(created).toMatchObject(newUser);
        expect(created.id).toBeTruthy();

        // createdAt should be a valid timestamp from the last minute
        const createdAt = new Date(created.createdAt).getTime();
        expect(Number.isNaN(createdAt)).toBe(false);
        expect(Date.now() - createdAt).toBeLessThan(60_000);
    });
});
