import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }

    if (!user) {
      return res.sendStatus(403); // Forbidden
    }

    req.user = user as JwtPayload;
    return next();
  });
  return;
};

