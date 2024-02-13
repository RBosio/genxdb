export const formatBody = (text: string): string => {
  return text
    .split("\n")
    .filter((_, idx: number) => idx < text.split("\n").length - 2)
    .map((s) => (s.includes(",") && !s.includes("a") ? "" : s))
    .join("\n");
};
