import type { AlphaBaseApi, AlphaListResponse, AlphaMeta } from './AlphaBaseApi';
import type { Model } from './models';

export class AlphaListPendingRequest<T extends Model> {
    public constructor(
        protected readonly http: AlphaBaseApi,
        protected readonly path: string,
        protected readonly params: Record<string, unknown>,
        protected readonly transform: (data: unknown) => T,
    ) {
        //
    }

    public get url(): string {
        return `${this.http.baseUrl}${this.path}`;
    }

    public async get(page?: number): Promise<{ meta: AlphaMeta; data: T[] }> {
        const raw = await this.http.getList<unknown>(this.path, {
            ...this.params,
            ...(page !== undefined ? { page } : {}),
        });

        return {
            meta: raw.meta,
            data: (raw as AlphaListResponse<unknown>).data.map((item) => this.transform(item)),
        };
    }
}

export class AlphaDetailPendingRequest<T extends Model> {
    public constructor(
        protected readonly http: AlphaBaseApi,
        protected readonly path: string,
        protected readonly transform: (data: unknown) => T,
    ) {
        //
    }

    public get url(): string {
        return `${this.http.baseUrl}${this.path}`;
    }

    public async get(): Promise<T> {
        const raw = await this.http.getDetail<unknown>(this.path);

        return this.transform(raw);
    }
}
