import { Box, IconButton, Text } from '@chakra-ui/react';

import { FaDiscord, FaYoutube } from 'react-icons/fa';

const IconButtonCss = {
  size: 'sm',
  fontSize: 'lg',
  variant: 'ghost',
  color: 'current',
}

const Footer = () => {
  return (
    <Box 
      as='footer'
      display='flex'
      alignItems='center'
      paddingY={3}
    >
      <Text fontSize='md' flexGrow={1}>
        &copy; 2023 Arturo Lennon.
      </Text>
      <IconButton
        as='a'
        href='https://www.youtube.com/@MrLennon'
        target='_blank'
        icon={<FaYoutube />}
        title='My YouTube Channel'
        aria-label={`Go to my YouTube channel`}
        {...IconButtonCss}
      />
      <IconButton
        as='a'
        href='https://discord.gg/jGkRCJkt3d'
        target='_blank'
        icon={<FaDiscord />}
        title='Domain Format Discord Server'
        aria-label={`Go to Discord`}
        {...IconButtonCss}
      />
    </Box>
  )
}

export default Footer;