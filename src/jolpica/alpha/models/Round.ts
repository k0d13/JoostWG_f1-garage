import type { AlphaApi } from '../AlphaApi';
import type { AlphaRoundData, AlphaRoundSessionData } from '../types';
import { Model } from './Model';

export interface RoundCircuitJson {
    id: string;
    url: string;
    name: string;
    locality: string | null;
    countryCode: string | null;
}

export interface RoundSeasonJson {
    id: string;
    url: string;
    year: number;
}

export interface RoundSessionJson {
    id: string;
    url: string;
    number: number | null;
    type: string;
    typeDisplay: string;
    isCancelled: boolean;
    scheduledLaps: number | null;
    timestamp: string | null;
    missingTimeData: boolean | null;
    localTimestamp: string | null;
    timezone: string | null;
}

export interface RoundJson {
    id: string;
    url: string;
    number: number | null;
    name: string | null;
    isCancelled: boolean;
    raceNumber: number | null;
    wikipediaUrl: string | null;
    circuit: RoundCircuitJson;
    season: RoundSeasonJson;
    sessions: RoundSessionJson[];
}

export class RoundSession {
    public readonly id: string;
    public readonly url: string;
    public readonly number: number | null;
    public readonly type: string;
    public readonly typeDisplay: string;
    public readonly isCancelled: boolean;
    public readonly scheduledLaps: number | null;
    public readonly timestamp: Date | null;
    public readonly missingTimeData: boolean | null;
    public readonly localTimestamp: string | null;
    public readonly timezone: string | null;

    public constructor(data: AlphaRoundSessionData) {
        this.id = data.id;
        this.url = data.url;
        this.number = data.number;
        this.type = data.type;
        this.typeDisplay = data.type_display;
        this.isCancelled = data.is_cancelled;
        this.scheduledLaps = data.scheduled_laps;
        this.timestamp = data.timestamp !== null ? new Date(data.timestamp) : null;
        this.missingTimeData = data.missing_time_data;
        this.localTimestamp = data.local_timestamp;
        this.timezone = data.timezone;
    }

    public toJSON(): RoundSessionJson {
        return {
            id: this.id,
            url: this.url,
            number: this.number,
            type: this.type,
            typeDisplay: this.typeDisplay,
            isCancelled: this.isCancelled,
            scheduledLaps: this.scheduledLaps,
            timestamp: this.timestamp?.toISOString() ?? null,
            missingTimeData: this.missingTimeData,
            localTimestamp: this.localTimestamp,
            timezone: this.timezone,
        };
    }
}

export class Round extends Model {
    public readonly id: string;
    public readonly url: string;
    public readonly number: number | null;
    public readonly name: string | null;
    public readonly isCancelled: boolean;
    public readonly raceNumber: number | null;
    public readonly wikipediaUrl: string | null;
    public readonly circuit: RoundCircuitJson;
    public readonly season: RoundSeasonJson;
    public readonly sessions: RoundSession[];

    public constructor(data: AlphaRoundData, http: AlphaApi) {
        super(http);

        this.id = data.id;
        this.url = data.url;
        this.number = data.number;
        this.name = data.name;
        this.isCancelled = data.is_cancelled;
        this.raceNumber = data.race_number;
        this.wikipediaUrl = data.wikipedia;
        this.circuit = {
            id: data.circuit.id,
            url: data.circuit.url,
            name: data.circuit.name,
            locality: data.circuit.locality,
            countryCode: data.circuit.country_code,
        };
        this.season = {
            id: data.season.id,
            url: data.season.url,
            year: data.season.year,
        };
        this.sessions = data.sessions.map((s) => new RoundSession(s));
    }

    public override toJSON(): RoundJson {
        return {
            id: this.id,
            url: this.url,
            number: this.number,
            name: this.name,
            isCancelled: this.isCancelled,
            raceNumber: this.raceNumber,
            wikipediaUrl: this.wikipediaUrl,
            circuit: this.circuit,
            season: this.season,
            sessions: this.sessions.map((s) => s.toJSON()),
        };
    }
}
