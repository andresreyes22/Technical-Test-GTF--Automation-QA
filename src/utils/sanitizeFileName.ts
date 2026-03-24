export function sanitizeFileName(rawName: string): string {
  return rawName
    .replace(/["']/g, "")
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_-]/g, "")
    .toLowerCase();
}
