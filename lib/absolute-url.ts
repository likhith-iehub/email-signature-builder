/** Join site origin with a path for absolute `src` / `href` in email HTML. */
export function absoluteUrl(origin: string, path: string): string {
  const o = origin.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${o}${p}`;
}
