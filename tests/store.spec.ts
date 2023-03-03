import axios from 'axios';
import { expect } from 'chai';
import { API_URL } from './config';
import { v4 as uuidv4 } from 'uuid';


describe('Store Creation', () => {
  it('Should create a store', async () => {
    const response = await axios.post(API_URL + '/store/create', {
      name: 'Test Store',
      description: 'Test Store Description',
      image: 'https://teststore.com/image.png',
      email: uuidv4() + '@teststore.com'
    });
    expect(response.data).to.have.property('id');
  });
});