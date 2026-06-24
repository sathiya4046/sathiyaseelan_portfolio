"use client";

import { SECTION_PY } from "./motion";
import BackgroundAtmosphere from "./BackgroundAtmosphere";

export default function Section({
  children,
  className = "",
  id,
  ariaLabelledby,
  atmosphere = true,
  atmosphereIntensity = "default",
  noPadding = false,
}) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={`relative w-full overflow-x-hidden ${noPadding ? "" : SECTION_PY} ${className}`}
    >
      {atmosphere && <BackgroundAtmosphere intensity={atmosphereIntensity} />}
      <div className="relative">{children}</div>
    </section>
  );
}
