import { RiotAPI, Regions, QUEUE_IDS } from './src';

const api = new RiotAPI('RGAPI-14550984-b496-4381-af3d-4ced8351c444');

const account = await api.account.getPuuidByAccountName(
    'Nullborne',
    'OBLIV',
    Regions.BRAZIL,
);

const { puuid } = account;

const matchHistory = await api.league.match.getMatchHistory(
    {
        puuid,
        searchData: {
            queue: QUEUE_IDS.SUMMONERS_RIFT_QUICKPLAY,
        },
    },
    Regions.BRAZIL,
);

console.log('Match History:', matchHistory);
