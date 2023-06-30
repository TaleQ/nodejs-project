const mongoose = require('mongoose');
require('dotenv').config();
const { DB_HOST } = process.env;
const request = require('supertest');
const app = require('../../app');

const testUser = {
  email: 'testemail@example.com',
  password: 'StrongPassword123',
};

beforeAll(async () => {
  await mongoose.connect(DB_HOST);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('test login controller', () => {
  it('response has status code 200', async () => {
    const response = await request(app).post('/api/users/login').send(testUser);

    expect(response.statusCode).toBe(200);
  });

  it('response contains token', async () => {
    const response = await request(app).post('/api/users/login').send(testUser);

    expect(response.body).toHaveProperty('token');
  });

  it('response contains user object with email and subscription fields', async () => {
    const response = await request(app).post('/api/users/login').send(testUser);

    expect(response.body.user).toHaveProperty('email');
    expect(response.body.user).toHaveProperty('subscription');
    expect(typeof response.body.user.email).toBe('string');
    expect(typeof response.body.user.subscription).toBe('string');
  });
});
