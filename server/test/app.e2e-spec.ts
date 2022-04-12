import * as request from 'supertest';

describe('AppController (e2e)', () => {
  it('/ (GET)', () => {
    return request('http://localhost:3001')
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
