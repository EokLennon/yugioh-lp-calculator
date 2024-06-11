import { useColorMode, useColorModeValue, IconButton, IconButtonProps } from '@chakra-ui/react';

import { IconButtonStyle } from './styles';
import { FaMoon, FaSun } from 'react-icons/fa';

type ColorModeSwitcherProps = Omit<IconButtonProps, 'aria-label'>;
type Props = ColorModeSwitcherProps;

const ColorModeSwitcher: React.FC<Props> = (props) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      title={`Switch to ${text} mode`}
      aria-label={`Switch to ${text} mode`}
      {...IconButtonStyle}
      {...props}
    />
  )
}

export default ColorModeSwitcher;