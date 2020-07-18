import {
  Request,
  Response,
  NextFunction,
} from 'https://deno.land/x/opine@main/src/types.ts';

export default (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  req.payload = {};
  next();
};
