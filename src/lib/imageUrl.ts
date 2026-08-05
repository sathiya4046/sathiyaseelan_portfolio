import type { StaticImageData } from "next/image";

export type ImageSource = string | StaticImageData | { src: string } | null | undefined;

/** Normalize static imports / URLs for plain <img> or CSS backgrounds. */
export function imageUrl(img: ImageSource): string {
  if (img == null) return "";
  if (typeof img === "string") return img;
  if (typeof img === "object" && "src" in img && typeof img.src === "string") {
    return img.src;
  }
  return "";
}
