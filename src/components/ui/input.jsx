/* eslint-disable react/prop-types */
import { forwardRef } from "react";

const InputWithForwardRef = (
  { label, type, errorMessage, placeholder, ...otherProps },
  ref
) => {
  return (
    <>
      <div className="w-full mb-4">
        <label className="block">{label}</label>
        {errorMessage && (
          <p className="text-xs text-red-500 mb-1 ml-1">{errorMessage}</p>
        )}

        <input
          type={type || "text"}
          className={`w-full px-4 py-3 rounded-lg border outline-none   ${
            errorMessage
              ? "border-red-400 focus:ring-1 focus:ring-red-400"
              : "border-gray-300 focus:ring-1 focus:ring-blue-400"
          }`}
          placeholder={placeholder}
          ref={ref}
          {...otherProps}
        />
      </div>
    </>
  );
};

const InputField = forwardRef(InputWithForwardRef);
InputField.displayName = "InputField";
export default InputField;
