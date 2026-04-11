/**
 * Next.js resolves static image imports to `{ src, width, height, ... }`.
 * Vite used a string URL. Use this for `<img src={...}>` and similar.
 */
export function imageUrl(img) {
  if (img == null) return "";
  if (typeof img === "string") return img;
  if (typeof img === "object" && "src" in img) return img.src;
  return "";
}
