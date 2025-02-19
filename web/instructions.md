# Project Overview

# Symposium Project Overview

## Event Details

​The world is made of passion projects. We're showcasing 70+ projects in a hockey arena for our largest demo day yet. From robots factories to short films, fusion to digital art, essays to companies (and everything in between). ​See the projects, meet the creators, hear the lore. Space is limited. RSVP is required.

​The Symposium is a celebration where everyone plays a part! When you join us, you're more than just an attendee; you're a host, a friend, a potential collaborator. ​​⁂ Socratica is an open collective of makers, artists, founders, researchers, designers, and everything in-between. A safe space for our shared love of making things.

- Attendees: 2,500
- Location: Community center/hockey arena
- Primary Constraint: Limited WiFi infrastructure

## What we want to achieve: Core Light Show System

- We have a very diverse attendees that are coming from different programs and from different years of university, with different interests, ie. response to the question: "If you had no other obligations, what would you spend your time trying/creating? (we use this to match you with other attendees! more detail = better match :) )".
- We want to show the audience how diverse they are during the intermission of the event. We play to have a unique link sent to each participant (identified by their Luma registration ID), which they will open on their smartphone.
- Then we want to show a visualization of the diversity of the audience by synchronizing all the smartphones:
  - Start with all phones showing a single soft white light
  - Then cascade through colors based on their program (Engineering = blue, Arts = red, etc.)
  - Create waves of light that move across the arena by timing phone transitions
  - Show the literal distribution of years (1st years light up, then 2nd years join, etc.)

### Basic Architecture

- Synchronized phone light display system
- Color system for attribute identification
- Can work with slow/minimal internet connections
- Web-based implementation

---

# **Symposium Light Show System - Design & Prototype Overview**

## **Project Overview**

The Symposium Light Show System is a synchronized smartphone-based light display designed to showcase audience diversity at a live event. Each attendee's phone will participate in a coordinated light show, visualizing different attributes (e.g., academic program, year of study). The system must function reliably in a venue with **limited WiFi infrastructure** and must work **flawlessly on event day**.

## **Chosen Approach for Prototype**

### **Timestamp-Based Sync with Manual Trigger**

We will first prototype a **timestamp-based synchronization system**, where each phone receives a preloaded sequence and executes it locally. A manual trigger (visible or audible cue from the presenter) will be used to start the sequence at the correct moment.

### **Why This Approach?**

- **No reliance on continuous network connection** (works even if WiFi drops).
- **Scales well to 2,500+ attendees** with minimal server interaction.
- **Simple to prototype and test** using JavaScript and a web-based frontend.
- **Manual backup option** ensures synchronization even if devices have clock drift.

## **Prototype Features**

### **1. Web-Based Light Display (Frontend)**

- A webpage that opens full-screen and displays a color based on event cues.
- Accepts a **start timestamp** as a URL parameter (`?start=1700000000`).
- Uses JavaScript `setTimeout()` to transition colors at precise times.

### **2. Start Time Distribution (Backend or Static Generation)**

- Users receive a unique **URL with a predefined start time**.
- Alternatively, the page fetches the event start time from a lightweight API.

### **3. Color Transition Sequences**

- **Initial State:** All screens start with a soft white light.
- **Phase 1:** Colors change based on academic program (e.g., Engineering = blue, Arts = red).
- **Phase 2:** Waves of colors move across the arena in a predefined pattern.
- **Phase 3:** Light up based on attendee year (1st years, then 2nd years, etc.).

## **Implementation Plan**

### **Phase 1: Core Functionality**

✔ Build a simple HTML page that changes colors based on a preset timeline.  
✔ Implement `setTimeout()` in JavaScript for local execution.  
✔ Allow URL parameters to define the start time.

### **Phase 2: Testing & Refinement**

✔ Simulate multiple devices to check for drift or latency issues.  
✔ Test in a real-world environment to ensure visibility and accuracy.  
✔ Refine manual trigger synchronization (e.g., presenter countdown or visible cue).

### **Phase 3: Deployment & Backup Plan**

✔ Distribute URLs to attendees before the event.  
✔ Establish a **backup method** (e.g., audio or visual cue) for synchronizing late joiners.  
✔ Ensure presenters are trained on the cue timing.

---

Building:

**Important files:**

- **luma.csv** - registration list of attendees with their Luma. Located in the root directory.

### **CSV File Format Description**

This CSV file contains **1,748 entries** with **28 columns**, representing attendee information for the event. Below is a breakdown of its format to help an AI process it effectively.

#### **Key Attributes**

1. **Identifiers:**

   - `api_id` → Unique identifier for each attendee.
   - `name`, `first_name`, `last_name` → Attendee's name.
   - `email` → Contact email.
   - `phone_number` → Mostly empty (likely unused).

2. **Event-Related Fields:**

   - `created_at` → Timestamp when the attendee registered.
   - `approval_status` → Registration status (e.g., "approved").
   - `checked_in_at` → Empty (likely for event check-in tracking).

3. **Ticket Information:**

   - `ticket_type_id` → Unique ticket type identifier.
   - `ticket_name` → Ticket category (e.g., "Student," "Community Member").

4. **Attendee Attributes:**

   - `Pronouns` → Preferred pronouns.
   - `Program (if applicable)` → University program (varies).
   - `Graduation year (if applicable)` → Year of graduation.

5. **Social & Networking:**

   - `Linkedin` → LinkedIn profile (or "n/a" if not provided).
   - `If you had no other obligations, what would you spend your time trying/creating?` → Open-ended response used for attendee matching.

