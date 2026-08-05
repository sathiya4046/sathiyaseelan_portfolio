"use client";

import { memo } from "react";

type NameBoardProps = {
  name: string;
  className?: string;
  colors?: string[];
};

function NameBoard({
  name,
  className = "",
  colors = ["#8e44ad", "#e91e63", "#f39c12", "#8e44ad"],
}: NameBoardProps) {
  const gradient = `linear-gradient(to right, ${colors.join(", ")})`;

  return (
    <span
      className={`inline-block bg-clip-text text-transparent motion-safe:animate-[gradient-shift_4s_linear_infinite] ${className}`}
      style={{
        backgroundImage: gradient,
        backgroundSize: "200% auto",
      }}
    >
      {name}
    </span>
  );
}

export default memo(NameBoard);
