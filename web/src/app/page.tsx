import { getProgramColor } from "@/server/color";
import { getAttendeeFromEmail } from "@/server/server";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const email = searchParams.email as string;
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

  console.log(attendee);

  return (
    <div
      className="min-h-screen w-full transition-colors duration-1000"
      style={{ backgroundColor: getProgramColor(attendee.program || "") }}
    >
      <div className="absolute top-4 left-4 bg-black/10 p-4 rounded-lg backdrop-blur-sm">
        <div className="text-sm font-mono">
          <div className="font-bold">{attendee.name}</div>
          <div>{attendee.program || "No Program"}</div>
          <div>Year: {attendee.graduation_year || "N/A"}</div>
        </div>
      </div>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <div className="space-y-4 text-sm font-mono">
            <div>API ID: {attendee.api_id}</div>
            <div>Name: {attendee.name}</div>
            <div>Email: {attendee.email}</div>
            <div>Phone: {attendee.phone_number || "N/A"}</div>
            <div>Created At: {attendee.created_at}</div>
            <div>Approval Status: {attendee.approval_status}</div>
            <div>Custom Source: {attendee.custom_source}</div>
            <div>Checked In At: {attendee.checked_in_at || "N/A"}</div>
            <div>Amount: {attendee.amount}</div>
            <div>Amount Tax: {attendee.amount_tax}</div>
            <div>Amount Discount: {attendee.amount_discount}</div>
            <div>Currency: {attendee.currency}</div>
            <div>Coupon Code: {attendee.coupon_code || "N/A"}</div>
            <div>ETH Address: {attendee.eth_address || "N/A"}</div>
            <div>Solana Address: {attendee.solana_address || "N/A"}</div>
            <div>Survey Rating: {attendee.survey_response_rating || "N/A"}</div>
            <div>
              Survey Feedback: {attendee.survey_response_feedback || "N/A"}
            </div>
            <div>Ticket Type ID: {attendee.ticket_type_id}</div>
            <div>Ticket Name: {attendee.ticket_name}</div>
            <div>Pronouns: {attendee.pronouns || "N/A"}</div>
            <div>Program: {attendee.program || "N/A"}</div>
            <div>Graduation Year: {attendee.graduation_year || "N/A"}</div>
            <div>
              LinkedIn:{" "}
              <a
                href={attendee.linkedin}
                className="text-blue-500 hover:underline"
              >
                {attendee.linkedin || "N/A"}
              </a>
            </div>
            <div>Prompt Response: {attendee.prompt_response || "N/A"}</div>
            <div>Walking Group: {attendee.walking_group || "N/A"}</div>
            <div>Accommodations: {attendee.accomodations || "N/A"}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
