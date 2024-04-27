import React from "react";

type HStackProps = {
  children: React.ReactNode;
  className?: string;
};

const HStack = ({ children, className }: HStackProps) => {
  return <div className={`flex flex-row gap-2 ${className}`}>{children}</div>;
};

export default HStack;
