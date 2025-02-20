"use client";
import { parseAttendee } from "@/utils/color";
import { Attendee } from "@/utils/server";
import { useEffect, useMemo, useState } from "react";
import { ProgramTypes, WSMessage } from "../../../server";
import { StatusIndicator } from "./StatusIndicator";

export type ConnectionStatus =
  | "connecting"
  | "connected"
  | "disconnected"
  | "in-progress";

interface Props {
  attendee: Attendee;
}

export const Display = ({ attendee }: Props) => {
  const [status, setStatus] = useState<ConnectionStatus>("connecting");
  const [broadcastProgram, setBroadcastProgram] = useState<
    ProgramTypes | undefined
  >();
  const self = useMemo(
    () => parseAttendee(attendee.program),
    [attendee.program]
  );

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/ws?email=${attendee.email}`);

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data) as WSMessage;
      console.log("Received:", message);

      if (message.type === "joined") {
        setStatus("connected");
      } else if (message.type === "broadcast-program") {
        setBroadcastProgram(message.msg);
        setStatus("in-progress");
      }
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
      setStatus("disconnected");
    };

    return () => ws.close();
  }, [attendee.email]);

  if (!broadcastProgram) {
    return (
      <div className="min-h-screen w-full transition-colors duration-1000 grid place-items-center">
        <div className="p-4 rounded-lg backdrop-blur-sm flex flex-col items-center gap-2">
          <div className="text-4xl">⁂</div>
          <StatusIndicator status={status} />
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full transition-colors duration-1000"
      style={{
        backgroundColor:
          broadcastProgram === "all" || broadcastProgram === self.program.name
            ? self.program.programColor
            : "#000000",
      }}
    >
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <StatusIndicator status={status} />
      </div>
    </div>
  );
};
