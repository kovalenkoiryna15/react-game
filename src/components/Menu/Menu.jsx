import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Button, Row } from 'react-bootstrap';
import './Menu.scss';

import {
  setRandom, resetGame, resetSound, toggleRecordsModal,
} from '~store/game/actions';

import SoundOnSVG from '~components/Sound/SoundOnSVG';
import SoundOffSVG from '~components/Sound/SoundOffSVG';
import RecordsSVG from '~components/RecordsSVG';
import NewGameSVG from '~components/NewGameSVG';

export default function Menu() {
  const dispatch = useDispatch();
  const loading = useSelector(({ game: { isLoading } }) => isLoading);
  const isSoundOn = useSelector(({ game: { isSound } }) => isSound);
  const playersIDs = useSelector(({ game: { players } }) => players);

  function onStart() {
    dispatch(resetGame()); // reset active player and game progress
    playersIDs.forEach((player) => dispatch(setRandom(player)));
  }

  function onSoundReset() {
    dispatch(resetSound());
  }

  function onRecords() {
    dispatch(toggleRecordsModal());
  }

  return (
    <Col lg={2} md={12} sm={12} xs={12}>
      <Row>
        <Col lg={12} md={6} sm={12} xs={12}>
          <h4>Menu</h4>
          <Row>
            <Col lg={12} md={6} sm={12} xs={12}>
              <Button className="w-100 options btn-svg" onClick={onStart} disabled={loading}>
                <span>New Game</span>
                <NewGameSVG />
              </Button>
            </Col>
            <Col lg={12} md={6} sm={12} xs={12}>
              <Button className="w-100 options" onClick={onStart} disabled={loading}>Auto play</Button>
            </Col>
            <Col lg={12} md={6} sm={12} xs={12}>
              <Button className="w-100 options" onClick={onStart} disabled={loading}>Auto finish</Button>
            </Col>
            <Col lg={12} md={6} sm={12} xs={12}>
              <Button className="w-100 options btn-svg" onClick={onRecords} disabled={loading}>
                <span>Records</span>
                <RecordsSVG />
              </Button>
            </Col>
            <Col lg={12} md={6} sm={12} xs={12}>
              <Button className="w-100 options btn-svg" onClick={onSoundReset} disabled={loading}>
                <span>Sound</span>
                {
                  isSoundOn ? <SoundOnSVG /> : <SoundOffSVG />
                }
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
}
