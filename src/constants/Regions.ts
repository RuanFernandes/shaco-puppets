import { z } from 'zod';

export enum Regions {
    BRAZIL = 'br1',
    EU_EAST = 'eun1',
    EU_WEST = 'euw1',
    KOREA = 'kr',
    LAT_NORTH = 'la1',
    LAT_SOUTH = 'la2',
    AMERICA_NORTH = 'na1',
    OCEANIA = 'oc1',
    TURKEY = 'tr1',
    RUSSIA = 'ru',
    JAPAN = 'jp1',
    VIETNAM = 'vn2',
    TAIWAN = 'tw2',
    SINGAPORE = 'sg2',
    MIDDLE_EAST = 'me1',
}

export enum APIRegions {
    AMERICAS = 'americas',
    ASIA = 'asia',
    EUROPE = 'europe',
}

export const RegionsSchema = z.nativeEnum(Regions);
export const APIRegionsSchema = z.nativeEnum(APIRegions);

export type AccountAPIRegions = APIRegions;

export function regionToAPIRegion(region: Regions): APIRegions {
    switch (region) {
        // Americas
        case Regions.AMERICA_NORTH:
        case Regions.BRAZIL:
        case Regions.LAT_NORTH:
        case Regions.LAT_SOUTH:
            return APIRegions.AMERICAS;
        // Europe
        case Regions.EU_EAST:
        case Regions.EU_WEST:
        case Regions.TURKEY:
        case Regions.RUSSIA:
        case Regions.MIDDLE_EAST:
            return APIRegions.EUROPE;
        // Asia
        case Regions.JAPAN:
        case Regions.KOREA:
        case Regions.OCEANIA:
        case Regions.SINGAPORE:
        case Regions.TAIWAN:
        case Regions.VIETNAM:
            return APIRegions.ASIA;
        default:
            throw new Error(`Unknown region: ${region}`);
    }
}

export function regionToAccountAPIRegion(region: Regions): AccountAPIRegions {
    const apiRegion = regionToAPIRegion(region);

    return apiRegion;
}

export function buildAPIUrl(apiRegion: APIRegions): string {
    return `https://${apiRegion}.api.riotgames.com`;
}
