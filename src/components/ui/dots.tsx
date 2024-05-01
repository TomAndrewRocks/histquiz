import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

type DotProps = {
  isChecked: boolean;
  className?: string;
};

const Dot: React.FC<DotProps> = ({ isChecked, className }) => {
  const dotColor = twMerge(
    `w-2 h-2 rounded-full ${className}`,
    isChecked ? "bg-black" : "bg-gray-300"
  );

  const transitionDuration = "0.15s";

  return (
    <div
      className={dotColor}
      style={{
        transition: `background-color ${transitionDuration} ease-in-out`,
      }}
    />
  );
};

export default Dot;