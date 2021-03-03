import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col, Row, Modal, Container,
} from 'react-bootstrap';
import './InfoModal.scss';

import { toggleInfoModal } from '~store/app/actions';

export default function InfoModal() {
  const dispatch = useDispatch();
  const isVisible = useSelector(({ app: { isInfoVisible } }) => isInfoVisible);

  function onInfo() {
    dispatch(toggleInfoModal());
  }

  return (
    <Modal
      show={isVisible}
      animation={false}
      className="info-modal"
      centered
      aria-labelledby="contained-modal-title-vcenter"
      onHide={onInfo}
    >
      <Modal.Header closeButton className="text-center justify-content-center align-items-center">
        <Row className="text-center justify-content-center align-items-center w-100" id="contained-modal-title-vcenter">
          <h3>Hot Keys</h3>
        </Row>
      </Modal.Header>
      <Modal.Body>
        <Container className="modal-container d-flex flex-column justify-content-center align-items-center w-100 h-100">
          <Row sm={12} xs={12} className="justify-content-center align-items-center">
            <Col lg={12} md={12} sm={12} xs={12}>
              shift + n - start new game
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              shift + a - start autoplay mode
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              shift + f - finish game in autoplay mode
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              shift + r - view records
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              shift + b - refresh background image
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              shift + s - on / off sound
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              shift + m - on / off music
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
