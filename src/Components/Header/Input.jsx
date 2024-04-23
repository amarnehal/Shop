import React, { useId } from "react";

const Input = React.forwardRef(function (
  { label, type = "text", className = "", ...props },
  ref
) {
  const Id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={Id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 w-full ${className}`}
        ref={ref}
        id={Id}
        {...props}
      ></input>
    </div>
  );
});

export default Input;
