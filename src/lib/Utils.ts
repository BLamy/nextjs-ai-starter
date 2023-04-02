export function colorForRole(role: string) {
  switch (role) {
    case "system":
      return "blue";
    case "user":
      return "green";
    case "assistant":
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