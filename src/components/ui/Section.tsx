"use client";

import type { ReactNode } from "react";
import { SECTION_PY } from "./motion";
import BackgroundAtmosphere from "./BackgroundAtmosphere";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  ariaLabelledby?: string;
  atmosphere?: boolean;
  atmosphereIntensity?: "default" | "subtle";
  noPadding?: boolean;
};

export default function Section({
  children,
  className = "",
  id,
  ariaLabelledby,
  atmosphere = false,
  atmosphereIntensity = "subtle",
  noPadding = false,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={`relative w-full overflow-x-clip ${noPadding ? "" : SECTION_PY} ${className}`}
    >
      {atmosphere && (
        <BackgroundAtmosphere intensity={atmosphereIntensity} interactive={false} />
      )}
      <div className="relative">{children}</div>
    </section>
  );
}
