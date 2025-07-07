import { QueueValidIDs } from '@/constants/lol/Queues';
import {
    buildAPIUrl,
    Regions,
    regionToAccountAPIRegion,
} from '@/constants/Regions';
import { AxiosInstance } from 'axios';

type MatchHistoryRequestParams = {
    puuid: string;
    searchData: {
        start?: number;
        count?: number;
        queue?: QueueValidIDs;
        startTime?: number;
        endTime?: number;
    };
};

export class LoLMatchModule {
    constructor(private client: AxiosInstance) {}

    public async getMatchHistory(
        data: MatchHistoryRequestParams,
        region: Regions,
    ): Promise<string[]> {
        const apiRegion = regionToAccountAPIRegion(region);
        const baseUrl = buildAPIUrl(apiRegion);

        const response = await this.client.get(
            `${baseUrl}/lol/match/v5/matches/by-puuid/${data.puuid}/ids`,
            {
                params: data.searchData,
            },
        );

        return response.data;
    }
}
