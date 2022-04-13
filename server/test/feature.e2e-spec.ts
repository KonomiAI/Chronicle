import { assert } from 'console';
import * as yup from 'yup';
import { testClient } from './testClient';

describe('Features (e2e)', () => {
  let featureSchema;
  beforeAll(() => {
    featureSchema = yup.object({
      data: yup.object({
        id: yup.string(),
        name: yup.string(),
      }),
      message: yup.string(),
    });
  });
  it('/ (GET)', () => {
    return testClient
      .get('/features')
      .expect(200)
      .then((response) => {
        expect(response.body.data).toHaveLength(5);
        assert(featureSchema.isValidSync(response.body.data));
      });
  });
});
