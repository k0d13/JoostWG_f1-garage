import type { EndpointsMap, WhereClause, WhereOperator } from './types';

export class QueryBuilder<
    E extends keyof EndpointsMap,
    T extends EndpointsMap[E] = EndpointsMap[E],
> {
    protected wheres: WhereClause[];
    protected readonly baseUrl: string;
    private readonly fetch: typeof globalThis.fetch;

    public constructor(
        protected readonly endpoint: E,
        fetch: typeof globalThis.fetch = globalThis.fetch,
    ) {
        this.wheres = [];
        this.baseUrl = 'https://api.openf1.org/v1';
        this.fetch = fetch;
    }

    public where<K extends Extract<keyof T, string>>(field: K, value: T[K]): this;
    public where<K extends Extract<keyof T, string>>(
        field: K,
        operator: WhereOperator,
        value: T[K],
    ): this;
    public where(wheres: Partial<T>): this;
    public where<K extends Extract<keyof T, string>>(
        fieldOrWheres: K | Partial<T>,
        valueOrOperator?: T[K] | WhereOperator,
        maybeValue?: T[K],
    ): this {
        if (!valueOrOperator || typeof fieldOrWheres !== 'string') {
            for (const [field, value] of Object.entries(fieldOrWheres)) {
                this.wheres.push({ field, operator: '=', value });
            }

            return this;
        }

        if (!maybeValue) {
            this.wheres.push({ field: fieldOrWheres, operator: '=', value: valueOrOperator });

            return this;
        }

        if (valueOrOperator === '=' || valueOrOperator === '<=' || valueOrOperator === '>=') {
            this.wheres.push({
                field: fieldOrWheres,
                // @ts-expect-error TS is dumb
                operator: valueOrOperator,
                value: maybeValue,
            });

            return this;
        }

        throw new Error('Invalid where');
    }

    public async get(): Promise<T[]> {
        const url = new URL(`${this.baseUrl}/${this.endpoint}`);

        for (const [key, value] of Object.entries(this.parameters())) {
            url.searchParams.set(key, value);
        }

        const response = await this.fetch(url);

        return await response.json() as T[];
    }

    protected parameters(): Record<string, string> {
        return Object.fromEntries(
            this.wheres.map((where) => [this.getParamName(where), String(where.value)]),
        );
    }

    protected getParamName(where: WhereClause): string {
        if (where.operator === '>=') {
            return `${where.field}>`;
        }

        if (where.operator === '<=') {
            return `${where.field}<`;
        }

        return where.field;
    }
}
