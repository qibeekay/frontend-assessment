// Button.tsx
import React from "react";
import type { ButtonProps } from "../../utils/types";

const Button: React.FC<ButtonProps> = ({
  children,
  size = "lg",
  variant = "blue",
  fontSize = "14px",
  ...rest // collect anything else (onClick, disabled, type, etc.)
}) => {
  return (
    <button
      style={{
        fontSize,
      }}
      className={`font-medium ${
        size === "sm" ? "px-[16px] py-[8px]" : "px-[24px] py-[12px]"
      } ${
        variant === "blue"
          ? "bg-primary text-white"
          : variant === "white"
          ? "text-primary bg-white"
          : variant === "lightBlue"
          ? "text-primary bg-[#E7F0FF]"
          : "bg-white text-textPrimary"
      } font-medium cursor-pointer w-full flex items-center justify-center rounded-[4px]`}
      {...rest} // ← forward onClick and other props
    >
      {children}
    </button>
  );
};

export default Button;
