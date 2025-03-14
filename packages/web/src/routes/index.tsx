import { AppLayout } from '@/layout/app-layout';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

const indexRouteSearchParamsSchema = z.object({
  roundId: z.number().min(1).optional(),
  categoryId: z.number().min(1).optional(),
  stepId: z.number().min(1).optional(),
});

export type IndexRouteSearchParams = z.infer<typeof indexRouteSearchParamsSchema>;

export const Route = createFileRoute('/')({
  component: AppLayout,
  validateSearch: (search): IndexRouteSearchParams => {
    const parsed = indexRouteSearchParamsSchema.safeParse(search);
    return { roundId: parsed.data?.roundId, categoryId: parsed.data?.categoryId, stepId: parsed.data?.stepId };
  },
});
