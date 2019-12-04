import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({
      error: 'Authorization header was not provided!',
    });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // setting the user logged id on the request
    req.loggedId = decoded.id;
  } catch (e) {
    return res.status(403).json({
      error: 'Authorization token invalid!',
    });
  }

  return next();
};
