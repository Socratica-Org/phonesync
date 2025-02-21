import {
  BroadcastProgramMessageSchema,
  WSDataSchema,
  type ServerMessage,
  type WSData,
} from "./types";

const GLOBAL_TOPIC = "global";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*",
  "Access-Control-Allow-Headers": "*",
};

// Helper functions for common responses
const jsonResponse = (data: any, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: corsHeaders,
  });

const errorResponse = (message: string, status = 400) =>
  new Response(message, {
    status,
    headers: corsHeaders,
  });

const server = Bun.serve<WSData>({
  port: process.env.PORT ? parseInt(process.env.PORT) : 10000,
  async fetch(req, server) {
    const url = new URL(req.url);

    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      switch (url.pathname) {
        case "/":
          return new Response("Hello world");

        case "/ws": {
          const email = url.searchParams.get("email");
          console.log(`Websocket join request from ${email}`);
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

          console.log(`Broadcasting program ${result.data.program}`);

          const message: ServerMessage = {
            type: "broadcast-program",
            msg: result.data.program,
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
