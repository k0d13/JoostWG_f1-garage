import type { AlphaApi } from '../AlphaApi';
import type { AlphaLapData } from '../types';
import { Model } from './Model';

export interface LapJson {
    id: string;
    url: string;
    number: number | null;
    position: number | null;
    time: string | null;
    timeDisplay: string | null;
    timeMilliseconds: number | null;
    averageSpeed: number | null;
    isEntryFastestLap: boolean;
    sessionEntryId: string;
    sessionEntryUrl: string;
}

export class Lap extends Model {
    public readonly id: string;
    public readonly url: string;
    public readonly number: number | null;
    public readonly position: number | null;
    public readonly time: string | null;
    public readonly timeDisplay: string | null;
    public readonly timeMilliseconds: number | null;
    public readonly averageSpeed: number | null;
    public readonly isEntryFastestLap: boolean;
    public readonly sessionEntryId: string;
    public readonly sessionEntryUrl: string;

    public constructor(data: AlphaLapData, http: AlphaApi) {
        super(http);

        this.id = data.id;
        this.url = data.url;
        this.number = data.number;
        this.position = data.position;
        this.time = data.time;
        this.timeDisplay = data.time_display;
        this.timeMilliseconds = data.time_milliseconds;
        this.averageSpeed = data.average_speed;
        this.isEntryFastestLap = data.is_entry_fastest_lap;
        this.sessionEntryId = data.session_entry.id;
        this.sessionEntryUrl = data.session_entry.url;
    }

    public override toJSON(): LapJson {
        return {
            id: this.id,
            url: this.url,
            number: this.number,
            position: this.position,
            time: this.time,
            timeDisplay: this.timeDisplay,
            timeMilliseconds: this.timeMilliseconds,
            averageSpeed: this.averageSpeed,
            isEntryFastestLap: this.isEntryFastestLap,
            sessionEntryId: this.sessionEntryId,
            sessionEntryUrl: this.sessionEntryUrl,
        };
    }
}
