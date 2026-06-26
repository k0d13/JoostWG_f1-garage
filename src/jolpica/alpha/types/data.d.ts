export interface AlphaPaginationMetadata {
    timestamp: string;
    count: number;
    page_size: number;
    current_page: number;
    total_pages: number;
    next_url: string | null;
    previous_url: string | null;
}

export interface AlphaDetailMetadata {
    timestamp: string;
}

export interface AlphaPaginatedResponse<T> {
    metadata: AlphaPaginationMetadata;
    data: T[];
}

export interface AlphaDetailResponseBody<T> {
    metadata: AlphaDetailMetadata;
    data: T;
}

export interface AlphaCircuitData {
    id: string;
    url: string;
    name: string;
    locality: string | null;
    country_code: string | null;
    country: string | null;
    latitude: number | null;
    longitude: number | null;
    altitude: number | null;
    wikipedia: string | null;
}

export interface AlphaDriverData {
    id: string;
    url: string;
    abbreviation: string | null;
    given_name: string;
    family_name: string;
    nationality: string | null;
    country_code: string | null;
    permanent_car_number: number | null;
    date_of_birth: string | null;
    wikipedia: string | null;
}

export interface AlphaTeamSeasonData {
    id: string;
    url: string;
    year: number;
}

export interface AlphaTeamData {
    id: string;
    url: string;
    name: string;
    primary_color: string | null;
    nationality: string | null;
    country_code: string | null;
    wikipedia: string | null;
    seasons: AlphaTeamSeasonData[];
}

export interface AlphaSeasonData {
    id: string;
    url: string;
    year: number;
    wikipedia: string | null;
}

export interface AlphaRoundCircuitData {
    id: string;
    url: string;
    name: string;
    locality: string | null;
    country_code: string | null;
}

export interface AlphaRoundSeasonData {
    id: string;
    url: string;
    year: number;
}

export interface AlphaRoundSessionData {
    id: string;
    url: string;
    number: number | null;
    type: string;
    type_display: string;
    is_cancelled: boolean;
    scheduled_laps: number | null;
    timestamp: string | null;
    missing_time_data: boolean | null;
    local_timestamp: string | null;
    timezone: string | null;
}

export interface AlphaRoundData {
    id: string;
    url: string;
    number: number | null;
    name: string | null;
    is_cancelled: boolean;
    race_number: number | null;
    wikipedia: string | null;
    circuit: AlphaRoundCircuitData;
    season: AlphaRoundSeasonData;
    sessions: AlphaRoundSessionData[];
}

export interface AlphaSessionRoundData {
    id: string;
    url: string;
    number: number | null;
    name: string | null;
    is_cancelled: boolean;
}

export interface AlphaSessionData {
    id: string;
    url: string;
    number: number | null;
    type: string;
    type_display: string;
    is_cancelled: boolean;
    scheduled_laps: number | null;
    timestamp: string | null;
    missing_time_data: boolean | null;
    local_timestamp: string | null;
    timezone: string | null;
    round: AlphaSessionRoundData;
}

export interface AlphaSessionEntryDriverData {
    id: string;
    url: string;
    abbreviation: string | null;
    given_name: string;
    family_name: string;
}

export interface AlphaSessionEntryTeamData {
    id: string;
    url: string;
    name: string;
    primary_color: string | null;
}

export interface AlphaSessionEntrySessionData {
    id: string;
    url: string;
    number: number | null;
    type: string;
    type_display: string;
    is_cancelled: boolean;
    scheduled_laps: number | null;
}

export interface AlphaSessionEntryRoundData {
    id: string;
    url: string;
    number: number | null;
    name: string | null;
    is_cancelled: boolean;
}

export interface AlphaSessionEntryData {
    id: string;
    url: string;
    position: number | null;
    is_classified: boolean | null;
    status: number | null;
    status_display: string | null;
    points: number | null;
    grid: number | null;
    time: string | null;
    time_display: string | null;
    fastest_lap_rank: number | null;
    laps_completed: number | null;
    session: AlphaSessionEntrySessionData;
    round: AlphaSessionEntryRoundData;
    driver: AlphaSessionEntryDriverData;
    team: AlphaSessionEntryTeamData;
}

export interface AlphaLapSessionEntryData {
    id: string;
    url: string;
}

export interface AlphaLapPitStopData {
    id: string;
    url: string;
    number: number | null;
    duration: string | null;
    duration_display: string | null;
    duration_milliseconds: number | null;
    local_timestamp: string | null;
}

