import { useState } from 'react';
import useNumberOfPlayers from '../../hooks/useNumberOfPlayers';

import { useQuery } from '@tanstack/react-query';
import { getDeckMasters } from '../../api/cards';

import { Box, BoxProps, SimpleGrid } from '@chakra-ui/react';
import PlayerCard from '../../components/PlayerCard/PlayerCard';

import ICard from '../../interfaces/card';

const MainContent = (props: BoxProps) => {
  const { players } = useNumberOfPlayers();
  
  const [activeCard, setActiveCard] = useState(0);
  const [search, setSearch] = useState('');

  const { data = [], isFetching } = useQuery<ICard[]>(
    ['get-deckmasters', activeCard, search],
    () => getDeckMasters(search),
    {
      enabled: Boolean(activeCard && search),
      refetchOnWindowFocus: false,
      onSuccess: console.log
    }
  );

  return (
    <Box 
      as='main'
      {...props}
    >
      <SimpleGrid columns={[1, null, 2]} spacing='1em'>
        {[...Array(4)].map((i, k) => 
          <PlayerCard
            key={k}
            playerNumber={k + 1}
            show={players >= (k + 1)}
            loading={isFetching && activeCard === (k + 1)}
            onSearch={(p, s) => {
              setActiveCard(p);
              setSearch(s);
            }}
            options={(activeCard === (k + 1)) ? data : []}
          />
        )}
      </SimpleGrid>
    </Box>
  )
}

export default MainContent;