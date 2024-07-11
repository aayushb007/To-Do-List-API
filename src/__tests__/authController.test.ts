import request from 'supertest';
import app from '../index';

describe('Auth API', () => {
  // Test Case:User Sign up
  it('should sign up a new user', async () => {
    const duplicateRes = await request(app)
    .post('/api/signup')
    .send({
      username: 'testuser1',
      password: 'testpassword',
    });
  expect(duplicateRes.statusCode).toEqual(500); // Expect Conflict status
 
    const res = await request(app)
      .post('/api/signup')
      .send({
        username: 'testuser1',
        password: 'testpassword',
      });
    expect(res.statusCode).toEqual(201); //if there is any duplication it might be failed 
    expect(res.body).toHaveProperty('message', 'User created successfully');


   
  });

  //Test Case: User Login
  it('should log in an existing user', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        username: 'testuser1',
        password: 'testpassword',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});

