import { Box, IconButton, Text } from '@chakra-ui/react';

import { FaDiscord, FaYoutube } from 'react-icons/fa';

const BoxStyle = {
  display: 'flex',
  alignItems: 'center',
  paddingY: 3
}

const IconButtonStyle = {
  size: 'sm',
  fontSize: 'lg',
  variant: 'ghost',
  color: 'current',
}

const Footer = () => {
  return (
    <Box as='footer' {...BoxStyle}>
      <Text fontSize='md' flexGrow={1}>
        &copy; 2024 Arturo Lennon.
      </Text>
      <IconButton
        as='a'
        href='https://www.youtube.com/@MrLennon'
        target='_blank'
        icon={<FaYoutube />}
        title='My YouTube Channel'
        aria-label={`Go to my YouTube channel`}
        {...IconButtonStyle}
      />
      <IconButton
        as='a'
        href='https://discord.gg/jGkRCJkt3d'
        target='_blank'
        icon={<FaDiscord />}
        title='Domain Format Discord Server'
        aria-label={`Go to Discord`}
        {...IconButtonStyle}
      />
    </Box>
  )
}

export default Footer;