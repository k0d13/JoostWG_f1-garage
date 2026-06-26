import { QueryBuilder } from './QueryBuilder';

export interface OpenF1ApiOptions {
    fetch?: typeof globalThis.fetch;
}

export class OpenF1Api {
    private readonly fetch: typeof globalThis.fetch;

    public constructor(options?: OpenF1ApiOptions) {
        this.fetch = options?.fetch ?? globalThis.fetch;
    }

    public carData(): QueryBuilder<'car_data'> {
        return new QueryBuilder('car_data', this.fetch);
    }

    public driversChampionships(): QueryBuilder<'championship_drivers'> {
        return new QueryBuilder('championship_drivers', this.fetch);
    }

    public teamsChampionships(): QueryBuilder<'championship_teams'> {
        return new QueryBuilder('championship_teams', this.fetch);
    }

    public drivers(): QueryBuilder<'drivers'> {
        return new QueryBuilder('drivers', this.fetch);
    }

    public intervals(): QueryBuilder<'intervals'> {
        return new QueryBuilder('intervals', this.fetch);
    }

    public laps(): QueryBuilder<'laps'> {
        return new QueryBuilder('laps', this.fetch);
    }

    public location(): QueryBuilder<'location'> {
        return new QueryBuilder('location', this.fetch);
    }

    public meetings(): QueryBuilder<'meetings'> {
        return new QueryBuilder('meetings', this.fetch);
    }

    public overtakes(): QueryBuilder<'overtakes'> {
        return new QueryBuilder('overtakes', this.fetch);
    }

    public pit(): QueryBuilder<'pit'> {
        return new QueryBuilder('pit', this.fetch);
    }

    public position(): QueryBuilder<'position'> {
        return new QueryBuilder('position', this.fetch);
    }

    public raceControl(): QueryBuilder<'race_control'> {
        return new QueryBuilder('race_control', this.fetch);
    }

    public sessions(): QueryBuilder<'sessions'> {
        return new QueryBuilder('sessions', this.fetch);
    }

    public sessionResult(): QueryBuilder<'session_result'> {
        return new QueryBuilder('session_result', this.fetch);
    }

    public startingGrid(): QueryBuilder<'starting_grid'> {
        return new QueryBuilder('starting_grid', this.fetch);
    }

    public stints(): QueryBuilder<'stints'> {
        return new QueryBuilder('stints', this.fetch);
    }

    public teamRadio(): QueryBuilder<'team_radio'> {
        return new QueryBuilder('team_radio', this.fetch);
    }

    public weather(): QueryBuilder<'weather'> {
        return new QueryBuilder('weather', this.fetch);
    }
}
