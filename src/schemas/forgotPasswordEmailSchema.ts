import { z } from "zod";

export const forgotPasswordEmail = z.object({
  email: z.string().email(),
});
