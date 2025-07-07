import { RiotAPI, Regions, QUEUE_IDS } from './src';

// # Don't even bother trying my API Key, its a dev api key and i reset it often
// # You can get your own API Key at https://developer.riotgames.com/
const api = new RiotAPI('-- API KEY HERE --');

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
