import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Button, Row } from 'react-bootstrap';
import './Menu.scss';

import KeyboardEventHandler from 'react-keyboard-event-handler';

import { resetGame, resetAutoPlay } from '~store/game/actions';
import {
  resetSound,
  toggleRecordsModal,
  toggleInfoModal,
  refreshBackground,
  toggleOptionsModal,
  resetMusic,
  resetMusicVolume,
  resetSoundVolume,
} from '~store/app/actions';

import SoundOnSVG from '~components/Sound/SoundOnSVG';
import SoundOffSVG from '~components/Sound/SoundOffSVG';
import RecordsSVG from '~components/RecordsSVG';
import NewGameSVG from '~components/NewGameSVG';
import RefreshSVG from '~components/RefreshSVG';
import ImageIcoSVG from '~components/ImageIcoSVG';

// Music
import { audioSrs } from '~constants';

const playback = new Audio(audioSrs.playbackMusic);
playback.loop = true;

export default function Menu() {
  const dispatch = useDispatch();
  const isSoundOn = useSelector(({ app: { isSound } }) => isSound);
  const isMusicOn = useSelector(({ app: { isMusic } }) => isMusic);
  const userTurn = useSelector(({ game: { user } }) => user);
  const whoseTurn = useSelector(({ game: { activePlayer } }) => activePlayer);
  const musicVolumeValue = useSelector(({ app: { musicVolume } }) => musicVolume);
  const soundVolumeValue = useSelector(({ app: { soundVolume } }) => soundVolume);
  playback.volume = musicVolumeValue;

  function onOptions() {
    dispatch(resetGame());
    dispatch(toggleOptionsModal());
  }

  function onSoundReset() {
    dispatch(resetSound());
  }

  function onInfo() {
    dispatch(toggleInfoModal());
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

  function onMusicReset() {
    dispatch(resetMusic());
  }

  useEffect(() => {
    if (isMusicOn) {
      playback.play();
    } else {
      playback.pause();
    }
  }, [isMusicOn, userTurn, whoseTurn]);

  function onMusicVolume(e) {
    const { value } = e.target;
    dispatch(resetMusicVolume(+value));
  }

  function onSoundVolume(e) {
    const { value } = e.target;
    dispatch(resetSoundVolume(+value));
  }

  return (
    <Col lg={2} md={12} sm={12} xs={12} className="menu">
      <Row>
        <Col lg={12} md={6} sm={12} xs={12}>
          <Row className="text-center justify-content-center align-items-center">
            <h4>Menu</h4>
          </Row>
          <Row>
            <Col lg={12} md={6} sm={12} xs={12}>
              <Button className="w-100 options btn-svg" onClick={onOptions}>
                <span>New Game</span>
                <NewGameSVG />
                <KeyboardEventHandler
                  handleKeys={['shift+n']}
                  onKeyEvent={onOptions}
                />
              </Button>
            </Col>
            <Col lg={12} md={6} sm={12} xs={12}>
              <Button className="w-100 options" onClick={onAutoPlay}>
                Auto play
                <KeyboardEventHandler
                  handleKeys={['shift+a']}
                  onKeyEvent={onAutoPlay}
                />
              </Button>
            </Col>
            <Col lg={12} md={6} sm={12} xs={12}>
              <Button className="w-100 options" onClick={onAutoPlay}>
                Auto finish
                <KeyboardEventHandler
                  handleKeys={['shift+f']}
                  onKeyEvent={onAutoPlay}
                />
              </Button>
            </Col>
            <Col lg={12} md={6} sm={12} xs={12}>
              <Button className="w-100 options btn-svg" onClick={onRecords}>
                <span>Records</span>
                <RecordsSVG />
                <KeyboardEventHandler
                  handleKeys={['shift+r']}
                  onKeyEvent={onRecords}
                />
              </Button>
            </Col>
            <Col lg={12} md={6} sm={12} xs={12}>
              <Button className="w-100 options btn-svg" onClick={onRefresh}>
                <span>Refresh</span>
                <RefreshSVG />
                <ImageIcoSVG />
                <KeyboardEventHandler
                  handleKeys={['shift+b']}
                  onKeyEvent={onRefresh}
                />
              </Button>
            </Col>
            <Col lg={12} md={6} sm={12} xs={12}>
              <Button className="w-100 options btn-svg" onClick={onSoundReset}>
                <span>Sound</span>
                {
                  isSoundOn ? <SoundOnSVG /> : <SoundOffSVG />
                }
                <KeyboardEventHandler
                  handleKeys={['shift+s']}
                  onKeyEvent={onSoundReset}
                />
              </Button>
            </Col>
            <Col lg={12} md={6} sm={12} xs={12}>
              <span>Sound Volume</span>
              <input
                type="range"
                value={soundVolumeValue}
                min="0"
                max={1}
                step="0.001"
                list="options"
                onChange={onSoundVolume}
                className="custom-range range__input"
                id="sound-volume-range"
              />
            </Col>
            <Col lg={12} md={6} sm={12} xs={12}>
              <Button
                className="w-100 options btn-svg"
                onClick={onMusicReset}
              >
                <span>Music</span>
                {
                  isMusicOn ? <SoundOnSVG /> : <SoundOffSVG />
                }
                <KeyboardEventHandler
                  handleKeys={['shift+m']}
                  onKeyEvent={onMusicReset}
                />
              </Button>
            </Col>
            <Col lg={12} md={6} sm={12} xs={12}>
              <span>Music Volume</span>
              <input
                type="range"
                value={musicVolumeValue}
                min="0"
                max={1}
                step="0.001"
                list="options"
                onChange={onMusicVolume}
                className="custom-range range__input"
                id="music-volume-range"
              />
            </Col>
            <Col lg={12} md={6} sm={12} xs={12}>
              <Button className="w-100 options btn-svg" onClick={onInfo}>
                <span>Info</span>
                <KeyboardEventHandler
                  handleKeys={['shift+i']}
                  onKeyEvent={onInfo}
                />
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
}
