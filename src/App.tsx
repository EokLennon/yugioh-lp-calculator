import { ChakraProvider, Container } from '@chakra-ui/react'

import Header from './containers/Header/Header';
import MainContent from './containers/MainContent/MainContent';
import Footer from './containers/Footer/Footer';

import theme from './theme/theme';

const App = () => (
  <ChakraProvider theme={theme}>
    <Container 
      maxWidth='750px'
      height='100vh'
      paddingX={3}
      display='flex'
      flexDirection='column'
    >
      <Header />
      <MainContent flexGrow={1} />
      <Footer />
    </Container>
  </ChakraProvider>
)

export default App;
