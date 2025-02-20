import { z } from "zod";

const WSDataSchema = z.object({
  email: z.string().email(),
});

const BroadcastMessageSchema = z.object({
  send: z.string().min(1),
});

type WSData = z.infer<typeof WSDataSchema>;
type BroadcastMessage = z.infer<typeof BroadcastMessageSchema>;

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

        case "/broadcast": {
          if (req.method !== "POST")
            return errorResponse("Method not allowed", 405);

          const body = await req.json();
          const result = BroadcastMessageSchema.safeParse(body);

          if (!result.success) {
            return errorResponse(result.error.message);
          }

          server.publish(GLOBAL_TOPIC, result.data.send);
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
      server.publish(GLOBAL_TOPIC, `${ws.data.email} has entered the chat`);
    },

    message(ws, message) {
      console.log(`Message from ${ws.data.email}: ${message}`);
      // But we do nothing
    },

    close(ws) {
      server.publish(GLOBAL_TOPIC, `${ws.data.email} has left the chat`);
      ws.unsubscribe(GLOBAL_TOPIC);
    },
  },
});

console.log(`Listening on ${server.hostname}:${server.port}`);
