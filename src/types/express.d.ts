import { request } from 'express';

declare module 'express' {
  interface Request extends request {
    userId: string;
  }
}
