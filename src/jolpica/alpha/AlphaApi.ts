import { AlphaBaseApi } from './AlphaBaseApi';
import { AlphaDetailPendingRequest, AlphaListPendingRequest } from './AlphaPendingRequest';
import {
    AvailableResults,
    Circuit,
    Driver,
    Lap,
    PitStop,
    Results,
    Round,
    Schedule,
    ScheduleSummary,
    Season,
    Session,
    SessionEntry,
    Team,
} from './models';
import type {
    AlphaAvailableResultsForRoundData,
    AlphaCircuitData,
    AlphaDriverData,
    AlphaLapData,
    AlphaPitStopData,
    AlphaResultsData,
    AlphaRoundData,
    AlphaScheduleData,
    AlphaScheduleSummaryData,
    AlphaSeasonData,
    AlphaSessionData,
    AlphaSessionEntryData,
    AlphaTeamData,
} from './types';

export interface CircuitListParams {
    year?: number;
    country_code?: string;
}

export interface DriverListParams {
    year?: number;
    team_id?: string;
    country_code?: string;
    role?: number;
}

export interface TeamListParams {
    year?: number;
    country_code?: string;
}

export interface SeasonListParams {
    circuit_id?: string;
    driver_id?: string;
    team_id?: string;
    country_code?: string;
}

export interface RoundListParams {
    year?: number;
    round_number?: number;
    race_number?: number;
    driver_id?: string;
    team_id?: string;
    is_cancelled?: boolean;
}

export interface SessionListParams {
    year?: number;
    round_id?: string;
    circuit_id?: string;
    session_type?: string;
}

export interface SessionEntryListParams {
    year?: number;
    session_id?: string;
    round_id?: string;
    driver_id?: string;
    team_id?: string;
    session_type?: string;
    position?: number;
    has_session_points?: boolean;
}

export interface LapListParams {
    year?: number;
    session_id?: string;
    session_entry_id?: string;
    driver_id?: string;
    team_id?: string;
    session_type?: string;
    is_fastest_lap?: boolean;
    has_pit_stop?: boolean;
}

export interface PitStopListParams {
    year?: number;
    session_id?: string;
    round_id?: string;
    driver_id?: string;
    team_id?: string;
    lap_number?: number;
    stop_number?: number;
}

export class AlphaApi extends AlphaBaseApi {
    public circuits(params?: CircuitListParams): AlphaListPendingRequest<Circuit> {
        const queryParams = (params ?? {}) as Record<string, unknown>;
        return new AlphaListPendingRequest(
            this,
            '/core/circuits/',
            queryParams,
            (data) => new Circuit(data as AlphaCircuitData, this),
        );
    }

    public circuit(apiId: string): AlphaDetailPendingRequest<Circuit> {
        return new AlphaDetailPendingRequest(
            this,
            `/core/circuits/${apiId}/`,
            (data) => new Circuit(data as AlphaCircuitData, this),
        );
    }

    public drivers(params?: DriverListParams): AlphaListPendingRequest<Driver> {
        const queryParams = (params ?? {}) as Record<string, unknown>;
        return new AlphaListPendingRequest(
            this,
            '/core/drivers/',
            queryParams,
            (data) => new Driver(data as AlphaDriverData, this),
        );
    }

    public driver(apiId: string): AlphaDetailPendingRequest<Driver> {
        return new AlphaDetailPendingRequest(
            this,
            `/core/drivers/${apiId}/`,
            (data) => new Driver(data as AlphaDriverData, this),
        );
    }

    public teams(params?: TeamListParams): AlphaListPendingRequest<Team> {
        const queryParams = (params ?? {}) as Record<string, unknown>;
        return new AlphaListPendingRequest(
            this,
            '/core/teams/',
            queryParams,
            (data) => new Team(data as AlphaTeamData, this),
        );
    }

    public team(apiId: string): AlphaDetailPendingRequest<Team> {
        return new AlphaDetailPendingRequest(
            this,
            `/core/teams/${apiId}/`,
            (data) => new Team(data as AlphaTeamData, this),
        );
    }

    public seasons(params?: SeasonListParams): AlphaListPendingRequest<Season> {
        const queryParams = (params ?? {}) as Record<string, unknown>;
        return new AlphaListPendingRequest(
            this,
            '/core/seasons/',
            queryParams,
            (data) => new Season(data as AlphaSeasonData, this),
        );
    }

