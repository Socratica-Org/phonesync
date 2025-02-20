"use client";
import { Attendee } from "@/utils/server";
import { useEffect, useState } from "react";
import { ProgramMessage, WSMessage } from "../../../server";
import { StatusIndicator } from "./StatusIndicator";

export type ConnectionStatus = "connecting" | "connected" | "disconnected";

interface Props {
  attendee: Attendee;
}

export const Display = ({ attendee }: Props) => {
  const [status, setStatus] = useState<ConnectionStatus>("connecting");
  const [show, setShow] = useState<ProgramMessage | undefined>();

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/ws?email=${attendee.email}`);

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data) as WSMessage;
      console.log("Received:", message);

      if (message.type === "joined") {
        setStatus("connected");
      } else if (message.type === "broadcast-program") {
        setShow(message.msg);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
      setStatus("disconnected");
    };

    return () => ws.close();
  }, [attendee.email]);

  if (show) {
    return <div className="min-h-screen w-full">{show}</div>;
  }

  return (
    <div className="min-h-screen w-full transition-colors duration-1000 grid place-items-center">
      <div className="p-4 rounded-lg backdrop-blur-sm flex flex-col items-center gap-4">
        <div className="text-4xl">⁂</div>
        <StatusIndicator status={status} />
      </div>
    </div>
  );
};
