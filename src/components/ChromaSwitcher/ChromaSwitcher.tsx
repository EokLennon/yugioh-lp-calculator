import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectChroma, setChroma } from '@store/game/slice';

import { IconButton, IconButtonProps } from '@chakra-ui/react';

import { IconButtonStyle } from './styles';
import { TbDroplet, TbDropletOff } from 'react-icons/tb';

type ColorModeSwitcherProps = Omit<IconButtonProps, 'aria-label'>;
type Props = ColorModeSwitcherProps;

const ChromeSwitcher: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const chromaKey = useAppSelector(selectChroma);
  
  const SwitchIcon = chromaKey ? TbDropletOff : TbDroplet;
  const text = chromaKey ? 'Disable' : 'Enable';

  return (
    <IconButton
      onClick={() => dispatch(setChroma(!chromaKey))}
      icon={<SwitchIcon />}
      title={`${text} Chroma Key`}
      aria-label={`${text} Chroma Key`}
      {...IconButtonStyle}
      {...props}
    />
  )
}

export default ChromeSwitcher;