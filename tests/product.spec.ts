import axios from 'axios';
import { expect } from 'chai';
import { API_URL } from './config';

describe('Product Creation', () => {
  it('Should create a product', async () => {
    const response = await axios.post(API_URL + '/product/create', {
      name: 'Test Product',
      description: 'Test Product Description',
      image: 'https://teststore.com/image.png',
      price: 100,
      store_id: 1
    });
    expect(response.data).to.have.property('tag');
  });
});