import axios, { AxiosInstance } from 'axios';
import { AccountModule } from '@/core/modules/AccountModule';
import { LoLMatchModule } from './modules/lol/MatchModule';

type LeagueModule = {
    match: LoLMatchModule;
};

export class RiotAPI {
    private axiosInstance: AxiosInstance;
    public readonly account: AccountModule;
    public readonly league: LeagueModule;

    constructor(apiKey: string) {
        this.axiosInstance = axios.create({
            timeout: 10000,
        });

        this.axiosInstance.interceptors.request.use((config) => {
            config.headers['X-Riot-Token'] = apiKey;
            return config;
        });

        // Initialize modules
        this.account = new AccountModule(this.axiosInstance);
        this.league = {
            match: new LoLMatchModule(this.axiosInstance),
        };
    }

    public get client(): AxiosInstance {
        return this.axiosInstance;
    }
}
