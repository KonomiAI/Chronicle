import { testClient } from './testClient';

describe('AppController (e2e)', () => {
  it('/ (GET)', () => {
    return testClient.get('/').expect(200).expect('Hello World!');
  });
});
