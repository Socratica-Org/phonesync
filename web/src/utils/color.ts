// We might want an LLM to categorize this instead
// See Waterloo's official color palette here: https://uwaterloo.ca/brand/how-express-our-brand/colour
// Lowkey their brand color saturation kinda sucks though maybe just use tailwind's

interface Program {
  name: string;
  color: string;
}

export const getProgram = (program: string): Program => {
  const normalizedProgram = program.toLowerCase().trim();

  // Engineering variants
  if (
    normalizedProgram.includes("engineer") ||
    normalizedProgram.includes("syde")
  ) {
    return {
      name: "Engineering",
      color: "#A05DCB",
    };
  }

  // Science variants
  if (
    normalizedProgram.includes("science") ||
    normalizedProgram.includes("physics") ||
    normalizedProgram.includes("chemistry") ||
    normalizedProgram.includes("biology")
  ) {
    return {
      name: "Science",
      color: "#7E9CCC",
    };
  }

  // Arts & Humanities variants
  if (
    normalizedProgram.includes("art") ||
    normalizedProgram.includes("design") ||
    normalizedProgram.includes("film") ||
    normalizedProgram.includes("media")
  ) {
    return {
      name: "Arts & Humanities",
      color: "#F7BF0A",
    };
  }

  // Math variants
  if (
    normalizedProgram.includes("math") ||
    normalizedProgram.includes("stat") ||
    normalizedProgram.includes("cs") ||
    normalizedProgram.includes("computer")
  ) {
    return {
      name: "Math",
      color: "#EF60AD",
    };
  }

  // Environment variants
  if (
    normalizedProgram.includes("environment") ||
    normalizedProgram.includes("geography") ||
    normalizedProgram.includes("earth") ||
    normalizedProgram.includes("climate")
  ) {
    return {
      name: "Environment",
      color: "#CEDE00",
    };
  }

  // Health variants
  if (
    normalizedProgram.includes("health") ||
    normalizedProgram.includes("kinesiology") ||
    normalizedProgram.includes("medicine") ||
    normalizedProgram.includes("nursing")
  ) {
    return {
      name: "Health",
      color: "#00C2DE",
    };
  }

  return {
    name: "Unknown",
    color: "#ffffff",
  };
};
