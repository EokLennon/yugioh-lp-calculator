import { useCallback, useState } from 'react';
import useNumberOfPlayers from '../../hooks/useNumberOfPlayers';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getDeckMasters } from '../../api/cards';

import { 
  Box, BoxProps, 
  Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, 
  Input, InputGroup, InputLeftAddon, 
  SimpleGrid, Stack,
  Button, Skeleton,
  Radio,
  RadioGroup
} from '@chakra-ui/react';
import PlayerCard from '../../components/PlayerCard/PlayerCard';

import ICard from '../../interfaces/card';

interface IDeckMasters {
  [key: number]: ICard | undefined
}

const MainContent = (props: BoxProps) => {
  const queryClient = useQueryClient();
  const { players } = useNumberOfPlayers();
  
  const [activeCard, setActiveCard] = useState(0);
  const [search, setSearch] = useState('');

  const [selectedDeckMaster, setSelectedDeckMaster] = useState<ICard>();
  const [deckMasters, setDeckMasters] = useState<IDeckMasters>({
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined
  });

  const { data = [], isFetching } = useQuery<ICard[]>(
    ['get-deckmasters', activeCard, search],
    ({ signal }) => {
      queryClient.cancelQueries({ queryKey: ['get-deckmasters'] });
      return getDeckMasters(search, signal);
    },
    {
      enabled: Boolean(activeCard && search.length >= 3),
      refetchOnWindowFocus: false,
    }
  );

  const onCloseModal = useCallback(() => setActiveCard(0), []);
  const onSaveModal = useCallback((activeCard: number) => {
    if (activeCard && selectedDeckMaster) {
      setDeckMasters((prev) => ({
        ...prev,
        [activeCard]: selectedDeckMaster
      }));
      setSelectedDeckMaster(undefined);
    }
    setActiveCard(0);
  }, [selectedDeckMaster])

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
            deckMaster={deckMasters[k + 1]}
            show={players >= (k + 1)}
            onSearch={(p) => {
              setSearch('');
              queryClient.invalidateQueries({ queryKey: ['get-deckmasters'] });
              setActiveCard(p);
            }}
          />
        )}
      </SimpleGrid>

      <Modal closeOnOverlayClick={false} isOpen={activeCard > 0} onClose={onCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search your Deck Master</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <InputGroup size='sm' mb={(isFetching || (data.length > 0 && search)) ? 5 : undefined}>
              <InputLeftAddon children='Name' />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} />
            </InputGroup>
            <Stack>
              {isFetching && [...Array(5)].map((i, k) => 
                <Skeleton>
                  <Radio key={`${k}`}>Placeholder</Radio>
                </Skeleton>
              )}
              {!isFetching && 
                <RadioGroup 
                  onChange={(v) => setSelectedDeckMaster(data.find((c) => `${c.id}` === v))}
                  value={selectedDeckMaster ? `${selectedDeckMaster.id}` : undefined}
                >
                  <Stack>
                    {data.map((c) => 
                      <Radio 
                        key={c.id}
                        value={`${c.id}`}
                      >
                        {c.name}
                      </Radio>
                    )}
                  </Stack>
                </RadioGroup>
              }
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' onClick={onCloseModal}>
              Cancel
            </Button>
            <Button colorScheme='green' ml={3} onClick={() => onSaveModal(activeCard)}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default MainContent;