import { z } from "zod";

export const verifyCodeSchema = z.object({
  email: z.string(),
  code: z.string(),
});
