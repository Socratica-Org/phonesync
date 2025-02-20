import { Display } from "@/components/Display";
import { getAttendeeFromEmail } from "@/utils/server";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const email = (await searchParams).email as string;
  if (!email) {
    return (
      <div className="grid place-items-center min-h-screen">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">No email provided</h1>
          <p className="text-gray-600">
            Please provide an email in the URL parameters
          </p>
        </div>
      </div>
    );
  }

  const attendee = getAttendeeFromEmail(email);
  if (!attendee) {
    return (
      <div className="grid place-items-center min-h-screen">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Attendee not found</h1>
          <p className="text-gray-600">No attendee found with email: {email}</p>
        </div>
      </div>
    );
  }

  return <Display attendee={attendee} />;
}
