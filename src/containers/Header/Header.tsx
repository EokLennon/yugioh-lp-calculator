import { Box } from '@chakra-ui/react';
import NumberOfPlayersSwitcher from '../../components/NumberOfPlayersSwitcher/NumberOfPlayersSwitcher';
import ColorModeSwitcher from '../../components/ColorModeSwitcher/ColorModeSwitcher';

const Header = () => {
  return (
    <Box 
      as='header'
      display='flex'
      paddingBottom={3}
    >
      <NumberOfPlayersSwitcher flexGrow={1} />
      <ColorModeSwitcher />
    </Box>
  )
}

export default Header;