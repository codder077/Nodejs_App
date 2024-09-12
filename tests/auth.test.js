const request = require('supertest');
const app = require('../index'); // Import your Express app

server=app.listen(4000);
afterAll(async () => {
    server.close(); // Ensure the server is closed after tests
  });

describe('Auth API', () => {
  let refreshToken;
  let accessToken;

  // Register a new user
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ username: 'test3', password: 'password12323' });

    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toBe('User created');
  });

  // Login user and get access and refresh tokens
  it('should login and return tokens', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'test3', password: 'password12323' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('refreshToken');
    accessToken = res.body.accessToken;
    refreshToken = res.body.refreshToken;
  });

  // Refresh access token using refresh token
  it('should refresh access token', async () => {
    const res = await request(app)
      .post('/auth/refresh-token')
      .send({ refreshToken });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('accessToken');
  });

  // Fail to refresh token with an invalid refresh token
  it('should not refresh token with invalid refresh token', async () => {
    const res = await request(app)
      .post('/auth/refresh-token')
      .send({ refreshToken: 'invalidToken' });

    expect(res.statusCode).toEqual(403);
  });
});
