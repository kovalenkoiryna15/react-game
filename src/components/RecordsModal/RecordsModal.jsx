import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col, Row, Modal, Container,
} from 'react-bootstrap';
// import './RecordsModal.scss';
// import bg1 from '~images/wp1814937.jpg';

import RecordsSVG from '~components/RecordsSVG';

import {
  toggleRecordsModal,
} from '~store/game/actions';

export default function RecordsModal() {
  const dispatch = useDispatch();
  const isVisible = useSelector(({ game: { isRecordsVisible } }) => isRecordsVisible);

  function onRecords() {
    dispatch(toggleRecordsModal());
  }

  return (
    <Modal
      show={isVisible}
      className="records-modal"
      centered
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName="modal-100w"
      onHide={onRecords}
      closeButton
      // style={{
      //   background: `url(${bg1})`,
      // }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <span>Records</span>
          <RecordsSVG />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="modal-container d-flex flex-column justify-content-center align-items-center w-100 h-100">
          {/* <Row className="text-center" id="contained-modal-title-vcenter">
            <div>
              <span>Records</span>
              <RecordsSVG />
            </div>
          </Row> */}
          <Row sm={12} xs={12} className="justify-content-center align-items-center">
            <Col lg={6} md={6} sm={12} xs={12}>
              Records...
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
