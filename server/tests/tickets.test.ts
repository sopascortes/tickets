import request from 'supertest';
import app from '../src/app.js';
import { initDB } from '../src/config/db.js';

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  await initDB();
});

describe('Ticket testing', () => {
  
  it('FAIL: Backend validation: The API rejects a ticket without a required title.', async () => {
    const res = await request(app)
      .post('/api/tickets')
      .send({
        description: 'Missing title property',
        customerName: 'Name',
        customerEmail: 'name@name.com',
        priority: 'high'
      });
    
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toHaveProperty('title');
  });

  it('SUCCESS: Ticket creation: A valid ticket is created and stored successfully.', async () => {
    const res = await request(app)
      .post('/api/tickets')
      .send({
        title: 'Ticket creation',
        description: 'A valid ticket is created and stored successfully.',
        customerName: 'Name',
        customerEmail: 'name@name.com',
        priority: 'medium'
      });
    
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.status).toBe('open');
  });

  it('SUCCESS: Status update: The update endpoint saves the new status.', async () => {
    const res = await request(app)
      .patch('/api/tickets/1')
      .send({ status: 'in_progress' });
    
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('in_progress');
  });
});
