import { randomUUID } from 'crypto';
import { testClient } from './testClient';
import * as yup from 'yup';

describe('/customers', () => {
  let createdCustomer = null;
  const schema = yup.object({
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string().email(),
    gender: yup.string(),
    dateOfBirth: yup.string(),
    phone: yup.string(),
    isDeleted: yup.boolean(),
    createdAt: yup.string(),
    updatedAt: yup.string(),
  });

  beforeEach(async () => {
    const res = await testClient
      .post('/customers')
      .send({
        firstName: 'Test',
        lastName: 'Wang',
        email: `test.${randomUUID()}@test.konomi.ai`,
        phone: '+14169671111',
        dateOfBirth: '1999-07-29',
        gender: 'MALE',
      })
      .expect(201);
    createdCustomer = res.body.data;
  });

  it('/ (GET)', async () => {
    await testClient
      .get('/customers')
      .expect(200)
      .then((res) => {
        const { body } = res;
        expect(body.data.length).toBeGreaterThan(0);
      });
  });

  it('/:id (GET)', async () => {
    await testClient
      .get(`/customers/${createdCustomer.id}`)
      .expect(200)
      .then((res) => {
        const { body } = res;
        expect(schema.isValidSync(body.data)).toEqual(true);
      });
  });

  it('/:id (PUT)', async () => {
    await testClient
      .put(`/customers/${createdCustomer.id}`)
      .send({
        firstName: 'Updated',
        lastName: 'Test',
        email: `test.${randomUUID()}@test.konomi.ai`,
        phone: '+14169671111',
        dateOfBirth: '1999-07-29',
        gender: 'MALE',
      })
      .expect(200);
    await testClient
      .get(`/customers/${createdCustomer.id}`)
      .expect(200)
      .then((res) => {
        const { body } = res;
        expect(body.data.firstName).toEqual('Updated');
      });
  });

  it('/:id (DELETE)', async () => {
    await testClient.delete(`/customers/${createdCustomer.id}`).expect(200);
    await testClient.get(`/customers/${createdCustomer.id}`).expect(404);
  });
});
