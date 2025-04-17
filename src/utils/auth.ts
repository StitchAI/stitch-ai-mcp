import { Request, Response, NextFunction } from 'express';

type Middleware = (req: Request, res: Response, next: NextFunction) => void;
export function apiKeyAuth(API_KEY: string): Middleware {
  return (req, res, next) => {
    const authHeader = req.header('Authorization') || req.header('X-API-Key');
    const providedKey = authHeader?.replace(/^Bearer\s+/i, '') || req.query.apiKey;
    if (providedKey !== API_KEY) {
      return res.status(401).send('Unauthorized: invalid API key');
    }
    next();
  };
}