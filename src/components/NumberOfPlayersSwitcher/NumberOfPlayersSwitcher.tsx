import { 
  Box, BoxProps as IBoxProps,
  IconButton
} from '@chakra-ui/react';
import { 
  PiUser, PiUserFill,
  PiUsers, PiUsersFill,
  PiUsersFour, PiUsersFourFill,
} from 'react-icons/pi';
import useNumberOfPlayers from '../../hooks/useNumberOfPlayers';

type BoxProps = Omit<IBoxProps, 'aria-label'>;

const IconButtonProps = {
  size: 'md',
  fontSize: 'lg',
  variant: 'ghost',
  color: 'current'
}

const NumberOfPlayersSwitcher: React.FC<BoxProps> = (props) => {
  const { players, setPlayers } = useNumberOfPlayers();
  
  return (
    <Box
      className='component-btn-group'
      display='flex'
      {...props}
    >
      <IconButton
        onClick={() => setPlayers(1)}
        icon={players === 1 ? <PiUserFill /> : <PiUser />}
        title='One-Player mode'
        aria-label={`Switch to One-Player mode`}
        {...IconButtonProps}
      />
      <IconButton
        onClick={() => setPlayers(2)}
        icon={players === 2 ? <PiUsersFill /> : <PiUsers />}
        title='Two-Player mode'
        aria-label={`Switch to Two-Player mode`}
        {...IconButtonProps}
      />
      <IconButton
        onClick={() => setPlayers(4)}
        icon={players === 4 ? <PiUsersFourFill /> : <PiUsersFour />}
        title='Four-Player mode'
        aria-label={`Switch to Four-Player mode`}
        {...IconButtonProps}
      />
    </Box>
  )
}

export default NumberOfPlayersSwitcher;