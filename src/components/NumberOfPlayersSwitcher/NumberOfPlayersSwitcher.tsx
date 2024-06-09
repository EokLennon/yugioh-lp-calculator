import { 
  Box, BoxProps as IBoxProps,
  IconButton
} from '@chakra-ui/react';
import { 
  PiUser, PiUserFill,
  PiUsers, PiUsersFill,
  PiUsersFour, PiUsersFourFill,
} from 'react-icons/pi';

type BoxProps = Omit<IBoxProps, 'aria-label'>;
type Props = BoxProps & {
  players: number
  onSetPlayers: (n: number) => void
}

const BoxStyle = {
  display: 'flex'
}

const IconButtonStyle = {
  size: 'md',
  fontSize: 'lg',
  variant: 'ghost',
  color: 'current'
}

const NumberOfPlayersSwitcher: React.FC<Props> = ({
  players,
  onSetPlayers,
  ...props
}) => {
  
  return (
    <Box {...BoxStyle} {...props}>
      <IconButton
        onClick={() => onSetPlayers(1)}
        icon={players === 1 ? <PiUserFill /> : <PiUser />}
        title='One-Player mode'
        aria-label={`Switch to One-Player mode`}
        {...IconButtonStyle}
      />
      <IconButton
        onClick={() => onSetPlayers(2)}
        icon={players === 2 ? <PiUsersFill /> : <PiUsers />}
        title='Two-Player mode'
        aria-label={`Switch to Two-Player mode`}
        {...IconButtonStyle}
      />
      <IconButton
        onClick={() => onSetPlayers(4)}
        icon={players === 4 ? <PiUsersFourFill /> : <PiUsersFour />}
        title='Four-Player mode'
        aria-label={`Switch to Four-Player mode`}
        {...IconButtonStyle}
      />
    </Box>
  )
}

export default NumberOfPlayersSwitcher;