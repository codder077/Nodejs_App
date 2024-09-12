const request = require('supertest');
const app = require('../index'); // Import your Express app
server=app.listen(4000);
let accessToken;

beforeAll(async () => {
  // Register and login to get tokens
  await request(app)
    .post('/auth/register')
    .send({ username: 'testuser', password: 'password123' });

  const loginRes = await request(app)
    .post('/auth/login')
    .send({ username: 'testuser', password: 'password123' });

  accessToken = loginRes.body.accessToken;
});
afterAll(async () => {
    server.close(); // Ensure the server is closed after tests
  });

describe('CRUD API', () => {
  let itemId;

  it('should create an item', async () => {
    const res = await request(app)
      .post('/api/items')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ name: 'Test Item 516', description: 'Test Description 718' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    itemId = res.body._id;
  });

  it('should get all items', async () => {
    const res = await request(app)
      .get('/api/items')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update an item', async () => {
    const res = await request(app)
      .put(`/api/items/${itemId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ name: 'Updated 324 Item', description: 'Updated De245 scription' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('Updated 324 Item');
  });

  it('should delete an item', async () => {
    const res = await request(app)
      .delete(`/api/items/${itemId}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(res.statusCode).toEqual(204);
  });

  it('should not allow access without a token', async () => {
    const res = await request(app).get('/api/items');
    expect(res.statusCode).toEqual(401);
  });
});
