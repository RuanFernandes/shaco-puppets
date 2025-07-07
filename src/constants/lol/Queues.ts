export interface QueueInfo {
    queueId: QueueValidIDs;
    map: string;
    description: string;
}

// Queue ID Constants
export const QUEUE_IDS = {
    // Custom Games
    CUSTOM: 0,

    // Summoner's Rift - Normal
    SUMMONERS_RIFT_DRAFT: 400,
    SUMMONERS_RIFT_BLIND: 430,
    SUMMONERS_RIFT_QUICKPLAY: 490,

    // Summoner's Rift - Ranked
    SUMMONERS_RIFT_RANKED_SOLO: 420,
    SUMMONERS_RIFT_RANKED_FLEX: 440,

    // ARAM
    ARAM: 450,

    // URF Modes
    ARURF: 900,
    SNOW_ARURF: 1010,
    PICK_URF: 1900,

    // Special Modes
    ONE_FOR_ALL: 1020,
    ULTIMATE_SPELLBOOK: 1400,

    // Arena
    ARENA: 1700,

    // Nexus Blitz
    NEXUS_BLITZ: 1300,
} as const;

// Queue Type Categories
export const QUEUE_TYPES = {
    RANKED: [
        QUEUE_IDS.SUMMONERS_RIFT_RANKED_SOLO,
        QUEUE_IDS.SUMMONERS_RIFT_RANKED_FLEX,
    ],
    NORMAL: [
        QUEUE_IDS.SUMMONERS_RIFT_DRAFT,
        QUEUE_IDS.SUMMONERS_RIFT_BLIND,
        QUEUE_IDS.SUMMONERS_RIFT_QUICKPLAY,
    ],
    URF: [QUEUE_IDS.ARURF, QUEUE_IDS.SNOW_ARURF, QUEUE_IDS.PICK_URF],
    SPECIAL: [
        QUEUE_IDS.ONE_FOR_ALL,
        QUEUE_IDS.ULTIMATE_SPELLBOOK,
        QUEUE_IDS.NEXUS_BLITZ,
    ],
    ARAM: [QUEUE_IDS.ARAM],
    ARENA: [QUEUE_IDS.ARENA],
    CUSTOM: [QUEUE_IDS.CUSTOM],
} as const;

// Active League of Legends game modes
export const QUEUES: QueueInfo[] = [
    // Custom Games
    {
        queueId: QUEUE_IDS.CUSTOM,
        map: 'Custom',
        description: 'Custom Game',
    },
    // Summoner's Rift - Normal
    {
        queueId: QUEUE_IDS.SUMMONERS_RIFT_DRAFT,
        map: "Summoner's Rift",
        description: 'Draft Pick',
    },
    {
        queueId: QUEUE_IDS.SUMMONERS_RIFT_BLIND,
        map: "Summoner's Rift",
        description: 'Blind Pick',
    },
    {
        queueId: QUEUE_IDS.SUMMONERS_RIFT_QUICKPLAY,
        map: "Summoner's Rift",
        description: 'Quickplay',
    },
    // Summoner's Rift - Ranked
    {
        queueId: QUEUE_IDS.SUMMONERS_RIFT_RANKED_SOLO,
        map: "Summoner's Rift",
        description: 'Ranked Solo/Duo',
    },
    {
        queueId: QUEUE_IDS.SUMMONERS_RIFT_RANKED_FLEX,
        map: "Summoner's Rift",
        description: 'Ranked Flex',
    },
    // ARAM
    {
        queueId: QUEUE_IDS.ARAM,
        map: 'Howling Abyss',
        description: 'ARAM',
    },
    // URF Modes
    {
        queueId: QUEUE_IDS.ARURF,
        map: "Summoner's Rift",
        description: 'ARURF',
    },
    {
        queueId: QUEUE_IDS.SNOW_ARURF,
        map: "Summoner's Rift",
        description: 'Snow ARURF',
    },
    {
        queueId: QUEUE_IDS.PICK_URF,
        map: "Summoner's Rift",
        description: 'Pick URF',
    },
    // Special Modes
    {
        queueId: QUEUE_IDS.ONE_FOR_ALL,
        map: "Summoner's Rift",
        description: 'One for All',
    },
    {
        queueId: QUEUE_IDS.ULTIMATE_SPELLBOOK,
        map: "Summoner's Rift",
        description: 'Ultimate Spellbook',
    },
    // Arena
    {
        queueId: QUEUE_IDS.ARENA,
        map: 'Rings of Wrath',
        description: 'Arena',
    },
    // Nexus Blitz
    {
        queueId: QUEUE_IDS.NEXUS_BLITZ,
        map: 'Nexus Blitz',
        description: 'Nexus Blitz',
    },
];

// Union type of active queue IDs
export type QueueValidIDs =
    | 0
    | 400
    | 420
    | 430
    | 440
    | 450
    | 490
    | 900
    | 1010
    | 1020
    | 1300
    | 1400
    | 1700
    | 1900;

// Map for fast queue lookup by queueId
const QUEUE_MAP = new Map<number, QueueInfo>();
QUEUES.forEach((queue) => {
    QUEUE_MAP.set(queue.queueId, queue);
});

/**
 * Gets queue information by queue ID
 * @param queueId Queue ID to search for
 * @returns Queue information or undefined if not found
 */
export function getQueueInfo(queueId: number): QueueInfo | undefined {
    return QUEUE_MAP.get(queueId);
}

/**
 * Gets the map name for a queue by ID
 * @param queueId Queue ID to search for
 * @returns Map name or undefined if not found
 */
export function getQueueMap(queueId: number): string | undefined {
    return QUEUE_MAP.get(queueId)?.map;
}

/**
 * Gets the description for a queue by ID
 * @param queueId Queue ID to search for
 * @returns Queue description or undefined if not found
 */
export function getQueueDescription(queueId: number): string | undefined {
    return QUEUE_MAP.get(queueId)?.description;
}

/**
 * Returns all queues for a specific map
 * @param mapName Name of the map
 * @returns Array with all queues for the specified map
 */
export function getQueuesByMap(mapName: string): QueueInfo[] {
    return QUEUES.filter((queue) => queue.map === mapName);
}

/**
 * Checks if a queue ID is valid
 * @param queueId Queue ID to check
 * @returns true if the queue exists, false otherwise
 */
export function isValidQueueId(queueId: number): queueId is QueueValidIDs {
    return QUEUE_MAP.has(queueId);
}

/**
 * Gets all queues of a specific type
 * @param queueType Type of queue (RANKED, NORMAL, URF, etc.)
 * @returns Array of queue IDs for the specified type
 */
export function getQueuesByType(
    queueType: keyof typeof QUEUE_TYPES,
): readonly number[] {
    return QUEUE_TYPES[queueType];
}

/**
 * Checks if a queue ID belongs to a specific type
 * @param queueId Queue ID to check
 * @param queueType Type to check against
 * @returns true if the queue belongs to the specified type
 */
export function isQueueOfType(
    queueId: number,
    queueType: keyof typeof QUEUE_TYPES,
): boolean {
    const queues = QUEUE_TYPES[queueType] as readonly number[];
    return queues.includes(queueId);
}

/**
 * Gets the queue type for a given queue ID
 * @param queueId Queue ID to check
 * @returns The queue type or undefined if not found
 */
export function getQueueType(
    queueId: number,
): keyof typeof QUEUE_TYPES | undefined {
    for (const [type, queues] of Object.entries(QUEUE_TYPES)) {
        if ((queues as readonly number[]).includes(queueId)) {
            return type as keyof typeof QUEUE_TYPES;
        }
    }
    return undefined;
}
