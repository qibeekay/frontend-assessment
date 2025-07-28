import React from "react";

interface InputProps {
  type: "text" | "date";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  label?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  onKeyPress,
  placeholder,
  label,
  className = "",
}) => {
  return (
    <div className="bg-white rounded-[4px] p-3">
      {/* label */}
      <label htmlFor="" className="text-sm text-textSecondary">
        {label}
      </label>
      <div>
        <input
          type={type}
          value={value}
          onChange={onChange}
          onKeyPress={onKeyPress}
          placeholder={placeholder}
          className={`w-full text-textPrimary font-medium outline-none placeholder:text-textPrimary ${className}`}
        />
      </div>
    </div>
  );
};

export default Input;
