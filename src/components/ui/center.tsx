import React from "react";

type CenterProps = {
  children: React.ReactNode;
};

const Center = ({ children }: CenterProps) => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      {children}
    </div>
  );
};

export default Center;