export interface AlphaLapData {
    id: string;
    url: string;
    number: number | null;
    position: number | null;
    time: string | null;
    time_display: string | null;
    time_milliseconds: number | null;
    average_speed: number | null;
    is_entry_fastest_lap: boolean;
    session_entry: AlphaLapSessionEntryData;
    pit_stop: AlphaLapPitStopData | null;
}

export interface AlphaPitStopDriverData {
    id: string;
    url: string;
    abbreviation: string | null;
    given_name: string;
    family_name: string;
}

export interface AlphaPitStopTeamData {
    id: string;
    url: string;
    name: string;
    primary_color: string | null;
}

export interface AlphaPitStopSessionData {
    id: string;
    url: string;
    number: number | null;
    type: string;
    type_display: string;
    is_cancelled: boolean;
    scheduled_laps: number | null;
}

export interface AlphaPitStopRoundData {
    id: string;
    url: string;
    number: number | null;
    name: string | null;
    is_cancelled: boolean;
}

export interface AlphaPitStopSeasonData {
    id: string;
    url: string;
    year: number;
}

export interface AlphaPitStopLapData {
    id: string;
    url: string;
    number: number | null;
    position: number | null;
    time: string | null;
}

export interface AlphaPitStopData {
    id: string;
    url: string;
    number: number | null;
    duration: string | null;
    duration_display: string | null;
    duration_milliseconds: number | null;
    local_timestamp: string | null;
    driver: AlphaPitStopDriverData;
    team: AlphaPitStopTeamData;
    session: AlphaPitStopSessionData;
    round: AlphaPitStopRoundData;
    season: AlphaPitStopSeasonData;
    lap: AlphaPitStopLapData | null;
}

export interface AlphaScheduleSummaryData {
    id: string;
    url: string;
    year: number;
    wikipedia: string | null;
}

export interface AlphaBasicSessionData {
    id: string;
    url: string;
    number: number | null;
    type: string;
    type_display: string;
    is_cancelled: boolean;
    scheduled_laps: number | null;
}

export interface AlphaScheduleFullSessionData {
    code: string;
    title: string;
    sessions: AlphaBasicSessionData[];
    timestamp: string | null;
    missing_time_data: boolean | null;
    local_timestamp: string | null;
    timezone: string | null;
}

export interface AlphaScheduleRoundInfoDetailData {
    number: number;
    index: number;
}

export interface AlphaScheduleRoundsInfoData {
    next: AlphaScheduleRoundInfoDetailData | null;
    previous: AlphaScheduleRoundInfoDetailData | null;
}

export interface AlphaScheduleEventData {
    round: AlphaRoundData;
    circuit: AlphaCircuitData;
    schedule: AlphaScheduleFullSessionData[];
}

export interface AlphaScheduleData {
    id: string;
    url: string;
    year: number;
    wikipedia: string | null;
    rounds_info: AlphaScheduleRoundsInfoData | null;
    events: AlphaScheduleEventData[];
}

export interface AlphaBasicDriverData {
    id: string;
    url: string;
    abbreviation: string | null;
    given_name: string;
    family_name: string;
}

export interface AlphaBasicTeamData {
    id: string;
    url: string;
    name: string;
    primary_color: string | null;
}

export interface AlphaResultComponentData {
    key: string;
    name: string;
    position: number | null;
    time: string | null;
}

export interface AlphaResultItemData {
    driver: AlphaBasicDriverData;
    team: AlphaBasicTeamData;
    position: number | null;
    position_text: string | null;
    time: string | null;
    is_classified: boolean | null;
    status: string | null;
    points: number | null;
    laps: number | null;
    car_number: number | null;
    components: Record<string, AlphaResultComponentData>;
}

export interface AlphaRoundData_Basic {
    id: string;
    url: string;
    number: number | null;
    name: string | null;
    is_cancelled: boolean;
    race_number: number | null;
    wikipedia: string | null;
}

export interface AlphaResultsData {
    code: string;
    title: string;
    sessions: AlphaBasicSessionData[];
    timestamp: string | null;
    missing_time_data: boolean | null;
    local_timestamp: string | null;
    timezone: string | null;
    season: AlphaSeasonData;
    round: AlphaRoundData_Basic;
    circuit: AlphaCircuitData;
    component_keys: string[];
    results: AlphaResultItemData[];
}

export interface AlphaAvailableResultsItemData {
    url: string;
    type: string;
    title: string;
}

export interface AlphaAvailableResultsForRoundData {
    year: number;
    round_number: number | null;
    round_name: string | null;
    available_results: AlphaAvailableResultsItemData[];
}
