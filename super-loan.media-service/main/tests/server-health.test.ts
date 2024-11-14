import request from 'supertest';
import app from '../src/server';

describe('Test the user routes', () => {
  it('Health should be OK', async () => {
    const res = await request(app).get('/health');
    console.log('res body', res.body);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      message: 'OK'
    });
  });
});
