import { AvatarProps, TagProps } from "@chakra-ui/react"

type StatStylesI = {
  Tag: Partial<TagProps>
  Avatar: Partial<AvatarProps>
}
export const StatStyles: StatStylesI = {
  Tag: {
    size: 'lg',
    borderRadius: 'full'
  },
  Avatar: {
    size: 'xs',
    ml: -1,
    mr: 2
  }
}