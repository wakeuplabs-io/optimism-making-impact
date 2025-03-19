import { RefinementCtx, z } from 'zod';

export const idParamsSchema = z.object({
  id: z.string().transform(Number),
});

export function idValidator(fieldName: string) {
  return function (value: number, ctx: RefinementCtx) {
    if (value <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `${fieldName} must be a positive number`,
      });
    }
  };
}
