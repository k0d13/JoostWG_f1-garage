import type { AlphaApi } from '../AlphaApi';
import type { AlphaCircuitData } from '../types';
import { Model } from './Model';

export interface CircuitJson {
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
}

export class Circuit extends Model {
    public readonly id: string;
    public readonly url: string;
    public readonly name: string;
    public readonly locality: string | null;
    public readonly countryCode: string | null;
    public readonly country: string | null;
    public readonly latitude: number | null;
    public readonly longitude: number | null;
    public readonly altitude: number | null;
    public readonly wikipediaUrl: string | null;

    public constructor(data: AlphaCircuitData, http: AlphaApi) {
        super(http);

        this.id = data.id;
        this.url = data.url;
        this.name = data.name;
        this.locality = data.locality;
        this.countryCode = data.country_code;
        this.country = data.country;
        this.latitude = data.latitude;
        this.longitude = data.longitude;
        this.altitude = data.altitude;
        this.wikipediaUrl = data.wikipedia;
    }

    public override toJSON(): CircuitJson {
        return {
            id: this.id,
            url: this.url,
            name: this.name,
            locality: this.locality,
            countryCode: this.countryCode,
            country: this.country,
            latitude: this.latitude,
            longitude: this.longitude,
            altitude: this.altitude,
            wikipediaUrl: this.wikipediaUrl,
        };
    }
}
