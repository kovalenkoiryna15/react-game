import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Button, Row } from 'react-bootstrap';
import './Menu.scss';

import {
  resetSound, toggleRecordsModal, refreshBackground, toggleOptionsModal, resetGame, resetAutoPlay,
} from '~store/game/actions';

import SoundOnSVG from '~components/Sound/SoundOnSVG';
import SoundOffSVG from '~components/Sound/SoundOffSVG';
import RecordsSVG from '~components/RecordsSVG';
import NewGameSVG from '~components/NewGameSVG';
import RefreshSVG from '~components/RefreshSVG';
import ImageIcoSVG from '~components/ImageIcoSVG';

export default function Menu() {
  const dispatch = useDispatch();
  const loading = useSelector(({ game: { isLoading } }) => isLoading);
  const isSoundOn = useSelector(({ game: { isSound } }) => isSound);

  function onOptions() {
    dispatch(resetGame()); // reset active player and game progress
    dispatch(toggleOptionsModal());
  }

  function onSoundReset() {
    dispatch(resetSound());
  }

  function onRecords() {
    dispatch(toggleRecordsModal());
  }

  function onRefresh() {
    dispatch(refreshBackground());
  }

  function onAutoPlay() {
    dispatch(resetAutoPlay());
  }

  return (
    <Col lg={2} md={12} sm={12} xs={12}>
      <Row>
        <Col lg={12} md={6} sm={12} xs={12}>
          <Row>
            <h4>Menu</h4>
          </Row>
          <Row>
            <Col lg={12} md={6} sm={12} xs={12}>
              <Button className="w-100 options btn-svg" onClick={onOptions} disabled={loading}>
                <span>New Game</span>
                <NewGameSVG />
              </Button>
            </Col>
            <Col lg={12} md={6} sm={12} xs={12}>
              <Button className="w-100 options" onClick={onAutoPlay} disabled={loading}>Auto play</Button>
            </Col>
            <Col lg={12} md={6} sm={12} xs={12}>
              <Button className="w-100 options" onClick={onAutoPlay} disabled={loading}>Auto finish</Button>
            </Col>
            <Col lg={12} md={6} sm={12} xs={12}>
              <Button className="w-100 options btn-svg" onClick={onRecords} disabled={loading}>
                <span>Records</span>
                <RecordsSVG />
              </Button>
            </Col>
            <Col lg={12} md={6} sm={12} xs={12}>
              <Button className="w-100 options btn-svg" onClick={onRefresh} disabled={loading}>
                <span>Refresh</span>
                <RefreshSVG />
                <ImageIcoSVG />
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
