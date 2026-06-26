import type { AlphaApi } from '../AlphaApi';
import type { AlphaPitStopData } from '../types';
import { Model } from './Model';

export interface PitStopLapJson {
    id: string;
    url: string;
    number: number | null;
    position: number | null;
    time: string | null;
}

export interface PitStopJson {
    id: string;
    url: string;
    number: number | null;
    duration: string | null;
    durationDisplay: string | null;
    durationMilliseconds: number | null;
    localTimestamp: string | null;
    driverId: string;
    driverUrl: string;
    driverAbbreviation: string | null;
    driverGivenName: string;
    driverFamilyName: string;
    teamId: string;
    teamUrl: string;
    teamName: string;
    teamPrimaryColor: string | null;
    sessionId: string;
    sessionUrl: string;
    sessionType: string;
    sessionTypeDisplay: string;
    roundId: string;
    roundUrl: string;
    roundNumber: number | null;
    roundName: string | null;
    seasonId: string;
    seasonUrl: string;
    seasonYear: number;
    lap: PitStopLapJson | null;
}

export class PitStop extends Model {
    public readonly id: string;
    public readonly url: string;
    public readonly number: number | null;
    public readonly duration: string | null;
    public readonly durationDisplay: string | null;
    public readonly durationMilliseconds: number | null;
    public readonly localTimestamp: string | null;
    public readonly driverId: string;
    public readonly driverUrl: string;
    public readonly driverAbbreviation: string | null;
    public readonly driverGivenName: string;
    public readonly driverFamilyName: string;
    public readonly teamId: string;
    public readonly teamUrl: string;
    public readonly teamName: string;
    public readonly teamPrimaryColor: string | null;
    public readonly sessionId: string;
    public readonly sessionUrl: string;
    public readonly sessionType: string;
    public readonly sessionTypeDisplay: string;
    public readonly roundId: string;
    public readonly roundUrl: string;
    public readonly roundNumber: number | null;
    public readonly roundName: string | null;
    public readonly seasonId: string;
    public readonly seasonUrl: string;
    public readonly seasonYear: number;
    public readonly lap: PitStopLapJson | null;

    public constructor(data: AlphaPitStopData, http: AlphaApi) {
        super(http);

        this.id = data.id;
        this.url = data.url;
        this.number = data.number;
        this.duration = data.duration;
        this.durationDisplay = data.duration_display;
        this.durationMilliseconds = data.duration_milliseconds;
        this.localTimestamp = data.local_timestamp;
        this.driverId = data.driver.id;
        this.driverUrl = data.driver.url;
        this.driverAbbreviation = data.driver.abbreviation;
        this.driverGivenName = data.driver.given_name;
        this.driverFamilyName = data.driver.family_name;
        this.teamId = data.team.id;
        this.teamUrl = data.team.url;
        this.teamName = data.team.name;
        this.teamPrimaryColor = data.team.primary_color;
        this.sessionId = data.session.id;
        this.sessionUrl = data.session.url;
        this.sessionType = data.session.type;
        this.sessionTypeDisplay = data.session.type_display;
        this.roundId = data.round.id;
        this.roundUrl = data.round.url;
        this.roundNumber = data.round.number;
        this.roundName = data.round.name;
        this.seasonId = data.season.id;
        this.seasonUrl = data.season.url;
        this.seasonYear = data.season.year;
        this.lap = data.lap !== null
            ? {
                id: data.lap.id,
                url: data.lap.url,
                number: data.lap.number,
                position: data.lap.position,
                time: data.lap.time,
            }
            : null;
    }

    public get driverName(): string {
        return `${this.driverGivenName} ${this.driverFamilyName}`;
    }

    public override toJSON(): PitStopJson {
        return {
            id: this.id,
            url: this.url,
            number: this.number,
            duration: this.duration,
            durationDisplay: this.durationDisplay,
            durationMilliseconds: this.durationMilliseconds,
            localTimestamp: this.localTimestamp,
            driverId: this.driverId,
            driverUrl: this.driverUrl,
            driverAbbreviation: this.driverAbbreviation,
            driverGivenName: this.driverGivenName,
            driverFamilyName: this.driverFamilyName,
            teamId: this.teamId,
            teamUrl: this.teamUrl,
            teamName: this.teamName,
            teamPrimaryColor: this.teamPrimaryColor,
            sessionId: this.sessionId,
            sessionUrl: this.sessionUrl,
            sessionType: this.sessionType,
            sessionTypeDisplay: this.sessionTypeDisplay,
            roundId: this.roundId,
            roundUrl: this.roundUrl,
            roundNumber: this.roundNumber,
            roundName: this.roundName,
            seasonId: this.seasonId,
            seasonUrl: this.seasonUrl,
            seasonYear: this.seasonYear,
            lap: this.lap,
        };
    }
}
