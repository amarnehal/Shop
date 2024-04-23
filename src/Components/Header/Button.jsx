import React from "react";

const Button = ({
  children,
  className = "",
  type = "button",
  bgColor = "bg-orange-500",
  textColor = "text-white",
  ...props
}) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
