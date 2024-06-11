import { Box, BoxProps, IconButton } from '@chakra-ui/react';
import ColorModeSwitcher from '@components/ColorModeSwitcher/ColorModeSwitcher';

import { ROUTES } from '@lib/helpers/constants';

import { IconButtonStyle } from './styles';
import { PiCalculator, PiCalculatorFill } from 'react-icons/pi';
import { TbSearch, TbListSearch } from 'react-icons/tb';

type Props = Omit<BoxProps, 'aria-label'> & {
  pathname: string,
  goTo: (route: string) => void
}


const PageUtilities: React.FC<Props> = ({
  pathname,
  goTo,
  ...props
}) => {
  return (
    <Box display='flex' {...props}>
      <IconButton
        onClick={() => goTo(ROUTES.CALCULATOR)}
        icon={pathname === ROUTES.CALCULATOR ? <PiCalculatorFill /> : <PiCalculator />}
        title='Go to LP Calculator'
        aria-label={`Switch to LP Calculator`}
        {...IconButtonStyle}
      />
      <IconButton
        onClick={() => goTo(ROUTES.CARD_VIEWER)}
        icon={pathname === ROUTES.CARD_VIEWER ? <TbListSearch /> : <TbSearch />}
        title='Go to Search section'
        aria-label={`Switch to Search section`}
        {...IconButtonStyle}
      />
      <ColorModeSwitcher />
    </Box>
  )
}

export default PageUtilities