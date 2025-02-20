"use client";

import { ProgramMessageSchema } from "@/backend/types";
import { z } from "zod";

const HTTP_URL = process.env.NEXT_PUBLIC_HTTP_URL;
if (!HTTP_URL) {
  throw new Error("NEXT_PUBLIC_HTTP_URL is not set");
}

export default function AdminPage() {
  const programs = ProgramMessageSchema.options;

  const handleClick = async (program: z.infer<typeof ProgramMessageSchema>) => {
    try {
      const res = await fetch(`${HTTP_URL}/broadcast-program`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ program }),
      });
      if (!res.ok) throw new Error("Failed to broadcast program");
    } catch (err) {
      console.error("Error broadcasting program:", err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Lightshow Control Panel</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {programs.map((program) => (
          <button
            key={program}
            onClick={() => handleClick(program)}
            className="bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded-lg font-medium capitalize"
          >
            {program}
          </button>
        ))}
      </div>
    </div>
  );
}
