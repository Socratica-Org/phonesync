"use client";
import { Attendee } from "@/utils/server";
import { useEffect, useState } from "react";
import { ProgramMessage, WSMessage } from "../../../server";

interface Props {
  attendee: Attendee;
}

export const Display = ({ attendee }: Props) => {
  const [connected, setConnected] = useState(false);
  const [show, setShow] = useState<ProgramMessage | undefined>();
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/ws?email=${attendee.email}`);

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data) as WSMessage;
      console.log("Received:", message);

      if (message.type === "joined") {
        setConnected(true);
      } else if (message.type === "broadcast-program") {
        setShow(message.msg);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
      setClosed(true);
    };

    return () => ws.close();
  }, [attendee.email]);

  if (!show) {
    return (
      <div
        className="min-h-screen w-full transition-colors duration-1000 grid place-items-center"
        // style={{ backgroundColor: getProgram(attendee.program || "").color }}
      >
        <div className="p-4 rounded-lg backdrop-blur-sm flex flex-col items-center gap-4">
          <div className="text-4xl">⁂</div>
          <div className="text-sm font-mono">
            {closed ? (
              <div className="flex items-center gap-2 text-red-500">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Disconnected
              </div>
            ) : connected ? (
              <div className="flex items-center gap-2 text-emerald-500">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
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
  }

  const s = show.msg;

  return <div className="min-h-screen w-full">{show}</div>;
};
