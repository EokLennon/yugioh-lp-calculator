import { useState, useRef } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCards } from '@api/cards';

import { 
  Fade, Box, BoxProps, VStack, HStack,
  Heading, Spinner, Avatar,
  Tag, TagLabel,
  Input, InputGroup, InputLeftAddon, InputRightElement, Button,
  Image,
  useOutsideClick,
} from '@chakra-ui/react';

import { CardViewStyle, SearchStyle } from './styles';

import ICard from '@lib/interfaces/card';

const CardSearching = (props: BoxProps) => {
  const queryClient = useQueryClient();

  const ref = useRef<HTMLDivElement | null>(null);
  useOutsideClick({
    ref: ref,
    handler: () => setSearch('')
  })

  const [search, setSearch] = useState('');
  const [selectedCard, setSelectedCard] = useState<ICard>();

  const { data = [], isFetching } = useQuery<ICard[]>(
    ['get-cards', search],
    ({ signal }) => {
      queryClient.cancelQueries({ queryKey: ['get-cards'] });
      return getCards(search, signal);
    },
    {
      enabled: search.length >= 3,
      refetchOnWindowFocus: false,
    }
  )

  return (
    <Box as='main' {...props}>
      <InputGroup>
        <InputLeftAddon children='Card Name' />
        <Input
          value={search}
          placeholder="Type the name of the card you're searching"
          onChange={(e) => setSearch(e.target.value)}
        />
        <InputRightElement>
          {isFetching && <Spinner {...SearchStyle.Spinner} />}
        </InputRightElement>
      </InputGroup>
      <Fade in={!isFetching && data.length > 0 && Boolean(search)}>
        <Box ref={ref} {...SearchStyle.ResultsBox()}>
          {data.map((c) => 
            <Button 
              key={c.id}
              onClick={() => { 
                setSelectedCard(c);
                setSearch('');
              }}
            >
              {c.name}
            </Button>
          )} 
        </Box>
      </Fade>
      {selectedCard &&
        <HStack {...CardViewStyle.HStack}>
          <Image 
            {...CardViewStyle.Image}
            src={selectedCard.card_images[0].image_url} 
            alt={selectedCard.name}
          />
          <VStack>
            <Heading as='h1' {...CardViewStyle.Heading}>{selectedCard.name}</Heading>
            <HStack>
              <Tag size='lg' borderRadius='full'>
                <Avatar
                  src='stats/Level.svg'
                  size='xs'
                  ml={-1}
                  mr={2}
                />
                <TagLabel>{selectedCard.level}</TagLabel>
              </Tag>
            </HStack>
          </VStack>
        </HStack>
      }
    </Box>
  )
}

export default CardSearching