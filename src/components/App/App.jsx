import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Game from '~components/Game';
import WelcomeModal from '~components/WelcomeModal';
import { readLocalPlayerState, readLocalGameState } from '~store/game/actions';
import RecordsModal from '~components/RecordsModal';
import FinishModal from '~components/FinishModal';
import OptionsModal from '~components/OptionsModal';
import InfoModal from '~components/InfoModal';

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
      <OptionsModal />
      <InfoModal />
    </>
  );
}
