import express from 'express';
import { createStore } from './store';
import { createProduct, getProduct } from './product';

const app = express()
const PORT = process.env["PORT"] || 8080;

app.use(express.json())

// Health Check
app.get('/', (req, res) => {
  res.status(200).json({ detail: 'OK' });
});

// Store
app.post('/store/create', (req, res) => {
  createStore(req, res);
});

// Product
app.post('/product/create', (req, res) => {
  createProduct(req, res);
});
app.get('/product/:tag', (req, res) => {
  getProduct(req, res);
});

app.listen(PORT, () => {
  console.log('REST API server ready at: http://0.0.0.0:' + PORT);
});