import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col, Button, Row, Modal, Container,
} from 'react-bootstrap';
import './WelcomeModal.scss';

import SoundOnSVG from '~components/Sound/SoundOnSVG';
import SoundOffSVG from '~components/Sound/SoundOffSVG';
import RecordsSVG from '~components/RecordsSVG';
import NewGameSVG from '~components/NewGameSVG';

import { resetGame, resetIsPlaying } from '~store/game/actions';
import {
  toggleWelcomeModal, resetSound, toggleRecordsModal, toggleOptionsModal, resetMusic,
} from '~store/app/actions';

export default function WelcomeModal() {
  const dispatch = useDispatch();
  const isSoundOn = useSelector(({ app: { isSound } }) => isSound);
  const isMusicOn = useSelector(({ app: { isMusic } }) => isMusic);
  const isVisible = useSelector(({ app: { isWelcomeVisible } }) => isWelcomeVisible);
  const loading = useSelector(({ app: { isLoading } }) => isLoading);

  function onContinue() {
    dispatch(resetIsPlaying());
    dispatch(toggleWelcomeModal());
  }

  function onSoundReset() {
    dispatch(resetSound());
  }

  function onRecords() {
    dispatch(toggleRecordsModal());
  }

  function onMusicReset() {
    dispatch(resetMusic());
  }

  function onOptions() {
    dispatch(resetGame());
    dispatch(toggleWelcomeModal());
    dispatch(toggleOptionsModal());
  }

  return (
    <Modal
      show={!isVisible}
      animation={false}
      className="welcome-modal"
      centered
      aria-labelledby="contained-modal-title-vcenter"
      onHide={() => null}
    >
      <Modal.Body>
        <Container
          className="modal-container d-flex flex-column justify-content-center align-items-center w-100 h-100"
        >
          <Row className="text-center" id="contained-modal-title-vcenter">
            <h1>BattleShip Game</h1>
          </Row>
          <Row sm={12} xs={12} className="justify-content-center align-items-center">
            <Col lg={6} md={6} sm={12} xs={12}>
              <Row>
                <Col lg={12} md={12} sm={12} xs={12}>
                  <Row>
                    <Col lg={12} md={12} sm={12} xs={12}>
                      <Button className="w-100 options btn-svg" onClick={onOptions} disabled={loading}>
                        <span>New Game</span>
                        <NewGameSVG />
                      </Button>
                    </Col>
                    <Col lg={12} md={12} sm={12} xs={12}>
                      <Button className="w-100 options" onClick={onContinue} disabled={loading}>Continue Game</Button>
                    </Col>
                    <Col lg={12} md={12} sm={12} xs={12}>
                      <Button className="w-100 options btn-svg" onClick={onRecords} disabled={loading}>
                        <span>Records</span>
                        <RecordsSVG />
                      </Button>
                    </Col>
                    <Col lg={12} md={12} sm={12} xs={12}>
                      <Button className="w-100 options btn-svg" onClick={onSoundReset} disabled={loading}>
                        <span>Sound</span>
                        {
                          isSoundOn ? <SoundOnSVG /> : <SoundOffSVG />
                        }
                      </Button>
                    </Col>
                    <Col lg={12} md={12} sm={12} xs={12}>
                      <Button
                        className="w-100 options btn-svg"
                        onClick={onMusicReset}
                      >
                        <span>Music</span>
                        {
                          isMusicOn ? <SoundOnSVG /> : <SoundOffSVG />
                        }
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
