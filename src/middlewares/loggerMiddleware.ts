import { Request, Response, NextFunction } from 'express';

const logger = (req: Request, res: Response, next: NextFunction) => {
  const { method, url } = req;
  const start = new Date().getTime();

  res.on('finish', () => {
    const end = new Date().getTime();
    const duration = end - start;
    console.log(`${method} ${url} ${res.statusCode} - ${duration}ms`);
  });

  next();
};

export default logger;