6. **Logistics & Accommodations:**
   - `To add to the fun, we are organizing walking groups...` → Optional selection for group walks to the venue.
   - `Please let us know about any accommodations...` → Dietary, accessibility, or special needs.

#### **AI Processing Considerations**

- **Missing Data:** Some fields (like `phone_number`, `checked_in_at`, and `survey_response_*`) are mostly empty.
- **Text Fields:** Open-ended responses (such as "What would you spend your time trying/creating?") can be useful for clustering attendees based on interests.
- **Categorical Data:** Fields like `ticket_name`, `Program`, and `Pronouns` should be handled as discrete categories.
- **Date/Time Parsing:** `created_at` should be converted into a structured timestamp format if used for analysis.

---

### **Detailed Column Index Mapping for AI Processing**

This breakdown maps **each column number** to its respective **category and description** to help an AI process the CSV efficiently.

---

### **1. Identification & Personal Information**

| **Column #** | **Column Name** | **Description**                        | **Data Type** |
| ------------ | --------------- | -------------------------------------- | ------------- |
| **0**        | `api_id`        | Unique identifier for the attendee.    | String        |
| **1**        | `name`          | Full name of the attendee.             | String        |
| **2**        | `first_name`    | First name (sometimes missing).        | String / Null |
| **3**        | `last_name`     | Last name (often missing).             | String / Null |
| **4**        | `email`         | Email address of the attendee.         | String        |
| **5**        | `phone_number`  | Phone number (entire column is empty). | Float / Null  |

---

### **2. Registration & Approval**

| **Column #** | **Column Name**   | **Description**                                                       | **Data Type**       |
| ------------ | ----------------- | --------------------------------------------------------------------- | ------------------- |
| **6**        | `created_at`      | Timestamp when the attendee registered.                               | Datetime (ISO 8601) |
| **7**        | `approval_status` | Status of registration (`approved`, etc.).                            | String              |
| **8**        | `custom_source`   | Where the attendee heard about the event (e.g., Twitter, Newsletter). | String / Null       |

---

### **3. Attendance & Check-in**

| **Column #** | **Column Name** | **Description**                                        | **Data Type** |
| ------------ | --------------- | ------------------------------------------------------ | ------------- |
| **9**        | `checked_in_at` | Timestamp for event check-in (entire column is empty). | Float / Null  |

---

### **4. Payment & Ticket Information**

| **Column #** | **Column Name**   | **Description**                            | **Data Type**  |
| ------------ | ----------------- | ------------------------------------------ | -------------- |
| **10**       | `amount`          | Amount paid for ticket.                    | String / Float |
| **11**       | `amount_tax`      | Tax amount on the ticket price.            | String / Float |
| **12**       | `amount_discount` | Discount applied to the ticket.            | String / Float |
| **13**       | `currency`        | Currency used for payment (e.g., USD).     | String         |
| **14**       | `coupon_code`     | Coupon code used (entire column is empty). | Float / Null   |

---

### **5. Crypto Wallets (Mostly Unused)**

| **Column #** | **Column Name**  | **Description**                           | **Data Type** |
| ------------ | ---------------- | ----------------------------------------- | ------------- |
| **15**       | `eth_address`    | Ethereum wallet address (only 4 entries). | String / Null |
| **16**       | `solana_address` | Solana wallet address (only 1 entry).     | String / Null |

---

### **6. Surveys & Feedback (All Empty)**

| **Column #** | **Column Name**            | **Description**                                  | **Data Type** |
| ------------ | -------------------------- | ------------------------------------------------ | ------------- |
| **17**       | `survey_response_rating`   | Numerical rating response (completely empty).    | Float / Null  |
| **18**       | `survey_response_feedback` | Open-ended feedback response (completely empty). | String / Null |

---

### **7. Ticket & Access Details**

| **Column #** | **Column Name**  | **Description**                                    | **Data Type** |
| ------------ | ---------------- | -------------------------------------------------- | ------------- |
| **19**       | `ticket_type_id` | Unique ID for ticket type.                         | String        |
| **20**       | `ticket_name`    | Ticket type (e.g., "Student", "Community Member"). | String        |

---

### **8. Attendee Profile & Demographics**

| **Column #** | **Column Name**                   | **Description**                                   | **Data Type** |
| ------------ | --------------------------------- | ------------------------------------------------- | ------------- |
| **21**       | `Pronouns`                        | Preferred pronouns (e.g., "He/Him", "They/Them"). | String        |
| **22**       | `Program (if applicable)`         | University program (varies by attendee).          | String / Null |
| **23**       | `Graduation year (if applicable)` | Expected graduation year (if applicable).         | String / Null |

---

### **9. Social & Networking Information**

| **Column #** | **Column Name**                             | **Description**                 | **Data Type** |
| ------------ | ------------------------------------------- | ------------------------------- | ------------- |
| **24**       | `Linkedin (if you don't have one, put n/a)` | LinkedIn profile link or "n/a". | String        |

---

### **10. Interest-Based Matching**

| **Column #** | **Column Name**                                                                    | **Description**                                          | **Data Type** |
| ------------ | ---------------------------------------------------------------------------------- | -------------------------------------------------------- | ------------- |
| **25**       | `If you had no other obligations, what would you spend your time trying/creating?` | Open-ended response about interests (used for matching). | String        |

---

### **11. Event Logistics & Accessibility**

| **Column #** | **Column Name**                                          | **Description**                                 | **Data Type** |
| ------------ | -------------------------------------------------------- | ----------------------------------------------- | ------------- |
| **26**       | `To add to the fun, we are organizing walking groups...` | Selected walking group to the venue (optional). | String / Null |
| **27**       | `Please let us know about any accommodations...`         | Accessibility or dietary needs.                 | String / Null |

---
