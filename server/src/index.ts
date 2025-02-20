import type { ServerWebSocket } from "bun";
import { Hono } from "hono";
import { createBunWebSocket } from "hono/bun";
import { WSContext } from "hono/ws";

type ShowType = "math" | "engineering" | "science" | "arts";
type WSData = { email: string };
type Connection = WSContext<ServerWebSocket<WSData>>;

const { upgradeWebSocket, websocket } =
  createBunWebSocket<ServerWebSocket<WSData>>();

const app = new Hono();
const connectedClients = new Set<Connection>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/connections", (c) => {
  return c.json({ count: connectedClients.size });
});

// Admin broadcast endpoint
app.post("/broadcast", async (c) => {
  const body = await c.req.json();
  const show = body.show as ShowType;

  // Broadcast to all connected clients
  connectedClients.forEach((client) => {
    client.send(show);
  });

  return c.json({ success: true, clientCount: connectedClients.size });
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get(
  "/ws",
  upgradeWebSocket((c) => {
    const email = c.req.query("email");
    console.log(`Client connected with email: ${email}`);
    return {
      onMessage(event, ws) {
        console.log(`Message from client: ${event.data} from ${email}`);
        ws.send("Hello from server!");
      },
      onClose: (evt, ws) => {
        console.log("Connection closed");
        connectedClients.delete(ws);
      },
      onOpen: (evt, ws) => {
        console.log("Connection opened");
        connectedClients.add(ws);
      },
      onError: (error) => {
        console.error("WebSocket error:", error);
      },
    };
  })
);

export default {
  port: 8080,
  fetch: app.fetch,
  websocket,
};
