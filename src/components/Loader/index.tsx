import styles from './styles.module.css'

export type LoaderProps = {
  color?: string
}

const Loader: React.FC<LoaderProps> = ({color}) => {
  return (
    <>
      <div className={styles.loader} color={color}></div>
    </>
  )
}

export default Loader