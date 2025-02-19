// We might want an LLM to categorize this instead
// See Waterloo's official color palette here: https://uwaterloo.ca/brand/how-express-our-brand/colour
// Lowkey their brand color saturation kinda sucks though maybe just use tailwind's
export const getProgramColor = (program: string): string => {
  const normalizedProgram = program.toLowerCase().trim();

  // Engineering variants
  if (
    normalizedProgram.includes("engineer") ||
    normalizedProgram.includes("syde")
  ) {
    return "#A05DCB"; // Engineering level 2 purple
  }

  // Science variants
  if (
    normalizedProgram.includes("science") ||
    normalizedProgram.includes("physics") ||
    normalizedProgram.includes("chemistry") ||
    normalizedProgram.includes("biology")
  ) {
    return "#7E9CCC"; // Science level 2 blue
  }

  // Arts & Humanities variants
  if (
    normalizedProgram.includes("art") ||
    normalizedProgram.includes("design") ||
    normalizedProgram.includes("film") ||
    normalizedProgram.includes("media")
  ) {
    return "#F7BF0A"; // Arts level 2 orange
  }

  // Math variants
  if (
    normalizedProgram.includes("math") ||
    normalizedProgram.includes("stat") ||
    normalizedProgram.includes("cs") ||
    normalizedProgram.includes("computer")
  ) {
    return "#EF60AD"; // Math level 2 pink
  }

  // Environment variants
  if (
    normalizedProgram.includes("environment") ||
    normalizedProgram.includes("geography") ||
    normalizedProgram.includes("earth") ||
    normalizedProgram.includes("climate")
  ) {
    return "#CEDE00"; // Environment level 2 green
  }

  // Health variants
  if (
    normalizedProgram.includes("health") ||
    normalizedProgram.includes("kinesiology") ||
    normalizedProgram.includes("medicine") ||
    normalizedProgram.includes("nursing")
  ) {
    return "#00C2DE"; // Health level 2 teal
  }

  return "#ffffff"; // white for unknown/empty
};
