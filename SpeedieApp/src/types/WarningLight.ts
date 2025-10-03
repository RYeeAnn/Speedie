export type WarningLight = {
  id: string;
  name: string;
  description: string;
  severity: "info" | "warning" | "critical";
  image: string;
  urgency: string;
  fixInfo: string;
}; 