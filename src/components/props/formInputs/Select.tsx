import React from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  className = "",
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`p-2 sm:p-3 text-sm sm:text-base w-fit text-white cursor-pointer ${className}`}
    >
      {options.map((option) => (
        <option
          className="text-textPrimary"
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
