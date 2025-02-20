// We might want an LLM to categorize this instead
// See Waterloo's official color palette here: https://uwaterloo.ca/brand/how-express-our-brand/colour
// Lowkey their brand color saturation kinda sucks though maybe just use tailwind's

import { ProgramTypes } from "@/server/index";

interface ParsedAttendee {
  program: {
    name: ProgramTypes;
    programColor: string;
  };
}

export const parseAttendee = (program: string): ParsedAttendee => {
  const normalizedProgram = program.toLowerCase().trim();

  // Engineering variants - Purple Deep blue for precision/technology
  if (
    normalizedProgram.includes("engineer") ||
    normalizedProgram.includes("syde")
  ) {
    return {
      program: {
        name: "engineering",
        programColor: "#7c3aed",
      },
    };
  }

  // Math variants - Pink
  if (
    normalizedProgram.includes("math") ||
    normalizedProgram.includes("stat") ||
    normalizedProgram.includes("computer") ||
    normalizedProgram === "cs"
  ) {
    return {
      program: {
        name: "math",
        programColor: "#ec4899",
      },
    };
  }

  // Science variants - Blue
  if (
    normalizedProgram.includes("science") ||
    normalizedProgram.includes("physics") ||
    normalizedProgram.includes("chemistry") ||
    normalizedProgram.includes("biology")
  ) {
    return {
      program: {
        name: "science",
        programColor: "#2563eb",
      },
    };
  }

  // Arts & Humanities variants - Orange
  if (
    normalizedProgram.includes("art") ||
    normalizedProgram.includes("design") ||
    normalizedProgram.includes("film") ||
    normalizedProgram.includes("media") ||
    normalizedProgram.includes("music") ||
    normalizedProgram.includes("theatre") ||
    normalizedProgram.includes("english") ||
    normalizedProgram.includes("history") ||
    normalizedProgram.includes("philosophy") ||
    normalizedProgram.includes("languages") ||
    normalizedProgram.includes("literature") ||
    normalizedProgram.includes("creative") ||
    normalizedProgram === "gbda"
  ) {
    return {
      program: {
        name: "arts",
        programColor: "#f59e0b",
      },
    };
  }

  // Business variants - Green
  if (
    normalizedProgram.includes("business") ||
    normalizedProgram.includes("economics") ||
    normalizedProgram.includes("accounting") ||
    normalizedProgram.includes("finance") ||
    normalizedProgram.includes("marketing") ||
    normalizedProgram.includes("management")
  ) {
    return {
      program: {
        name: "business",
        programColor: "#16a34a",
      },
    };
  }

  return {
    program: {
      name: "unknown",
      programColor: "#000000", // keep black as default
    },
  };
};
