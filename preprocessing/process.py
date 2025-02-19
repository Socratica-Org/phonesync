import csv
import json
from typing import Any, Dict, List, Tuple

# Field mapping from CSV column indices to desired JSON keys
# Format: (column_index, new_key_name)
FIELD_MAPPING: List[Tuple[int, str]] = [
    (21, 'pronouns'),              # Pronouns
    (22, 'program'),              # Program (if applicable)
    (23, 'graduation_year'),      # Graduation year (if applicable)
    (24, 'linkedin'),             # Linkedin
    (25, 'prompt_response'),      # If you had no other obligations...
    (26, 'walking_group'),        # To add to the fun...
    (27, 'accomodations'),        # Please let us know about any accommodations...
]

# Original field names to keep (by index)
LUMA_FIELDS = {
    0: 'api_id',
    1: 'name',
    2: 'first_name', 
    3: 'last_name',
    4: 'email',
    5: 'phone_number',
    6: 'created_at',
    7: 'approval_status',
    8: 'custom_source',
    9: 'checked_in_at',
    10: 'amount',
    11: 'amount_tax', 
    12: 'amount_discount',
    13: 'currency',
    14: 'coupon_code',
    15: 'eth_address',
    16: 'solana_address',
    17: 'survey_response_rating',
    18: 'survey_response_feedback',
    19: 'ticket_type_id',
    20: 'ticket_name'
}

def process_csv(input_file: str, output_file: str) -> None:
    """
    Process the CSV file and create a JSON with email as key
    
    Args:
        input_file (str): Path to input CSV file
        output_file (str): Path to output JSON file
    """
    attendees: Dict[str, Any] = {}
    
    with open(input_file, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        next(reader)  # Skip header row
        
        for row in reader:
            email = row[4]  # Email is at index 4
            if not email:  # Skip if no email
                print(f"Skipping row with no email: {row}")
                continue
                
            # Create attendee object
            attendee = {}
            
            # Add Luma system fields
            for idx, key in LUMA_FIELDS.items():
              attendee[key] = row[idx]
            
            # Add mapped fields
            for idx, key in FIELD_MAPPING:
                attendee[key] = row[idx]
            
            # Add to attendees dict with email as key
            attendees[email] = attendee
    
    # Write to JSON file
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(attendees, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    process_csv('luma.csv', 'attendees.json')
