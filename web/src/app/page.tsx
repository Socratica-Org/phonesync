import { getAttendeeFromEmail } from "@/backend/server";
import { Display } from "@/components/Display";
import { Landing } from "@/components/Landing";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ email: string }>;
}) {
  const email = (await searchParams).email as string;

  if (!email) {
    return <Landing />;
  }

  const attendee = getAttendeeFromEmail(email);
  if (!attendee) {
    return (
      <div
        className="bg-zinc-950 h-screen w-full transition-colors duration-1000 grid place-items-center"
        style={{
          fontFamily: "Geist",
        }}
      >
        <div className="p-4 px-8 rounded-lg backdrop-blur-sm flex flex-col items-center gap-4 text-center">
          <div className="text-4xl">⁂</div>
          <p className="text-sm text-slate-300">
            {
              "Looks like this link is malformed. Please check the email you used to RSVP and try again."
            }
          </p>
        </div>
      </div>
    );
  }

  return <Display attendee={attendee} />;
}
