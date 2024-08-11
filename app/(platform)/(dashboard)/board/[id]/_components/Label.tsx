import React from "react";

const Label = ({ name, color }: { name: string; color: string }) => {
  const backgroundColorWithOpacity = color.replace("rgb", "rgba").replace(")", ", 0.2)");

  return (
    <div
      className="py-1 px-2 w-max rounded-full"
      style={{
        color,
        backgroundColor: backgroundColorWithOpacity,
      }}
    >
      <p className="text-xs font-semibold">{name}</p>
    </div>
  );
};

export default Label;
