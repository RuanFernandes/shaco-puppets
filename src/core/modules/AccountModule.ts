import { AxiosInstance } from 'axios';
import { RiotAccount, RiotAccountSchema } from '@/types/RiotAccount.type';
import {
    Regions,
    regionToAccountAPIRegion,
    buildAPIUrl,
} from '@/constants/Regions';

export class AccountModule {
    constructor(private client: AxiosInstance) {}

    public async getPuuidByAccountName(
        gameName: string,
        tagLine: string,
        region: Regions,
    ): Promise<RiotAccount> {
        const apiRegion = regionToAccountAPIRegion(region);
        const baseUrl = buildAPIUrl(apiRegion);

        const response = await this.client.get(
            `${baseUrl}/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`,
        );

        const validatedData = RiotAccountSchema.parse(response.data);

        return validatedData;
    }
}
