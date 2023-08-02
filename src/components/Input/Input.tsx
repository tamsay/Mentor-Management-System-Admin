import React, { useState, forwardRef } from "react";
import { FormGroup } from "./StyledInput";
import eyeIconShow from "@/assets/icons/eye-password-show.svg";
import eyeIconHide from "@/assets/icons/eye-password-hide.svg";
import searchIcon from "@/assets/icons/search-icon.svg";
import DOMPurify from "dompurify";
import Image from "next/image";

type InputProps = {
  placeholder?: string;
  required?: boolean;
  type?: string;
  onChange?: (e: any) => string | number;
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

    const handleChange = (e) => {
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
          {icon && <Image src={searchIcon} alt='search icon' />}
          <input
            type={inputType}
            placeholder={placeholder}
            required={required}
            onChange={handleChange}
            {...props}
            autoComplete='new-password'
            ref={ref}
          />
          {type === "password" && (
            <Image
              src={showPassword ? eyeIconHide : eyeIconShow}
              alt='eye-icon'
              className='eye-icon'
              onClick={handleVisibility}
            />
          )}
        </div>
        {error ? <span className='error'>{error}</span> : ""}
      </FormGroup>
    );
  }
);

Input.displayName = "Input";

export default Input;
