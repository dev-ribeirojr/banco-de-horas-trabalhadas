import { z } from "zod";

export const schemaFormHors = z.object({
  date: z.string().nonempty(),
  start: z.string().nonempty(),
  startInterval: z.string().nonempty(),
  endInterval: z.string().nonempty(),
  end: z.string().nonempty(),
});
