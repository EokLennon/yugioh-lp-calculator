import { Outlet } from 'react-router-dom'

import { Container } from '@chakra-ui/react'
import Header from '@screens/Layout/Header/Header';
import Footer from '@screens/Layout/Footer/Footer';

const ContainerStyle = {
  maxWidth: '750px',
  height: '100vh',
  paddingX: 3,
}

const ScreenLayout = () => {
  return (
    <Container 
      display='flex' 
      flexDirection='column' 
      {...ContainerStyle}
    >
      <Header />
      <Outlet />
      <Footer />
    </Container>
  )
}

export default ScreenLayout