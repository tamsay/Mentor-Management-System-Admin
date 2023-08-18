import React, { forwardRef } from "react";
import DOMPurify from "dompurify";

type Props = {
  placeholder?: string;
  required?: boolean;
  onChange: (value: string) => void;
  error?: string;
  marginbottom?: string;
  minHeight?: string;
  borderColor?: string;
  bgColor?: string;
};

import { FormGroup, StyledTextArea } from "./StyledTextArea";

const TextArea: React.FC<Props> = forwardRef(
  ({ placeholder, required, onChange, error, marginbottom, minHeight, borderColor, bgColor, ...props }) => {
    const handleChange = (e: any) => {
      const sanitizedValue = DOMPurify.sanitize(e.target.value);
      onChange(sanitizedValue);
    };

    return (
      <FormGroup marginbottom={marginbottom || "2rem"} bordercolor={borderColor} required={required}>
        <StyledTextArea
          placeholder={placeholder}
          required={required}
          onChange={handleChange}
          minHeight={minHeight}
          bgColor={bgColor}
          {...props}
        />
        {error ? <p className='error'>{error}</p> : ""}
      </FormGroup>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
