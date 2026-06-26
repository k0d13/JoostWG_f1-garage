import { HttpError, NotFound } from '../ergast/errors';

export interface AlphaMeta {
    timestamp: string;
    count: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
    nextUrl: string | null;
    previousUrl: string | null;
}

export interface AlphaListResponse<T> {
    meta: AlphaMeta;
    data: T[];
}

export class AlphaBaseApi {
    public readonly baseUrl: string;

    public constructor() {
        this.baseUrl = 'https://api.jolpi.ca/f1/alpha';
    }

    public async getList<T>(
        path: string,
        params?: Record<string, unknown>,
    ): Promise<AlphaListResponse<T>> {
        const url = this.buildUrl(path, params ?? {});
        const response = await fetch(url, {
            headers: { Accept: 'application/json' },
        });

        if (response.status === 404) {
            throw new NotFound(response);
        }

        if (response.status !== 200) {
            throw new HttpError(response.status);
        }

        const body = await response.json() as {
            metadata: {
                timestamp: string;
                count: number;
                page_size: number;
                current_page: number;
                total_pages: number;
                next_url: string | null;
                previous_url: string | null;
            };
            data: T[];
        };

        return {
            meta: {
                timestamp: body.metadata.timestamp,
                count: body.metadata.count,
                pageSize: body.metadata.page_size,
                currentPage: body.metadata.current_page,
                totalPages: body.metadata.total_pages,
                nextUrl: body.metadata.next_url,
                previousUrl: body.metadata.previous_url,
            },
            data: body.data,
        };
    }

    public async getDetail<T>(
        path: string,
        params?: Record<string, unknown>,
    ): Promise<T> {
        const url = this.buildUrl(path, params ?? {});
        const response = await fetch(url, {
            headers: { Accept: 'application/json' },
        });

        if (response.status === 404) {
            throw new NotFound(response);
        }

        if (response.status !== 200) {
            throw new HttpError(response.status);
        }

        const body = await response.json() as { metadata: unknown; data: T };

        return body.data;
    }

    protected buildUrl(path: string, params: Record<string, unknown>): string {
        const url = new URL(`${this.baseUrl}${path}`);

        for (const [key, value] of Object.entries(params)) {
            if (value !== undefined && value !== null) {
                url.searchParams.set(key, String(value));
            }
        }

        return url.toString();
    }
}
