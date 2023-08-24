"use client";

import React, { forwardRef, useState } from "react";
import DOMPurify from "dompurify";

import { FormGroup } from "./StyledInput";

import EyeIconHide from "@/assets/icons/eye-password-hide.svg";
import EyeIconShow from "@/assets/icons/eye-password-show.svg";
import SearchIcon from "@/assets/icons/search-icon.svg";

type InputProps = {
  placeholder?: string;
  required?: boolean;
  type?: string;
  onChange: (data: string | number) => string | number | void;
  error?: string;
  icon?: boolean;
  marginbottom?: string;
  border?: string;
  value?: string | number;
};

const Input = forwardRef(
  (
    { placeholder, required, type = "text", onChange, error, icon, marginbottom, border, ...props }: InputProps,
    ref: React.LegacyRef<HTMLInputElement>
  ) => {
    const [inputType, setInputType] = useState(type);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: any) => {
      const sanitizedValue = DOMPurify.sanitize(e.target.value);
      onChange(sanitizedValue);
    };

    const handleVisibility = () => {
      if (inputType === "password") {
        setShowPassword(true);
        return setInputType("text");
      } else if (inputType === "text") {
        setShowPassword(false);
        return setInputType("password");
      } else {
        return setInputType(inputType);
      }
    };

    return (
      <FormGroup marginbottom={marginbottom || "2rem"} border={border || "#e6e6e6"} required={required}>
        <div className='input-container'>
          {icon && <SearchIcon alt='search icon' />}
          <input
            type={inputType}
            placeholder={placeholder}
            required={required}
            onChange={handleChange}
            {...props}
            autoComplete='new-password'
            ref={ref}
          />
          {type === "password" &&
            (showPassword ? (
              <EyeIconHide alt='eye-icon' className='eye-icon' onClick={handleVisibility} />
            ) : (
              <EyeIconShow alt='eye-icon' className='eye-icon' onClick={handleVisibility} />
            ))}
        </div>
        {error ? <span className='error'>{error}</span> : ""}
      </FormGroup>
    );
  }
);

Input.displayName = "Input";

export default Input;
