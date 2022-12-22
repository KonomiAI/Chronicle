import { randomUUID } from 'crypto';
import { testClient } from './testClient';
import * as yup from 'yup';

describe('/visits', () => {
  let createdCustomer = null;
  let createdVisit = null;
  let accessToken: string | null = null;
  const findAllSchema = yup.object({
    customer: yup.object({
      id: yup.string(),
      firstName: yup.string(),
      lastName: yup.string(),
      email: yup.string().email(),
    }),
    visitDate: yup.string(),
    createdAt: yup.string(),
    updatedAt: yup.string(),
    charge: yup.array(
      yup.object({
        id: yup.string(),
        amount: yup.number().integer(),
        description: yup.string(),
        createdDt: yup.string(),
      }),
    ),
    activityEntries: yup.array(
      yup.object({
        author: yup.object({
          firstName: yup.string(),
          lastName: yup.string(),
        }),
      }),
    ),
  });

  beforeEach(async () => {
    const {
      body: { accessToken: token },
    } = await testClient.post('/auth/login').send({
      email: 'test@konomi.ai',
      password: 'test',
    });
    accessToken = token;

    const res = await testClient
      .post('/customers')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        firstName: 'Test',
        lastName: 'Wang',
        email: `test.visit.${randomUUID()}@test.konomi.ai`,
        phone: '+14169671111',
        dateOfBirth: '1999-07-29',
        gender: 'MALE',
      })
      .expect(201);
    createdCustomer = res.body.data;
    const visitRes = await testClient
      .post('/visits')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        customerId: createdCustomer.id,
      })
      .expect(201);
    createdVisit = visitRes.body.data;
  });

  it('/ (GET)', async () => {
    await testClient
      .get('/visits')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .then((res) => {
        const { body } = res;
        expect(body.data.length).toBeGreaterThan(0);
        expect(findAllSchema.isValidSync(body.data[0]));
      });
  });

  it('/:id (GET)', async () => {
    await testClient
      .get(`/visits/${createdVisit.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .then((res) => {
        const { body } = res;
        expect(findAllSchema.isValidSync(body.data)).toEqual(true);
      });
  });

  it('/:id (PUT)', async () => {
    const {
      body: { data: targetVisit },
    } = await testClient
      .get(`/visits/${createdVisit.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    console.log(
      JSON.stringify(
        {
          id: createdVisit.id,
          customerId: targetVisit.customer.id,
          activityEntries: [],
          visitDate: '2022-12-12',
        },
        null,
        2,
      ),
    );
    await testClient
      .put(`/visits/${createdVisit.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        customerId: targetVisit.customer.id,
        activityEntryIds: [],
        visitDate: '2022-12-12',
      })
      .expect(200);
    await testClient
      .get(`/visits/${createdVisit.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .then((res) => {
        const { body } = res;
        expect(body.data.visitDate).toEqual('2022-12-12');
      });
  });

  // it('/:id (DELETE)', async () => {
  //   await testClient.delete(`/customers/${createdCustomer.id}`).expect(200);
  //   await testClient.get(`/customers/${createdCustomer.id}`).expect(404);
  // });
});
