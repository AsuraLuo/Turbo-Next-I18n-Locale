import { StyledAppLayout } from './styled'

const AppLayout = () => {
  return (
    <StyledAppLayout>
      <p>AppLayout</p>
      <button onClick={() => methodDoesNotExist()}>Break the world</button>
    </StyledAppLayout>
  )
}

export default AppLayout
