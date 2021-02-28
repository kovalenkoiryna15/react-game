import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col, Row, Modal, Container, Button,
} from 'react-bootstrap';
import './FinishModal.scss';

import TrophySVG from './TrophySVG';
import RecordsSVG from '~components/RecordsSVG';
import NewGameSVG from '~components/NewGameSVG';
import {
  toggleFinishModal, resetIsPlaying, toggleRecordsModal, toggleOptionsModal, resetGame,
} from '~store/game/actions';

export default function FinishModal() {
  const dispatch = useDispatch();
  const isVisible = useSelector(({ game: { isFinishVisible } }) => isFinishVisible);

  function onRecords() {
    dispatch(toggleFinishModal());
    dispatch(toggleRecordsModal());
  }

  function onOptions() {
    dispatch(resetGame());
    dispatch(resetIsPlaying());
    dispatch(toggleFinishModal());
    dispatch(toggleOptionsModal());
  }

  return (
    <Modal
      show={isVisible}
      animation={false}
      className="finish-modal"
      centered
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName="modal-100w"
      onHide={() => null}
    >
      <Modal.Body>
        <Container className="modal-container d-flex flex-column justify-content-center align-items-center w-100 h-100">
          <Row sm={12} xs={12} className="justify-content-center align-items-center">
            <Col lg={6} md={6} sm={12} xs={12} className="text-center">
              <span className="px-1">Game is over...</span>
              <TrophySVG />
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              <Button className="w-100 options btn-svg" onClick={onRecords}>
                <span>Records</span>
                <RecordsSVG />
              </Button>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              <Button className="w-100 options btn-svg" onClick={onOptions}>
                <span>New Game</span>
                <NewGameSVG />
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
