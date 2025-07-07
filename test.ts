import { RiotAPI, Regions } from './src';

const api = new RiotAPI('RGAPI-14550984-b496-4381-af3d-4ced8351c444');

const account = await api.account.getPuuidByAccountName(
    'Nullborne',
    'OBLIV',
    Regions.BRAZIL,
);

console.log('Account PU!UID:', account.puuid);
