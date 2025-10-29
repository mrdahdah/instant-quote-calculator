import { z } from 'zod';

export const QuoteInputSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  selections: z.object({
    serviceType: z.enum(['wiring', 'lighting', 'fuseRepair', 'inspection']),
    urgency: z.enum(['same_day', '24h', 'flexible']),
    distanceKm: z.number().min(0),
    extras: z.array(z.object({ id: z.string(), price: z.number().min(0) })).optional()
  })
});

export type QuoteInput = z.infer<typeof QuoteInputSchema>;
