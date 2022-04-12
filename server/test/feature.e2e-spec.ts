import { assert } from 'console';
import * as request from 'supertest';
import * as yup from 'yup';

describe('Features (e2e)', () => {
  let featureSchema;
  beforeAll(async () => {
    featureSchema = yup.object({
      data: yup.object({
        id: yup.string(),
        name: yup.string(),
      }),
      message: yup.string(),
    });
  });
  it('/ (GET)', () => {
    return request('http://localhost:3001/features')
      .get('/')
      .expect(200)
      .then((response) => {
        expect(response.body.data).toHaveLength(5);
        assert(featureSchema.isValidSync(response.body.data));
      });
  });
});
