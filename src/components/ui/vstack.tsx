import React from "react";

type VStackProps = {
  children: React.ReactNode;
  className?: string;
};

const VStack = ({ children, className }: VStackProps) => {
  return <div className={`flex flex-col gap-2 ${className}`}>{children}</div>;
};

VStack.displayName = "VStack";

export { VStack };
