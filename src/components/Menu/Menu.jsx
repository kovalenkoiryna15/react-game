import * as React from 'react';
import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Button, Row } from 'react-bootstrap';
import './Menu.scss';

import KeyboardEventHandler from 'react-keyboard-event-handler';

// Music
import { Howl } from 'howler';
import playbackMusic from '~audio/BlueSky.mp3';

import { resetGame, resetAutoPlay } from '~store/game/actions';
import {
  resetSound,
  toggleRecordsModal,
  refreshBackground,
  toggleOptionsModal,
  resetMusic,
  // resetMusicVolume,
  // resetSoundVolume,
} from '~store/app/actions';

import SoundOnSVG from '~components/Sound/SoundOnSVG';
import SoundOffSVG from '~components/Sound/SoundOffSVG';
import RecordsSVG from '~components/RecordsSVG';
import NewGameSVG from '~components/NewGameSVG';
import RefreshSVG from '~components/RefreshSVG';
import ImageIcoSVG from '~components/ImageIcoSVG';

export default function Menu() {
  const dispatch = useDispatch();
  const loading = useSelector(({ app: { isLoading } }) => isLoading);
  const isSoundOn = useSelector(({ app: { isSound } }) => isSound);
  const isMusicOn = useSelector(({ app: { isMusic } }) => isMusic);
  // const musicVolumeValue = useSelector(({ app: { musicVolume } }) => musicVolume);
  // const soundVolumeValue = useSelector(({ app: { soundVolume } }) => soundVolume);
  const playback = useMemo(() => new Howl({
    src: [playbackMusic],
    loop: true,
  }), []);

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

  function onMusicReset() {
    dispatch(resetMusic());
  }

  useEffect(() => {
    if (isMusicOn) {
      playback.play();
    } else {
      playback.stop();
    }
  }, [isMusicOn, playback]);

  // function onMusicVolume(e) {
  //   const { value } = e.target;
  //   dispatch(resetMusicVolume(parseFloat(value)));
  // }

  // function onSoundVolume(e) {
  //   const { value } = e.target;
  //   dispatch(resetSoundVolume(parseFloat(value)));
  // }

  return (
    <Col lg={2} md={12} sm={12} xs={12} className="menu">
      <Row>
        <Col lg={12} md={6} sm={12} xs={12}>
          <Row className="text-center justify-content-center align-items-center">
            <h4>Menu</h4>
          </Row>
          <Row>
            <Col lg={12} md={6} sm={12} xs={12}>
              <Button className="w-100 options btn-svg" onClick={onOptions} disabled={loading}>
                <span>New Game</span>
                <NewGameSVG />
                <KeyboardEventHandler
                  handleKeys={['shift+n']}
                  onKeyEvent={onAutoPlay}
                />
              </Button>
            </Col>
            <Col lg={12} md={6} sm={12} xs={12}>
              <Button className="w-100 options" onClick={onAutoPlay} disabled={loading}>
                Auto play
                <KeyboardEventHandler
                  handleKeys={['shift+a']}
                  onKeyEvent={onAutoPlay}
                />
              </Button>
            </Col>
            <Col lg={12} md={6} sm={12} xs={12}>
              <Button className="w-100 options" onClick={onAutoPlay} disabled={loading}>
                Auto finish
                <KeyboardEventHandler
                  handleKeys={['shift+f']}
                  onKeyEvent={onAutoPlay}
                />
              </Button>
            </Col>
            <Col lg={12} md={6} sm={12} xs={12}>
              <Button className="w-100 options btn-svg" onClick={onRecords} disabled={loading}>
                <span>Records</span>
                <RecordsSVG />
                <KeyboardEventHandler
                  handleKeys={['shift+r']}
                  onKeyEvent={onRecords}
                />
              </Button>
            </Col>
            <Col lg={12} md={6} sm={12} xs={12}>
              <Button className="w-100 options btn-svg" onClick={onRefresh} disabled={loading}>
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
              <Button className="w-100 options btn-svg" onClick={onSoundReset} disabled={loading}>
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
              <Button
                className="w-100 options btn-svg"
                onClick={onMusicReset}
                disabled={loading}
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
            {/* <Col lg={12} md={6} sm={12} xs={12}>
              <input
                type="range"
                value={musicVolumeValue}
                min="0"
                max={1}
                step="0.001"
                list="options"
                onInput={onMusicVolume}
                className="custom-range range__input"
                id="music-volume-range"
              />
            </Col>
            <Col lg={12} md={6} sm={12} xs={12}>
              <input
                type="range"
                value={soundVolumeValue}
                min="0"
                max={1}
                step="0.001"
                list="options"
                onInput={onSoundVolume}
                className="custom-range range__input"
                id="sound-volume-range"
              />
            </Col> */}
          </Row>
        </Col>
      </Row>
    </Col>
  );
}
