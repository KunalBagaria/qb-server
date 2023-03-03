import prisma from "./prisma";
import { Request, Response } from "express";
import { verifyKeys, verifyMethod } from "./utils";
import { v4 as uuid } from "uuid";

async function createProduct(request: Request, response: Response) {
  if (!verifyMethod(request, response, 'POST')) return;
  const keys = [
    'name',
    'image',
    'price',
    'store_id'
  ];
  if (!verifyKeys(request, response, keys)) return;
  const { name, description, image, price, store_id } = request.body;
  const uid = uuid();
  const product = await prisma.product.create({
    data: {
      name,
      description: description || 'No description',
      tag: uid,
      image,
      price: Number(price),
      store_id: Number(store_id),
    }
  });
  response.status(201).json(product);
}

async function getProduct(request: Request, response: Response) {
  if (!verifyMethod(request, response, 'GET')) return;
  const { tag } = request.params;
  const product = await prisma.product.findUnique({
    where: {
      tag,
    },
    include: {
      store: true,
    }
  });
  if (!product) {
    response.status(404).json({ detail: 'Product not found' });
    return;
  }
  response.status(200).json(product);
}

export { createProduct, getProduct };