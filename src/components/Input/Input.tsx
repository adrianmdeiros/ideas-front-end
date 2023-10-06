import React, { InputHTMLAttributes } from "react";
import { StyledInput } from "./style";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  borderRadius?: string;
  backgroundColor?: string
  color?: string
  border?: string;
  all?: string
  height?: string
};

const Input: React.FC<InputProps> = ({name, height, all,  id, type, placeholder, borderRadius, backgroundColor, border, value, onChange}) => {
    

  return (
      <StyledInput  name={name} height={height} all={all} type={type} id={id} placeholder={placeholder}  borderRadius={borderRadius} backgroundColor={backgroundColor} border={border} value={value} onChange={onChange}/>
  )
};

export default Input;
