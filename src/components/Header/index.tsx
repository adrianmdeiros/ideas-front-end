import React from "react"
import styles from './styles.module.css'
import { useLocation } from "react-router-dom"

export type HeaderProps = {
  title?: string
  children: React.ReactNode
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const localtion = useLocation()
  const page = localtion.pathname
  

  return (
    <header className={`${styles.header} ${page === '/' ? styles.absolute : '' } `}>
      {props.title ? <h1>{props.title}</h1> : ''}
      {props.children}
    </header>
  )
}

export default Header