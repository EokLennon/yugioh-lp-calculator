import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@lib/helpers/constants';

import { selectNumOfPlayers, setNumOfPlayers } from '@store/game/slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';

import { Box, BoxProps } from '@chakra-ui/react';
import NumberOfPlayersSwitcher from '@components/NumberOfPlayersSwitcher/NumberOfPlayersSwitcher';
import PageUtilities from '@components/PageUtilities/PageUtilities';

const BoxStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  paddingBottom: 3
}

const Header = (props: BoxProps) => {
  const { pathname } = useLocation();
  const nav = useNavigate();

  const dispatch = useAppDispatch();
  const players = useAppSelector(selectNumOfPlayers);

  return (
    <Box as='header' {...BoxStyle} {...props}>
      {pathname === ROUTES.CALCULATOR 
        ? <NumberOfPlayersSwitcher
            players={players}
            onSetPlayers={(p) => dispatch(setNumOfPlayers(p))}
          />
        : <div />
      }
      <PageUtilities 
        pathname={pathname}
        goTo={nav}
      />
    </Box>
  )
}

export default Header;