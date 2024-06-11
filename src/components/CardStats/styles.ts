import { AvatarProps, ImageProps, StackProps, TagProps } from "@chakra-ui/react"

const getGradient = (type: string, frame: string): string => {
  if (type === 'type') {
    switch (frame) {
      case 'normal_pendulum':
        return 'linear(to-b, normal.400, spell.400)';
      case 'effect_pendulum':
        return 'linear(to-b, effect.400, spell.400)';
      case 'fusion_pendulum':
        return 'linear(to-b, fusion.400, spell.400)';
      case 'synchro_pendulum':
        return 'linear(to-b, synchro.400, spell.400)';
      case 'xyz_pendulum':
        return 'linear(to-b, xyz.400, spell.400)';
      default:
        return '';
    }
  }
  return ''
}

const getColor = (type: string, frame: string): string => {
  if (type === 'type') {
    switch (frame) {
      case 'normal_pendulum':
      case 'effect_pendulum':
      case 'fusion_pendulum':
      case 'synchro_pendulum':
      case 'xyz_pendulum':
        return '';
      default:
        return frame;
    }
  } else if (type === 'level') {
    switch (frame) {
      case 'link':
        return 'link';
      case 'xyz':
        return 'xyz';
      default:
        return 'effect';
    }
  }
  return ''
}

type StatStylesI = {
  Tag: () => Partial<TagProps>
  Avatar: Partial<AvatarProps>
}
const StatStyles: StatStylesI = {
  Tag: () => {
    return {
      colorScheme: 'black',
      size: 'lg',
      borderRadius: 'full',
    }
  },
  Avatar: {
    size: 'xs',
    ml: '-8px',
    mr: '5px',
  }
}

type TypeStatStylesI = {
  Tag: (type: string, frame: string) => Partial<TagProps>
  Avatar: (type: string, frame: string) => Partial<AvatarProps>
}
const TypeStatStyles: TypeStatStylesI = {
  Tag: (type, frame) => {
    const gr = getGradient('type', frame)
    const c = getColor('type', frame)
    const base = StatStyles.Tag()
    return {
      ...base,
      bgGradient: gr ? gr : undefined,
      colorScheme: gr ? undefined : c,
      color: gr ? 'whiteAlpha.900' : undefined
    }
  },
  Avatar: (type, frame) => {
    return {
      ...StatStyles.Avatar,
    }
  }
}

type AttributeStatStylesI = {
  Tag: (type: string, frame: string) => Partial<TagProps>
  Avatar: (type: string, frame: string) => Partial<AvatarProps>
}
const AttributeStatStyles: AttributeStatStylesI = {
  Tag: (type, frame) => {
    return {
      ...StatStyles.Tag(),
    }
  },
  Avatar: (type, frame) => {
    return {
      ...StatStyles.Avatar,
    }
  }
}

type LevelRankLinkStatStylesI = {
  Tag: (type: string, frame: string) => Partial<TagProps>
  Avatar: (type: string, frame: string) => Partial<AvatarProps>
  HStack: StackProps
  LinkRating: Partial<ImageProps>
}
const LevelRankLinkStatStyles: LevelRankLinkStatStylesI = {
  Tag: (type, frame) => {
    // const c = getColor(type, frame);
    return {
      ...StatStyles.Tag(),
      // colorScheme: c
    }
  },
  Avatar: (type, frame) => {
    const c = getColor(type, frame);
    return {
      ...StatStyles.Avatar,
      bg: c === 'link' ? 'link.500' : undefined,
      sx: c === 'link' ? { 
        '.chakra-avatar__initials': {
          fontSize: '16px'
        }
      } : undefined,
    }
  },
  HStack: {
    gap: 0
  },
  LinkRating: {
    w: '18px',
    h: '18px'
  }
}

type TypingStatStylesI = {
  Tag: (type: string, frame: string) => Partial<TagProps>
  Avatar: (type: string, frame: string) => Partial<AvatarProps>
}
const TypingStatStyles: TypingStatStylesI = {
  Tag: (type, frame) => {
    return {
      ...StatStyles.Tag(),
    }
  },
  Avatar: (type, frame) => {
    return {
      ...StatStyles.Avatar,
    }
  }
}

type AtkDefStatStylesI = {
  Tag: Partial<TagProps>
}
const AtkDefStatStyles: AtkDefStatStylesI = {
  Tag: {
    ...StatStyles.Tag(),
  },
}

export {
  TypeStatStyles,
  AttributeStatStyles,
  LevelRankLinkStatStyles,
  TypingStatStyles,
  AtkDefStatStyles
}