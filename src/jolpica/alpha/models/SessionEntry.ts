import type { AlphaApi } from '../AlphaApi';
import type { AlphaSessionEntryData } from '../types';
import { Model } from './Model';

export interface SessionEntryDriverJson {
    id: string;
    url: string;
    abbreviation: string | null;
    givenName: string;
    familyName: string;
}

export interface SessionEntryTeamJson {
    id: string;
    url: string;
    name: string;
    primaryColor: string | null;
}

export interface SessionEntrySessionJson {
    id: string;
    url: string;
    number: number | null;
    type: string;
    typeDisplay: string;
    isCancelled: boolean;
    scheduledLaps: number | null;
}

export interface SessionEntryRoundJson {
    id: string;
    url: string;
    number: number | null;
    name: string | null;
    isCancelled: boolean;
}

export interface SessionEntryJson {
    id: string;
    url: string;
    position: number | null;
    isClassified: boolean | null;
    status: number | null;
    statusDisplay: string | null;
    points: number | null;
    grid: number | null;
    time: string | null;
    timeDisplay: string | null;
    fastestLapRank: number | null;
    lapsCompleted: number | null;
    session: SessionEntrySessionJson;
    round: SessionEntryRoundJson;
    driver: SessionEntryDriverJson;
    team: SessionEntryTeamJson;
}

export class SessionEntry extends Model {
    public readonly id: string;
    public readonly url: string;
    public readonly position: number | null;
    public readonly isClassified: boolean | null;
    public readonly status: number | null;
    public readonly statusDisplay: string | null;
    public readonly points: number | null;
    public readonly grid: number | null;
    public readonly time: string | null;
    public readonly timeDisplay: string | null;
    public readonly fastestLapRank: number | null;
    public readonly lapsCompleted: number | null;
    public readonly session: SessionEntrySessionJson;
    public readonly round: SessionEntryRoundJson;
    public readonly driver: SessionEntryDriverJson;
    public readonly team: SessionEntryTeamJson;

    public constructor(data: AlphaSessionEntryData, http: AlphaApi) {
        super(http);

        this.id = data.id;
        this.url = data.url;
        this.position = data.position;
        this.isClassified = data.is_classified;
        this.status = data.status;
        this.statusDisplay = data.status_display;
        this.points = data.points;
        this.grid = data.grid;
        this.time = data.time;
        this.timeDisplay = data.time_display;
        this.fastestLapRank = data.fastest_lap_rank;
        this.lapsCompleted = data.laps_completed;
        this.session = {
            id: data.session.id,
            url: data.session.url,
            number: data.session.number,
            type: data.session.type,
            typeDisplay: data.session.type_display,
            isCancelled: data.session.is_cancelled,
            scheduledLaps: data.session.scheduled_laps,
        };
        this.round = {
            id: data.round.id,
            url: data.round.url,
            number: data.round.number,
            name: data.round.name,
            isCancelled: data.round.is_cancelled,
        };
        this.driver = {
            id: data.driver.id,
            url: data.driver.url,
            abbreviation: data.driver.abbreviation,
            givenName: data.driver.given_name,
            familyName: data.driver.family_name,
        };
        this.team = {
            id: data.team.id,
            url: data.team.url,
            name: data.team.name,
            primaryColor: data.team.primary_color,
        };
    }

    public override toJSON(): SessionEntryJson {
        return {
            id: this.id,
            url: this.url,
            position: this.position,
            isClassified: this.isClassified,
            status: this.status,
            statusDisplay: this.statusDisplay,
            points: this.points,
            grid: this.grid,
            time: this.time,
            timeDisplay: this.timeDisplay,
            fastestLapRank: this.fastestLapRank,
            lapsCompleted: this.lapsCompleted,
            session: this.session,
            round: this.round,
            driver: this.driver,
            team: this.team,
        };
    }
}
