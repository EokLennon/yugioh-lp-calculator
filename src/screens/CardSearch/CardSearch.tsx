import { useState, useRef, useEffect } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCards } from '@api/cards';
import { domainTextDb } from '@assets/DomainCardText';

import { 
  Fade, Box, BoxProps,
  SimpleGrid, Wrap,
  Heading, Text, Spinner, Image,
  Input, InputGroup, InputLeftAddon, InputRightElement, Button,
  Tabs, TabList, Tab, TabPanels, TabPanel,
  useOutsideClick,
} from '@chakra-ui/react';
import { AtkDefStat, AttributeStat, LevelRankLinkStat, TypeStat, TypingStat } from '@components/CardStats/CardStats';

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
  const [selectedCardDomainText, setSelectedCardDomainText] = useState<string>();

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

  useEffect(() => {
    if (!selectedCard) return;
    const domain = domainTextDb.find((d) => d.cardId === selectedCard.id);
    console.log(domain?.cardId, selectedCard.id);
    
    setSelectedCardDomainText(domain?.domainText);
  }, [selectedCard])

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
        <SimpleGrid columns={[1, null, 2]} spacing='1rem' {...CardViewStyle.SimpleGrid}>
          <Image 
            {...CardViewStyle.Image}
            src={selectedCard.card_images[0].image_url} 
            alt={selectedCard.name}
          />
          <Box>
            <Heading as='h1' {...CardViewStyle.Heading}>{selectedCard.name}</Heading>
            <Wrap mb='1rem'>
              <TypeStat 
                frame={selectedCard.frameType}
                type={selectedCard.type}
                withWrap
              />
              <AttributeStat 
                frame={selectedCard.frameType}
                attribute={selectedCard.attribute || ''} 
                withWrap
              />
              <LevelRankLinkStat
                frame={selectedCard.frameType}
                content={`${selectedCard.level}`}
                linkRating={selectedCard.linkval}
                linkMarkers={selectedCard.linkmarkers}
                withWrap
              />
              <TypingStat 
                frame={selectedCard.frameType}
                race={selectedCard.race}
                withWrap
              />
              <AtkDefStat
                mode='atk'
                value={selectedCard.atk}
                withWrap
              />
              <AtkDefStat 
                mode='def'
                value={selectedCard.def}
                withWrap
              />
            </Wrap>
            <Tabs variant='enclosed'>
              <TabList>
                <Tab>Card Text</Tab>
                <Tab isDisabled={Boolean(!selectedCardDomainText)}>Domain Card Text</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Text whiteSpace='pre-line'>{selectedCard.desc}</Text>
                </TabPanel>
                <TabPanel>
                  <Text whiteSpace='pre-line'>{selectedCardDomainText}</Text>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </SimpleGrid>
      }
    </Box>
  )
}

export default CardSearching