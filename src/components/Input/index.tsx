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

const Input: React.FC<InputProps> = (props: InputProps) => {
    

  return (
      <StyledInput  name={props.name} height={props.height} all={props.all} type={props.type} id={props.id} placeholder={props.placeholder}  borderRadius={props.borderRadius} backgroundColor={props.backgroundColor} border={props.border} value={props.value} onChange={props.onChange}/>
  )
};

export default Input;
