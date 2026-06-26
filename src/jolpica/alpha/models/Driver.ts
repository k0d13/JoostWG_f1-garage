import type { AlphaApi } from '../AlphaApi';
import type { AlphaDriverData } from '../types';
import { Model } from './Model';

export interface DriverJson {
    id: string;
    url: string;
    abbreviation: string | null;
    givenName: string;
    familyName: string;
    nationality: string | null;
    countryCode: string | null;
    permanentCarNumber: number | null;
    dateOfBirth: string | null;
    wikipediaUrl: string | null;
}

export class Driver extends Model {
    public readonly id: string;
    public readonly url: string;
    public readonly abbreviation: string | null;
    public readonly givenName: string;
    public readonly familyName: string;
    public readonly nationality: string | null;
    public readonly countryCode: string | null;
    public readonly permanentCarNumber: number | null;
    public readonly dateOfBirth: Date | null;
    public readonly wikipediaUrl: string | null;

    public constructor(data: AlphaDriverData, http: AlphaApi) {
        super(http);

        this.id = data.id;
        this.url = data.url;
        this.abbreviation = data.abbreviation;
        this.givenName = data.given_name;
        this.familyName = data.family_name;
        this.nationality = data.nationality;
        this.countryCode = data.country_code;
        this.permanentCarNumber = data.permanent_car_number;
        this.dateOfBirth = data.date_of_birth !== null ? new Date(data.date_of_birth) : null;
        this.wikipediaUrl = data.wikipedia;
    }

    public get name(): string {
        return `${this.givenName} ${this.familyName}`;
    }

    public get age(): number | null {
        return this.ageAt(new Date());
    }

    public ageAt(date: Date): number | null {
        if (this.dateOfBirth === null) {
            return null;
        }

        const age = date.getFullYear() - this.dateOfBirth.getFullYear();

        if (this.dateOfBirth.getMonth() > date.getMonth()) {
            return age - 1;
        }

        if (
            this.dateOfBirth.getMonth() === date.getMonth()
            && this.dateOfBirth.getDate() > date.getDate()
        ) {
            return age - 1;
        }

        return age;
    }

    public override toJSON(): DriverJson {
        return {
            id: this.id,
            url: this.url,
            abbreviation: this.abbreviation,
            givenName: this.givenName,
            familyName: this.familyName,
            nationality: this.nationality,
            countryCode: this.countryCode,
            permanentCarNumber: this.permanentCarNumber,
            dateOfBirth: this.dateOfBirth?.toISOString().slice(0, 10) ?? null,
            wikipediaUrl: this.wikipediaUrl,
        };
    }
}
