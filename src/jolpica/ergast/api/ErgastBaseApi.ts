import { BadRequest, HttpError, NotFound } from '../errors';
import type { AnyApiOptions, BadRequestResponse, Pagination, SuccessResponse } from '../types';

export interface RequestConfig extends RequestInit {
    params?: Record<string, unknown>;
}

export class ErgastBaseApi {
    public readonly baseUrl: string;

    public constructor() {
        this.baseUrl = 'https://api.jolpi.ca/ergast/f1';
    }

    public getPath(resource: string, options: AnyApiOptions): string {
        const basePath = `/${resource}`;

        const path: string[] = [];

        if (options.season) {
            path.push(String(options.season));

            if (options.round) {
                path.push(String(options.round));
            }
        }

        if (options.circuit) {
            path.push('circuits', options.circuit);
        }

        if (options.driver) {
            path.push('drivers', options.driver);
        }

        if (options.team) {
            path.push('constructors', options.team);
        }

        if (options.lap) {
            path.push('laps', String(options.lap));
        }

        if (options.pitStopNumber) {
            path.push('pitstops', String(options.pitStopNumber));
        }

        if (options.fastestRank) {
            path.push('fastest', String(options.fastestRank));
        }

        if (options.gridPosition) {
            path.push('grid', String(options.gridPosition));
        }

        if (options.finishPosition) {
            path.push('results', String(options.finishPosition));
        }

        if (options.status) {
            path.push('status', options.status);
        }

        if (options.driverStanding) {
            path.push('driverstandings', String(options.driverStanding));
        }

        if (options.qualifying) {
            path.push('qualifying', String(options.qualifying));
        }

        if (options.teamStanding) {
            path.push('constructorstandings', String(options.teamStanding));
        }

        if (path.length === 0) {
            return basePath;
        }

        return `/${path.join('/')}${basePath}`;
    }

    public async get<T extends SuccessResponse>(
        path: string,
        pagination?: Pagination,
        config?: RequestConfig,
    ): Promise<T> {
        const { params, ...init } = config ?? {};

        const url = this.buildUrl(`${path}.json`, {
            ...pagination,
            ...params,
        });

        const response = await fetch(url, {
            ...init,
            headers: {
                Accept: 'application/json',
                ...init.headers,
            },
        });

        if (response.status === 404) {
            throw new NotFound(response);
        }

        const data = await response.json() as T | BadRequestResponse;

        if (response.status === 400) {
            throw new BadRequest((data as BadRequestResponse).detail);
        }

        if (response.status !== 200) {
            throw new HttpError(response.status);
        }

        return data as T;
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
