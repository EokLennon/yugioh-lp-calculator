import { useEffect } from 'react';

import { Outlet, useLocation } from 'react-router-dom'
import { ROUTES } from '@lib/helpers/constants';

import { CardProps, Container } from '@chakra-ui/react'
import Header from '@screens/Layout/Header/Header';
import Footer from '@screens/Layout/Footer/Footer';

const ContainerStyle = {
  height: '100vh',
  paddingX: 3,
}

const getMaxWidth = (pathname: string): any => {
  if (pathname === ROUTES.CARD_VIEWER.path) {
    return '1150px';
  }
  return '750px';
}

const setWindowTitle = (pathname: string): void => {
  if (pathname === ROUTES.CALCULATOR.path) {
    document.title = `YGO LP Calculator - ${ROUTES.CALCULATOR.title}`;
  } else if (pathname === ROUTES.CARD_VIEWER.path) {
    document.title = `YGO LP Calculator - ${ROUTES.CARD_VIEWER.title}`;
  }
}

const ScreenLayout = () => {
  const location = useLocation();

  useEffect(() => {
    setWindowTitle(location.pathname);
  }, [location.pathname]);
  
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