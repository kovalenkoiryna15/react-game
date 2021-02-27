import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col, Row, Modal, Container,
} from 'react-bootstrap';
// import './FinishModal.scss';
// import bg1 from '~images/wp1814937.jpg';
import TrophySVG from './TrophySVG';
import { toggleFinishModal } from '~store/game/actions';

export default function FinishModal() {
  const dispatch = useDispatch();
  const isVisible = useSelector(({ game: { isFinishVisible } }) => isFinishVisible);

  function onFinish() {
    dispatch(toggleFinishModal());
  }

  return (
    <Modal
      show={isVisible}
      className="finish-modal"
      centered
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName="modal-100w"
      onHide={onFinish}
      closeButton
      // style={{
      //   background: `url(${bg1})`,
      // }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <span>Finish</span>
          <TrophySVG />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="modal-container d-flex flex-column justify-content-center align-items-center w-100 h-100">
          <Row sm={12} xs={12} className="justify-content-center align-items-center">
            <Col lg={6} md={6} sm={12} xs={12}>
              Finish...
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
