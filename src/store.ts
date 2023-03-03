import prisma from "./prisma";
import { Request, Response } from "express";
import { verifyKeys, verifyMethod } from "./utils";

async function createStore(request: Request, response: Response) {
  if (!verifyMethod(request, response, 'POST')) return;
  const keys = ['name', 'description', 'image', 'email'];
  if (!verifyKeys(request, response, keys)) return;
  const { name, description, image, email } = request.body;
  const alreadyExists = await prisma.store.findUnique({
    where: {
      email
    }
  });
  if (alreadyExists) {
    response.status(400).json({ detail: 'Store already exists with this email' });
    return;
  };
  const store = await prisma.store.create({
    data: {
      name,
      description,
      image,
      email
    }
  });
  response.status(201).json(store);
}

export { createStore };