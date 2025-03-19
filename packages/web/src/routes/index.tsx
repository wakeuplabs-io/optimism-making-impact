import { withAppInitialization } from '@/hoc/with-app-initialization';
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
  component: withAppInitialization(AppLayout),
  loader: async ({ location: { search } }: { location: { search: IndexRouteSearchParams } }): Promise<IndexRouteSearchParams> =>
    indexRouteSearchParamsSchema.parse(search),
  validateSearch: (search): IndexRouteSearchParams => indexRouteSearchParamsSchema.parse(search),
});
