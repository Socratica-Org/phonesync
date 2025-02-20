import { z } from "zod";

const WSDataSchema = z.object({
  email: z.string().email(),
});

const ProgramMessageSchema = z.enum([
  "math",
  "science",
  "engineering",
  "arts",
  "business",
]);

const BroadcastProgramMessageSchema = z.object({
  msg: ProgramMessageSchema,
});

export type ProgramMessage = z.infer<typeof ProgramMessageSchema>;

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
type WSData = z.infer<typeof WSDataSchema>;
type ServerMessage = z.infer<typeof WSMessageSchema>;

const GLOBAL_TOPIC = "global";

// Helper functions for common responses
const jsonResponse = (data: any, status = 200) =>
  new Response(JSON.stringify(data), { status });

const errorResponse = (message: string, status = 400) =>
  new Response(message, { status });

const server = Bun.serve<WSData>({
  port: 8080,
  async fetch(req, server) {
    const url = new URL(req.url);

    try {
      switch (url.pathname) {
        case "/":
          return new Response("Hello world");

        case "/ws": {
          const email = url.searchParams.get("email");
          const result = WSDataSchema.safeParse({ email });

          if (!result.success) {
            return errorResponse(result.error.message);
          }

          server.upgrade(req, { data: result.data });
          return new Response("WebSocket connection upgraded");
        }

        case "/broadcast-program": {
          if (req.method !== "POST")
            return errorResponse("Method not allowed", 405);

          const body = await req.json();
          const result = BroadcastProgramMessageSchema.safeParse(body);

          if (!result.success) {
            return errorResponse(result.error.message);
          }

          const message: ServerMessage = {
            type: "broadcast-program",
            msg: result.data.msg,
          };

          server.publish(GLOBAL_TOPIC, JSON.stringify(message));
          return jsonResponse({ success: true });
        }

        default:
          return errorResponse("Not found", 404);
      }
    } catch (err) {
      return errorResponse("Internal server error", 500);
    }
  },

  websocket: {
    open(ws) {
      ws.subscribe(GLOBAL_TOPIC);
      const message: ServerMessage = {
        type: "joined",
        email: ws.data.email,
      };
      ws.send(JSON.stringify(message));
    },

    message(ws, message) {
      console.log(`Message from ${ws.data.email}: ${message}`);
      // But we do nothing
    },

    close(ws) {
      ws.unsubscribe(GLOBAL_TOPIC);
    },
  },
});

console.log(`Listening on ${server.hostname}:${server.port}`);
