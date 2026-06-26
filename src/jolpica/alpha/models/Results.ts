import type { AlphaApi } from '../AlphaApi';
import type {
    AlphaAvailableResultsForRoundData,
    AlphaResultItemData,
    AlphaResultsData,
} from '../types';
import { Model } from './Model';

export interface ResultComponentJson {
    key: string;
    name: string;
    position: number | null;
    time: string | null;
}

export interface ResultItemJson {
    driverId: string;
    driverUrl: string;
    driverAbbreviation: string | null;
    driverGivenName: string;
    driverFamilyName: string;
    teamId: string;
    teamUrl: string;
    teamName: string;
    teamPrimaryColor: string | null;
    position: number | null;
    positionText: string | null;
    time: string | null;
    isClassified: boolean | null;
    status: string | null;
    points: number | null;
    laps: number | null;
    carNumber: number | null;
    components: Record<string, ResultComponentJson>;
}

export interface ResultsJson {
    code: string;
    title: string;
    timestamp: string | null;
    missingTimeData: boolean | null;
    localTimestamp: string | null;
    timezone: string | null;
    seasonId: string;
    seasonYear: number;
    roundId: string;
    roundNumber: number | null;
    roundName: string | null;
    circuitId: string;
    circuitName: string;
    componentKeys: string[];
    results: ResultItemJson[];
}

export interface AvailableResultsItemJson {
    url: string;
    type: string;
    title: string;
}

export interface AvailableResultsForRoundJson {
    year: number;
    roundNumber: number | null;
    roundName: string | null;
    availableResults: AvailableResultsItemJson[];
}

function mapResultItem(item: AlphaResultItemData): ResultItemJson {
    return {
        driverId: item.driver.id,
        driverUrl: item.driver.url,
        driverAbbreviation: item.driver.abbreviation,
        driverGivenName: item.driver.given_name,
        driverFamilyName: item.driver.family_name,
        teamId: item.team.id,
        teamUrl: item.team.url,
        teamName: item.team.name,
        teamPrimaryColor: item.team.primary_color,
        position: item.position,
        positionText: item.position_text,
        time: item.time,
        isClassified: item.is_classified,
        status: item.status,
        points: item.points,
        laps: item.laps,
        carNumber: item.car_number,
        components: Object.fromEntries(
            Object.entries(item.components).map(([k, v]) => [
                k,
                { key: v.key, name: v.name, position: v.position, time: v.time },
            ]),
        ),
    };
}

export class Results extends Model {
    public readonly code: string;
    public readonly title: string;
    public readonly timestamp: Date | null;
    public readonly missingTimeData: boolean | null;
    public readonly localTimestamp: string | null;
    public readonly timezone: string | null;
    public readonly seasonId: string;
    public readonly seasonYear: number;
    public readonly roundId: string;
    public readonly roundNumber: number | null;
    public readonly roundName: string | null;
    public readonly circuitId: string;
    public readonly circuitName: string;
    public readonly componentKeys: string[];
    public readonly results: ResultItemJson[];

    public constructor(data: AlphaResultsData, http: AlphaApi) {
        super(http);

        this.code = data.code;
        this.title = data.title;
        this.timestamp = data.timestamp !== null ? new Date(data.timestamp) : null;
        this.missingTimeData = data.missing_time_data;
        this.localTimestamp = data.local_timestamp;
        this.timezone = data.timezone;
        this.seasonId = data.season.id;
        this.seasonYear = data.season.year;
        this.roundId = data.round.id;
        this.roundNumber = data.round.number;
        this.roundName = data.round.name;
        this.circuitId = data.circuit.id;
        this.circuitName = data.circuit.name;
        this.componentKeys = data.component_keys;
        this.results = data.results.map(mapResultItem);
    }

    public override toJSON(): ResultsJson {
        return {
            code: this.code,
            title: this.title,
            timestamp: this.timestamp?.toISOString() ?? null,
            missingTimeData: this.missingTimeData,
            localTimestamp: this.localTimestamp,
            timezone: this.timezone,
            seasonId: this.seasonId,
            seasonYear: this.seasonYear,
            roundId: this.roundId,
            roundNumber: this.roundNumber,
            roundName: this.roundName,
            circuitId: this.circuitId,
            circuitName: this.circuitName,
            componentKeys: this.componentKeys,
            results: this.results,
        };
    }
}

export class AvailableResults extends Model {
    public readonly year: number;
    public readonly roundNumber: number | null;
    public readonly roundName: string | null;
    public readonly availableResults: AvailableResultsItemJson[];

    public constructor(data: AlphaAvailableResultsForRoundData, http: AlphaApi) {
        super(http);

        this.year = data.year;
        this.roundNumber = data.round_number;
        this.roundName = data.round_name;
        this.availableResults = data.available_results.map((item) => ({
            url: item.url,
            type: item.type,
            title: item.title,
        }));
    }

    public override toJSON(): AvailableResultsForRoundJson {
        return {
            year: this.year,
            roundNumber: this.roundNumber,
            roundName: this.roundName,
            availableResults: this.availableResults,
        };
    }
}
