import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Game from '~components/Game';
import WelcomeModal from '~components/WelcomeModal';
import { readLocalPlayerState, readLocalGameState } from '~store/game/actions';
import RecordsModal from '~components/RecordsModal';
import FinishModal from '~components/FinishModal';

export default function App() {
  const dispatch = useDispatch();
  const playersIDs = useSelector(({ game: { players } }) => players);
  const gameStorageKey = useSelector(({ game: { storageKey } }) => storageKey);
  dispatch(readLocalGameState(gameStorageKey));
  playersIDs.forEach((player) => dispatch(readLocalPlayerState(player)));

  return (
    <>
      <Game />
      <WelcomeModal />
      <RecordsModal />
      <FinishModal />
    </>
  );
}
