import type { AlphaApi } from '../AlphaApi';
import type { AlphaTeamData, AlphaTeamSeasonData } from '../types';
import { Model } from './Model';

export interface TeamSeasonJson {
    id: string;
    url: string;
    year: number;
}

export interface TeamJson {
    id: string;
    url: string;
    name: string;
    primaryColor: string | null;
    nationality: string | null;
    countryCode: string | null;
    wikipediaUrl: string | null;
    seasons: TeamSeasonJson[];
}

export class TeamSeason {
    public readonly id: string;
    public readonly url: string;
    public readonly year: number;

    public constructor(data: AlphaTeamSeasonData) {
        this.id = data.id;
        this.url = data.url;
        this.year = data.year;
    }

    public toJSON(): TeamSeasonJson {
        return {
            id: this.id,
            url: this.url,
            year: this.year,
        };
    }
}

export class Team extends Model {
    public readonly id: string;
    public readonly url: string;
    public readonly name: string;
    public readonly primaryColor: string | null;
    public readonly nationality: string | null;
    public readonly countryCode: string | null;
    public readonly wikipediaUrl: string | null;
    public readonly seasons: TeamSeason[];

    public constructor(data: AlphaTeamData, http: AlphaApi) {
        super(http);

        this.id = data.id;
        this.url = data.url;
        this.name = data.name;
        this.primaryColor = data.primary_color;
        this.nationality = data.nationality;
        this.countryCode = data.country_code;
        this.wikipediaUrl = data.wikipedia;
        this.seasons = data.seasons.map((s) => new TeamSeason(s));
    }

    public override toJSON(): TeamJson {
        return {
            id: this.id,
            url: this.url,
            name: this.name,
            primaryColor: this.primaryColor,
            nationality: this.nationality,
            countryCode: this.countryCode,
            wikipediaUrl: this.wikipediaUrl,
            seasons: this.seasons.map((s) => s.toJSON()),
        };
    }
}
