"use client";

import { useEffect, useRef } from "react";

function Page() {
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8787/ws?email=test@example.com");
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("Connected to server");
    };

    ws.onmessage = (event) => {
      console.log("Message from server:", event.data);
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send("Test message");
    }
  };

  return (
    <div>
      <ul></ul>
      <button
        onClick={sendMessage}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Send Test Message
      </button>
    </div>
  );
}

export default Page;
