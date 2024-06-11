import { useCallback, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectActiveCard, selectNumOfPlayers, setActiveCard, setPlayerDeckMaster } from '@store/game/slice';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getDeckMasters } from '@api/cards';

import { 
  Box, BoxProps, 
  Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, 
  Input, InputGroup, InputLeftAddon, 
  SimpleGrid, Stack,
  Button, 
  Radio, RadioGroup,
  Skeleton,
} from '@chakra-ui/react';
import PlayerCard from '@components/PlayerCard/PlayerCard';

import ICard from '@lib/interfaces/card';
import { PlayerId } from '@lib/interfaces/general';

const GameCalculator = (props: BoxProps) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const players = useAppSelector(selectNumOfPlayers);
  const activeCard = useAppSelector(selectActiveCard);
  
  const [search, setSearch] = useState('');
  const [selectedDeckMaster, setSelectedDeckMaster] = useState<ICard>();

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

  const onCleanModal = useCallback(() => {
    setSearch('');
    queryClient.invalidateQueries({ queryKey: ['get-deckmasters'] });
  }, [queryClient])

  const onCloseModal = useCallback(() => {
    dispatch(setActiveCard(0));
    onCleanModal();
  }, [dispatch, onCleanModal])

  const onSaveModal = useCallback((activeCard: number) => {
    if (activeCard && selectedDeckMaster) {
      dispatch(setPlayerDeckMaster({ 
        player: activeCard as PlayerId, 
        deckmaster: selectedDeckMaster 
      }));
      setSelectedDeckMaster(undefined);
    }
    dispatch(setActiveCard(0));
    onCleanModal();
  }, [dispatch, onCleanModal, selectedDeckMaster])

  return (
    <Box 
      as='main'
      {...props}
    >
      <SimpleGrid columns={[1, null, 2]} spacing='1em'>
        {[...Array(4)].map((i, k) => 
          <PlayerCard
            key={k}
            playerNumber={k + 1 as PlayerId}
            show={players >= (k + 1)}
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
              <Input 
                autoComplete='off' 
                autoCorrect='off'
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
              />
            </InputGroup>
            <Stack>
              {isFetching && [...Array(5)].map((i, k) => 
                <Skeleton key={`${k}`}>
                  <Radio>Placeholder</Radio>
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

export default GameCalculator;