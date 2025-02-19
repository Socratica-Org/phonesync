import { getAttendeeFromEmail } from "@/server/server";
export default function Home() {
  const attendee = getAttendeeFromEmail("a3sharia@uwaterloo.ca");
  console.log(attendee);

  return (
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
  );
}
