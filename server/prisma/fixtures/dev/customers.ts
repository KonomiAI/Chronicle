import { Gender, Prisma } from '@prisma/client';

export const devCustomerFixtures: Prisma.CustomerCreateInput[] = [
  {
    firstName: 'Daniel',
    lastName: 'Wu',
    dateOfBirth: '1999-01-01',
    email: 'nerd1@konomi.ai',
    gender: Gender.MALE,
  },
  {
    firstName: 'Yong Lin',
    lastName: 'Wang',
    dateOfBirth: '1999-01-01',
    email: 'nerd2@konomi.ai',
    gender: Gender.MALE,
  },
  {
    firstName: 'Anthony',
    lastName: 'Lai',
    dateOfBirth: '1999-01-01',
    email: 'nerd3@konomi.ai',
    gender: Gender.MALE,
  },
  {
    firstName: 'Andrew',
    lastName: 'Pratheepan',
    dateOfBirth: '1999-01-01',
    email: 'nerd4@konomi.ai',
    gender: Gender.MALE,
  },
  {
    firstName: 'Patrick',
    lastName: 'Nguyen',
    dateOfBirth: '1999-01-01',
    email: 'nerd5@konomi.ai',
    gender: Gender.MALE,
  },
];
