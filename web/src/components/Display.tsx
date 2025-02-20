"use client";
import { WSMessage } from "@/server";
import { Attendee } from "@/utils/server";
import { useEffect, useState } from "react";

interface Props {
  attendee: Attendee;
}

export const Display = ({ attendee }: Props) => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/ws?email=${attendee.email}`);

    ws.onmessage = (event: MessageEvent<WSMessage>) => {
      const message = JSON.parse(event.data) as WSMessage;
      console.log("Received:", message);

      if (message.type === "joined") {
        setConnected(true);
      } else if (message.type === "broadcast") {
        console.log(`${message.msg}`);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => ws.close();
  }, [attendee.email]);

  console.log(attendee);
  return (
    <div
      className="min-h-screen w-full transition-colors duration-1000 grid place-items-center"
      // style={{ backgroundColor: getProgram(attendee.program || "").color }}
    >
      <div className="bg-black/10 p-4 rounded-lg backdrop-blur-sm">
        <div className="text-sm font-mono">
          {connected ? (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Connected
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <div>Connecting</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
