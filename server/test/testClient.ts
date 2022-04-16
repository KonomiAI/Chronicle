import * as request from 'supertest';

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3001';

export const testClient = request(BASE_URL);
