import axios from 'axios';
import { expect } from 'chai';
import { API_URL } from './config';

describe('Health Check', () => {
  it('should return 200', async () => {
    const response = await axios.get(API_URL);
    expect(response.status).to.equal(200);
  });
});