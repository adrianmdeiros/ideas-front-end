import React, { ButtonHTMLAttributes } from "react";
import styles from './styles.module.css'

export interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  children: React.ReactNode;
  primary?: boolean;
  secondary?: boolean;
  terciary?: boolean;
  quaternary?: boolean
  danger?: boolean;
  transparent?: boolean;
  link?: boolean;
  gap?: boolean;
};

const Button: React.FC<BtnProps> = (props: BtnProps) => {

  const classNames = [
    styles.button, 
    props.primary && styles.primary, 
    props.secondary && styles.secondary,
    props.terciary && styles.terciary,
    props.quaternary && styles.quaternary,
    props.transparent && styles.transparent,
    props.link && styles.link,
    props.gap && styles.gap,
    props.danger && styles.danger
  ]
    .join(' ')

  return (
    <button className={classNames} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
