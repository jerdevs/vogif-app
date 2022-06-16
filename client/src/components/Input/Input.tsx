import React from "react";

export interface InputProps {
  label: string;
  placeholder: string;
  name: string;
  type: string;
  value: string | number;
  onChange?: (value: string) => void;
  step?: number;
  description?: string;
  error?: string;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = (props: InputProps): React.ReactElement => {
  const {
    label,
    placeholder,
    name,
    type,
    value,
    onChange,
    step,
    description,
    error,
    disabled,
  } = props;

  return (
    <div className="flex flex-col pb-3">
      <label className="text-slate-200 text-xs pb-1">{label}</label>
      <input
        className={`px-2 text-sm sm:text-base py-1 bg-transparent ${
          disabled ? "text-slate-400" : "text-teal-400"
        } border-2 ${
          error
            ? "border-red-300"
            : disabled
            ? "border-slate-400"
            : "border-white"
        } focus:outline-0`}
        placeholder={placeholder}
        name={name}
        type={type}
        step={step}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
          if (step && Number(e.target.value) < 0.0001) {
            onChange && onChange("0.0001");
          } else {
            onChange && onChange(e.target.value);
          }
        }}
        min={step && 0.0001}
        disabled={disabled}
      />
      {description && (
        <div
          className={`${
            disabled ? "text-slate-400" : "text-white"
          } text-xs italic pt-1`}
        >
          {description}
        </div>
      )}
      {error && <div className="text-red-300 text-xs italic pt-1">{error}</div>}
    </div>
  );
};

export default Input;
