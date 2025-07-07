import { AxiosInstance } from 'axios';
import { Regions } from '@/constants/Regions';
import { RiotAccount, RiotAccountSchema } from '@/types/RiotAccount.type';

export class AccountModule {
    constructor(private client: AxiosInstance) {}

    public async getPuuidByAccountName(
        gameName: string,
        tagLine: string,
        region: Regions,
    ): Promise<RiotAccount> {
        const response = await this.client.get<RiotAccount>(
            `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
        );

        const validateData = RiotAccountSchema.parse(response.data);

        return validateData;
    }
}
