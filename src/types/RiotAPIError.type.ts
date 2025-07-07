import z from 'zod';

export const RiotAPIErrorSchema = z.object({
    status: z.object({
        message: z.string(),
        status_code: z.number(),
    }),
});

export type RiotAPIError = z.infer<typeof RiotAPIErrorSchema>;
