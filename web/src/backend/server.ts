import attendees from "./attendees.json";

export type Attendee = {
  api_id: string;
  name: string;
  // don't use these, these are some luma thing
  // first_name: string;
  // last_name: string;
  email: string;
  phone_number: string;
  created_at: string;
  approval_status: string;
  custom_source: string;
  checked_in_at: string;
  amount: string;
  amount_tax: string;
  amount_discount: string;
  currency: string;
  coupon_code: string;
  eth_address: string;
  solana_address: string;
  survey_response_rating: string;
  survey_response_feedback: string;
  ticket_type_id: string;
  ticket_name: string;
  pronouns: string;
  program: string;
  graduation_year: string;
  linkedin: string;
  prompt_response: string;
  walking_group: string;
  accomodations: string;
};

export type ProcessedData = {
  [key: string]: Attendee;
};

export const getData = () => {
  return attendees as ProcessedData;
};

export const getAttendeeFromEmail = (email: string) => {
  return getData()[email];
};
