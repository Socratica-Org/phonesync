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

  // Engineering variants - Deep blue for precision/technology
  if (
    normalizedProgram.includes("engineer") ||
    normalizedProgram.includes("syde")
  ) {
    return {
      program: {
        name: "engineering",
        programColor: "#2563eb",
      },
    };
  }

  // Math variants - Purple for abstract thinking/complexity
  if (
    normalizedProgram.includes("math") ||
    normalizedProgram.includes("stat") ||
    normalizedProgram.includes("cs") ||
    normalizedProgram.includes("computer")
  ) {
    return {
      program: {
        name: "math",
        programColor: "#7c3aed",
      },
    };
  }

  // Science variants - Emerald for nature/discovery
  if (
    normalizedProgram.includes("science") ||
    normalizedProgram.includes("physics") ||
    normalizedProgram.includes("chemistry") ||
    normalizedProgram.includes("biology")
  ) {
    return {
      program: {
        name: "science",
        programColor: "#059669",
      },
    };
  }

  // Arts & Humanities variants - Rose for creativity/expression
  if (
    normalizedProgram.includes("art") ||
    normalizedProgram.includes("design") ||
    normalizedProgram.includes("film") ||
    normalizedProgram.includes("media")
  ) {
    return {
      program: {
        name: "arts",
        programColor: "#e11d48",
      },
    };
  }

  // Business variants - Amber for wealth/prosperity
  if (
    normalizedProgram.includes("environment") ||
    normalizedProgram.includes("geography") ||
    normalizedProgram.includes("earth") ||
    normalizedProgram.includes("climate")
  ) {
    return {
      program: {
        name: "business",
        programColor: "#d97706",
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
