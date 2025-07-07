import z from 'zod';

export const RiotAccountSchema = z.object({
    puuid: z.string(),
    gameName: z.string(),
    tagLine: z.string(),
});

export type RiotAccount = z.infer<typeof RiotAccountSchema>;
