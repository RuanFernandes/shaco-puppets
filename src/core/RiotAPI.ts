import axios, { AxiosInstance } from 'axios';
import { AccountModule } from '@/core/modules/AccountModule';

export class RiotAPI {
    private axiosInstance: AxiosInstance;
    public readonly account: AccountModule;

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
    }

    public get client(): AxiosInstance {
        return this.axiosInstance;
    }
}
