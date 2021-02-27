import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col, Button, Row, Modal, Container,
} from 'react-bootstrap';
import './WelcomeModal.scss';
import bg1 from '~images/wp1814937.jpg';

import Footer from '~components/Footer';
import SoundOnSVG from '~components/Sound/SoundOnSVG';
import SoundOffSVG from '~components/Sound/SoundOffSVG';
import RecordsSVG from '~components/RecordsSVG';
import NewGameSVG from '~components/NewGameSVG';

import {
  setRandom, resetGame, resetIsPlaying, resetSound, toggleRecordsModal,
} from '~store/game/actions';

export default function WelcomeModal() {
  const dispatch = useDispatch();
  const isSoundOn = useSelector(({ game: { isSound } }) => isSound);
  const isPlay = useSelector(({ game: { isPlaying } }) => isPlaying);
  const isVisible = useSelector(({ game: { isRecordsVisible } }) => isRecordsVisible);
  const loading = useSelector(({ game: { isLoading } }) => isLoading);
  const playersIDs = useSelector(({ game: { players } }) => players);

  function onStart() {
    dispatch(resetGame()); // reset active player and game progress
    playersIDs.forEach((player) => dispatch(setRandom(player)));
    dispatch(resetIsPlaying());
  }

  function onContinue() {
    dispatch(resetIsPlaying());
  }

  function onSoundReset() {
    dispatch(resetSound());
  }

  function onRecords() {
    dispatch(toggleRecordsModal());
  }

  return (
    <Modal
      show={!isPlay}
      animation={false}
      className="welcome-modal"
      centered
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName="modal-100w"
      onHide={() => null}
      style={{
        background: `url(${bg1})`,
      }}
    >
      <Modal.Body>
        <Container className="modal-container d-flex flex-column justify-content-center align-items-center w-100 h-100">
          <Row className="text-center" id="contained-modal-title-vcenter">
            <h1>BattleShip Game</h1>
          </Row>
          <Row sm={12} xs={12} className="justify-content-center align-items-center">
            <Col lg={6} md={6} sm={12} xs={12}>
              <Row>
                <Col lg={12} md={12} sm={12} xs={12}>
                  <Row>
                    <Col lg={12} md={12} sm={12} xs={12}>
                      <Button className="w-100 options btn-svg" onClick={onStart} disabled={loading}>
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
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer className="pt-0 pb-0">
        <Footer />
      </Modal.Footer>
    </Modal>
  );
}