import React from "react"
import styles from "./styles.module.css";
import { NavLink as Link, useLocation } from "react-router-dom";

export type Props = {
  to: string
  onClick?: () => void
  icon?: React.ReactElement;
  label?: string;
  display?: string;
  children?: React.ReactNode
}


const NavLink: React.FC<Props> = ({ children, icon, label, to, onClick, display }) => {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`${styles.navLink}
       ${display ? styles.flex : ''} 
       ${isActive ? styles.active : ''}`
      }
    >
      <div>{icon}</div>
      <label className={styles.label}>{label}</label>
      {children}
    </Link>
  )
}

export default NavLink