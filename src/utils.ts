import { Request, Response } from 'express';

export const verifyKeys = (
  req: Request,
  res: Response,
  requiredKeys: string[],
): boolean => {
  const data = req.body;
  const missingKeys = requiredKeys.filter((key) => (
    !Object.prototype.hasOwnProperty.call(data, key)
  ));
  if (missingKeys.length > 0) {
    res.status(400).json({ detail: `Missing Parameters: ${missingKeys.join(', ')}` });
    return false;
  }
  return true;
};

export const verifyMethod = (
  req: Request,
  res: Response,
  method: string,
): boolean => {
  if (req.method == "OPTIONS") {
    res.setHeader("Allow", method);
    res.status(202).json({});
    return false;
  }
  if (req.method !== method) {
    res.setHeader('Allow', [method]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return false;
  }
  return true;
};