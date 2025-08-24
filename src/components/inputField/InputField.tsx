import React from "react";
import { InputFieldProps } from "./InputField.types";

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg"
};

const variantClasses = {
  filled: "bg-gray-100 border border-gray-300 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
  outlined: "bg-white border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
  ghost: "bg-transparent border-b border-gray-300 rounded-none focus:border-blue-500"
};

export const InputField: React.FC<InputFieldProps> = ({
  value = "",
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  loading = false,
  variant = "outlined",
  size = "md",
  clearable = false,
  leftIcon,
  rightIcon,
}) => (
  <div className="flex flex-col gap-1">
    {label && <label className="font-medium mb-1">{label}</label>}
    <div className="relative flex items-center">
      {leftIcon && <span className="absolute left-3">{leftIcon}</span>}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled || loading}
        aria-invalid={invalid}
        className={[
          "w-full transition-all duration-200 focus:outline-none",
          sizeClasses[size],
          variantClasses[variant],
          leftIcon ? "pl-10" : "",
          rightIcon || clearable ? "pr-10" : "",
          invalid ? "border-red-500 focus:border-red-500 focus:ring-red-200" : "",
          disabled ? "bg-gray-100 cursor-not-allowed opacity-70" : ""
        ].join(" ")}
      />
      {rightIcon && <span className="absolute right-3">{rightIcon}</span>}
      {clearable && value && !disabled && (
        <button
          type="button"
          className="absolute right-3 p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
          tabIndex={-1}
          onClick={() => onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>)}
          aria-label="Clear input"
        >
          <svg width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
    {invalid && errorMessage ? (
      <p className="text-red-500 text-xs">{errorMessage}</p>
    ) : (
      helperText && <p className="text-gray-500 text-xs">{helperText}</p>
    )}
  </div>
);
