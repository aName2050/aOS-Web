import { Request } from 'express';

export interface IRequest extends Request {
    lang?: string;
}
