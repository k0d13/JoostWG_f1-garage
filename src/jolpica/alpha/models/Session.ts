import type { AlphaApi } from '../AlphaApi';
import type { AlphaSessionData } from '../types';
import { Model } from './Model';

export interface SessionRoundJson {
    id: string;
    url: string;
    number: number | null;
    name: string | null;
    isCancelled: boolean;
}

export interface SessionJson {
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
    round: SessionRoundJson;
}

export class Session extends Model {
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
    public readonly round: SessionRoundJson;

    public constructor(data: AlphaSessionData, http: AlphaApi) {
        super(http);

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
        this.round = {
            id: data.round.id,
            url: data.round.url,
            number: data.round.number,
            name: data.round.name,
            isCancelled: data.round.is_cancelled,
        };
    }

    public override toJSON(): SessionJson {
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
            round: this.round,
        };
    }
}
