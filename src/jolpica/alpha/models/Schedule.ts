import type { AlphaApi } from '../AlphaApi';
import type {
    AlphaBasicSessionData,
    AlphaScheduleData,
    AlphaScheduleEventData,
    AlphaScheduleFullSessionData,
    AlphaScheduleSummaryData,
} from '../types';
import { Model } from './Model';

export interface ScheduleSummaryJson {
    id: string;
    url: string;
    year: number;
    wikipediaUrl: string | null;
}

export interface BasicSessionJson {
    id: string;
    url: string;
    number: number | null;
    type: string;
    typeDisplay: string;
    isCancelled: boolean;
    scheduledLaps: number | null;
}

export interface ScheduleFullSessionJson {
    code: string;
    title: string;
    sessions: BasicSessionJson[];
    timestamp: string | null;
    missingTimeData: boolean | null;
    localTimestamp: string | null;
    timezone: string | null;
}

export interface ScheduleEventJson {
    round: {
        id: string;
        url: string;
        number: number | null;
        name: string | null;
        isCancelled: boolean;
        raceNumber: number | null;
        wikipediaUrl: string | null;
    };
    circuit: {
        id: string;
        url: string;
        name: string;
        locality: string | null;
        countryCode: string | null;
        country: string | null;
        latitude: number | null;
        longitude: number | null;
        altitude: number | null;
        wikipediaUrl: string | null;
    };
    schedule: ScheduleFullSessionJson[];
}

export interface ScheduleJson {
    id: string;
    url: string;
    year: number;
    wikipediaUrl: string | null;
    events: ScheduleEventJson[];
}

function mapBasicSession(s: AlphaBasicSessionData): BasicSessionJson {
    return {
        id: s.id,
        url: s.url,
        number: s.number,
        type: s.type,
        typeDisplay: s.type_display,
        isCancelled: s.is_cancelled,
        scheduledLaps: s.scheduled_laps,
    };
}

function mapFullSession(s: AlphaScheduleFullSessionData): ScheduleFullSessionJson {
    return {
        code: s.code,
        title: s.title,
        sessions: s.sessions.map(mapBasicSession),
        timestamp: s.timestamp,
        missingTimeData: s.missing_time_data,
        localTimestamp: s.local_timestamp,
        timezone: s.timezone,
    };
}

function mapEvent(e: AlphaScheduleEventData): ScheduleEventJson {
    return {
        round: {
            id: e.round.id,
            url: e.round.url,
            number: e.round.number,
            name: e.round.name,
            isCancelled: e.round.is_cancelled,
            raceNumber: e.round.race_number,
            wikipediaUrl: e.round.wikipedia,
        },
        circuit: {
            id: e.circuit.id,
            url: e.circuit.url,
            name: e.circuit.name,
            locality: e.circuit.locality,
            countryCode: e.circuit.country_code,
            country: e.circuit.country,
            latitude: e.circuit.latitude,
            longitude: e.circuit.longitude,
            altitude: e.circuit.altitude,
            wikipediaUrl: e.circuit.wikipedia,
        },
        schedule: e.schedule.map(mapFullSession),
    };
}

export class ScheduleSummary extends Model {
    public readonly id: string;
    public readonly url: string;
    public readonly year: number;
    public readonly wikipediaUrl: string | null;

    public constructor(data: AlphaScheduleSummaryData, http: AlphaApi) {
        super(http);

        this.id = data.id;
        this.url = data.url;
        this.year = data.year;
        this.wikipediaUrl = data.wikipedia;
    }

    public override toJSON(): ScheduleSummaryJson {
        return {
            id: this.id,
            url: this.url,
            year: this.year,
            wikipediaUrl: this.wikipediaUrl,
        };
    }
}

export class Schedule extends Model {
    public readonly id: string;
    public readonly url: string;
    public readonly year: number;
    public readonly wikipediaUrl: string | null;
    public readonly events: ScheduleEventJson[];

    public constructor(data: AlphaScheduleData, http: AlphaApi) {
        super(http);

        this.id = data.id;
        this.url = data.url;
        this.year = data.year;
        this.wikipediaUrl = data.wikipedia;
        this.events = data.events.map(mapEvent);
    }

    public override toJSON(): ScheduleJson {
        return {
            id: this.id,
            url: this.url,
            year: this.year,
            wikipediaUrl: this.wikipediaUrl,
            events: this.events,
        };
    }
}
