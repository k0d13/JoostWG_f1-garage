import { HttpError } from './HttpError';

export class NotFound extends HttpError {
    public constructor(public readonly response: Response, message?: string) {
        super(404, message);
    }
}