    public season(apiId: string): AlphaDetailPendingRequest<Season> {
        return new AlphaDetailPendingRequest(
            this,
            `/core/seasons/${apiId}/`,
            (data) => new Season(data as AlphaSeasonData, this),
        );
    }

    public rounds(params?: RoundListParams): AlphaListPendingRequest<Round> {
        const queryParams = (params ?? {}) as Record<string, unknown>;
        return new AlphaListPendingRequest(
            this,
            '/core/rounds/',
            queryParams,
            (data) => new Round(data as AlphaRoundData, this),
        );
    }

    public round(apiId: string): AlphaDetailPendingRequest<Round> {
        return new AlphaDetailPendingRequest(
            this,
            `/core/rounds/${apiId}/`,
            (data) => new Round(data as AlphaRoundData, this),
        );
    }

    public sessions(params?: SessionListParams): AlphaListPendingRequest<Session> {
        const queryParams = (params ?? {}) as Record<string, unknown>;
        return new AlphaListPendingRequest(
            this,
            '/core/sessions/',
            queryParams,
            (data) => new Session(data as AlphaSessionData, this),
        );
    }

    public session(apiId: string): AlphaDetailPendingRequest<Session> {
        return new AlphaDetailPendingRequest(
            this,
            `/core/sessions/${apiId}/`,
            (data) => new Session(data as AlphaSessionData, this),
        );
    }

    public sessionEntries(params?: SessionEntryListParams): AlphaListPendingRequest<SessionEntry> {
        const queryParams = (params ?? {}) as Record<string, unknown>;
        return new AlphaListPendingRequest(
            this,
            '/core/session-entries/',
            queryParams,
            (data) => new SessionEntry(data as AlphaSessionEntryData, this),
        );
    }

    public sessionEntry(apiId: string): AlphaDetailPendingRequest<SessionEntry> {
        return new AlphaDetailPendingRequest(
            this,
            `/core/session-entries/${apiId}/`,
            (data) => new SessionEntry(data as AlphaSessionEntryData, this),
        );
    }

    public laps(params?: LapListParams): AlphaListPendingRequest<Lap> {
        const queryParams = (params ?? {}) as Record<string, unknown>;
        return new AlphaListPendingRequest(
            this,
            '/core/laps/',
            queryParams,
            (data) => new Lap(data as AlphaLapData, this),
        );
    }

    public lap(apiId: string): AlphaDetailPendingRequest<Lap> {
        return new AlphaDetailPendingRequest(
            this,
            `/core/laps/${apiId}/`,
            (data) => new Lap(data as AlphaLapData, this),
        );
    }

    public pitStops(params?: PitStopListParams): AlphaListPendingRequest<PitStop> {
        const queryParams = (params ?? {}) as Record<string, unknown>;
        return new AlphaListPendingRequest(
            this,
            '/core/pit-stops/',
            queryParams,
            (data) => new PitStop(data as AlphaPitStopData, this),
        );
    }

    public pitStop(apiId: string): AlphaDetailPendingRequest<PitStop> {
        return new AlphaDetailPendingRequest(
            this,
            `/core/pit-stops/${apiId}/`,
            (data) => new PitStop(data as AlphaPitStopData, this),
        );
    }

    public schedules(): AlphaListPendingRequest<ScheduleSummary> {
        return new AlphaListPendingRequest(
            this,
            '/schedules/',
            {},
            (data) => new ScheduleSummary(data as AlphaScheduleSummaryData, this),
        );
    }

    public schedule(year: number | string): AlphaDetailPendingRequest<Schedule> {
        return new AlphaDetailPendingRequest(
            this,
            `/schedules/${year}/`,
            (data) => new Schedule(data as AlphaScheduleData, this),
        );
    }

    public availableResults(roundId: string): AlphaDetailPendingRequest<AvailableResults> {
        return new AlphaDetailPendingRequest(
            this,
            `/results/${roundId}/`,
            (data) => new AvailableResults(data as AlphaAvailableResultsForRoundData, this),
        );
    }

    public results(roundId: string, sessionFilter: string): AlphaDetailPendingRequest<Results> {
        return new AlphaDetailPendingRequest(
            this,
            `/results/${roundId}/${sessionFilter}/`,
            (data) => new Results(data as AlphaResultsData, this),
        );
    }
}
