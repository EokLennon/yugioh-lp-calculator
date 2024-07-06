import { Outlet, useLocation } from 'react-router-dom'

import { CardProps, Container } from '@chakra-ui/react'
import Header from '@screens/Layout/Header/Header';
import Footer from '@screens/Layout/Footer/Footer';
import { ROUTES } from '@lib/helpers/constants';

const ContainerStyle = {
  height: '100vh',
  paddingX: 3,
}

const getMaxWidth = (pathname: string): any => {
  if (pathname === ROUTES.CARD_VIEWER) {
    return '1150px';
  }
  return '750px';
}

const ScreenLayout = () => {
  const location = useLocation();
  
  const props: Partial<CardProps> = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: getMaxWidth(location.pathname),
    ...ContainerStyle,
  }

  return (
    <Container {...props}>
      <Header  />
      <Outlet />
      <Footer  />
    </Container>
  )
}

export default ScreenLayout