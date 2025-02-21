import { z } from "zod";

export const WSDataSchema = z.object({
  email: z.string().email(),
});

export const ProgramMessageSchema = z.enum([
  "math",
  "science",
  "engineering",
  "arts",
  "business",
  "unknown",
  "all",
  "none",
]);

export const BroadcastProgramMessageSchema = z.object({
  program: ProgramMessageSchema,
});

export type ProgramTypes = z.infer<typeof ProgramMessageSchema>;

const WSMessageSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("joined"),
    email: z.string().email(),
  }),
  z.object({
    type: z.literal("broadcast-program"),
    msg: ProgramMessageSchema,
  }),
  // TODO: Add year, interests, etc.
  // TODO: Add year, interests, etc.
]);

export type WSMessage = z.infer<typeof WSMessageSchema>;
export type WSData = z.infer<typeof WSDataSchema>;
export type ServerMessage = z.infer<typeof WSMessageSchema>;
