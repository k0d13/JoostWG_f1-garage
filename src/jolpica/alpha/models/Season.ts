import type { AlphaApi } from '../AlphaApi';
import type { AlphaSeasonData } from '../types';
import { Model } from './Model';

export interface SeasonJson {
    id: string;
    url: string;
    year: number;
    wikipediaUrl: string | null;
}

export class Season extends Model {
    public readonly id: string;
    public readonly url: string;
    public readonly year: number;
    public readonly wikipediaUrl: string | null;

    public constructor(data: AlphaSeasonData, http: AlphaApi) {
        super(http);

        this.id = data.id;
        this.url = data.url;
        this.year = data.year;
        this.wikipediaUrl = data.wikipedia;
    }

    public override toJSON(): SeasonJson {
        return {
            id: this.id,
            url: this.url,
            year: this.year,
            wikipediaUrl: this.wikipediaUrl,
        };
    }
}
