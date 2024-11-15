/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";

const InputWithForwardRef = (
  {
    label,
    type,
    value,
    handleAnswer,
    errorMessage,
    placeholder,
    ...otherProps
  },
  ref
) => {
  const { watch } = useFormContext();
  return (
    <div>
      {errorMessage && (
        <p className="text-xs text-red-500 mb-1 ml-1">{errorMessage}</p>
      )}
      <div className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white">
        <input
          type="checkbox"
          value={value}
          checked={
            value && watch("correctAnswer") && value === watch("correctAnswer")
          }
          onChange={handleAnswer}
          className="text-primary focus:ring-0 w-4 h-4"
        />
        <label className="sr-only">{label}</label>
        <input
          type={type || "text"}
          placeholder={placeholder}
          ref={ref}
          {...otherProps}
          className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
        />
      </div>
    </div>
  );
};

const OptionField = forwardRef(InputWithForwardRef);
OptionField.displayName = "OptionField";
export default OptionField;
