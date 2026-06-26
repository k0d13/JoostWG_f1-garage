import type { AlphaApi } from '../AlphaApi';

export abstract class Model {
    public constructor(protected readonly http: AlphaApi) {
        //
    }

    public abstract toJSON(): unknown;
}
