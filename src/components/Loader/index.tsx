import { StyledLoader } from './style'

export type LoaderProps = {
  color?: string
}

const Loader: React.FC<LoaderProps> = ({color}) => {
  return (
    <>
      <StyledLoader color={color}> </StyledLoader>
    </>
  )
}

export default Loader