import type { ServerWebSocket } from "bun";
import { Hono } from "hono";
import { createBunWebSocket } from "hono/bun";

const { upgradeWebSocket, websocket } = createBunWebSocket<ServerWebSocket>();

const app = new Hono();

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
        console.log(`Message from client: ${event.data}`);
        ws.send("Hello from server!");
      },
      onClose: () => {
        console.log("Connection closed");
      },
      onOpen: () => {
        console.log("Connection opened");
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
