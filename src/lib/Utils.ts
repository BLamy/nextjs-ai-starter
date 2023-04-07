export function colorForRole(role: string) {
  switch (role) {
    case "assistant":
      return "blue";
    case "system":
      return "green";
    case "user":
      return "gray";
    case "error":
      return "red";
    default:
      return "gray";
  }
}

export function isValidTool(tool: string): tool is "search" | "calculator" {
  return tool === "search" || tool === "calculator";
};