import { Gender, PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import { testClient } from './testClient';

const prisma = new PrismaClient();

fdescribe('/activity-entry', () => {
  let token = '';
  let customerId = '';
  let activityId = '';
  let productIds: string[] = [];
  beforeEach(async () => {
    const caseId = randomUUID();
    const {
      body: { accessToken },
    } = await testClient
      .post('/auth/login')
      .send({
        email: 'test@konomi.ai',
        password: 'test',
      })
      .expect(201);
    token = `Bearer ${accessToken}`;
    const {
      body: {
        data: { id: cid },
      },
    } = await testClient
      .post('/customers')
      .set('Authorization', token)
      .send({
        firstName: 'Test',
        dateOfBirth: '1999-07-29',
        email: `activity_entry_test-${caseId}@konomi.ai`,
        gender: Gender.MALE,
        lastName: `User-${caseId}`,
      })
      .expect(201);

    customerId = cid;
    const {
      body: {
        data: { id: aid },
      },
    } = await testClient
      .post('/activities')
      .set('Authorization', token)
      .send({
        name: `Treatment ${caseId}`,
        price: 42069,
      });
    activityId = aid;
  });
  it('/ (POST with only activity)', async () => {
    const res = await testClient
      .post('/activity-entry')
      .set('Authorization', token)
      .send({
        customerId,
        activityId,
      })
      .expect(201);
    expect(res.body.data).toBeTruthy();
  });

  it('/ (GET)', async () => {
    const res = await testClient
      .get('/activity-entry')
      .set('Authorization', token)
      .expect(200);
    expect(res.body.data.length).toBeTruthy();
  });

  it('/my (GET)', async () => {
    const res = await testClient
      .get('/activity-entry/my')
      .set('Authorization', token)
      .expect(200);
    expect(res.body.data.length).toBeTruthy();
  });
});
