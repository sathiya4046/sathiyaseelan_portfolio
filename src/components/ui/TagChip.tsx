"use client";

import { memo, type ReactNode } from "react";
import { tagChip } from "./styles";

type TagChipProps = {
  children: ReactNode;
  index?: number;
  className?: string;
};

function TagChip({ children, className = "" }: TagChipProps) {
  return (
    <span className={`${tagChip} ${className}`}>
      {children}
    </span>
  );
}

export default memo(TagChip);
