import { useColorMode, useColorModeValue, IconButton, IconButtonProps } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

type ColorModeSwitcherProps = Omit<IconButtonProps, 'aria-label'>;
type Props = ColorModeSwitcherProps;

const IconButtonStyle = {
  size: 'md',
  fontSize: 'lg',
  variant: 'ghost',
  color: 'current'
}

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