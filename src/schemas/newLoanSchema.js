import { z } from "zod";

export const newLoanSchema = z.object({
  amount: z.number(),
  tenure: z.number(),
});
