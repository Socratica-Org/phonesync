"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Landing = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  return (
    <div className="bg-zinc-950 min-h-screen w-full transition-colors duration-1000 grid place-items-center">
      <div className="p-4 px-8 rounded-lg backdrop-blur-sm flex flex-col items-center">
        <div className="text-4xl animate-spin [animation-duration:6s]">⁂</div>
        <p className="text-sm text-slate-100 mt-2 font-medium">
          Socratica Symposium W25
        </p>
        <p className="text-sm text-slate-400 mt-6">
          {"If you're lost, enter the email that you used to RSVP"}
        </p>
        <input
          type="email"
          placeholder="eg. johndoe@uwaterloo.ca"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-3 px-4 w-full md:min-w-96 py-3 rounded-full bg-white/5 text-white placeholder:text-white/40 border border-white/10 transition-all
      shadow-lg backdrop-blur-sm text-sm focus:outline-none focus:ring-2 focus:ring-white/80"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              router.push(`?email=${email}`);
            }
          }}
        />
      </div>
    </div>
  );
};
