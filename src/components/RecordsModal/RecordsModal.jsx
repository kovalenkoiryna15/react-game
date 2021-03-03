import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col, Row, Modal, Container,
} from 'react-bootstrap';
import './RecordsModal.scss';

import RecordsSVG from '~components/RecordsSVG';

import bgImgUrl from '~images/wallpaper1.jpg';

import { toggleRecordsModal } from '~store/app/actions';

export default function RecordsModal() {
  const dispatch = useDispatch();
  const isVisible = useSelector(({ app: { isRecordsVisible } }) => isRecordsVisible);
  const userRecords = useSelector(({ game: { records } }) => records);

  function onRecords() {
    dispatch(toggleRecordsModal());
  }

  return (
    <Modal
      show={isVisible}
      animation={false}
      className="records-modal"
      centered
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName="modal-100w"
      onHide={onRecords}
      style={{
        background: `center / cover no-repeat url(${bgImgUrl})`,
      }}
    >
      <Modal.Header closeButton className="text-center justify-content-center align-items-center">
        <Row className="text-center justify-content-center align-items-center w-100" id="contained-modal-title-vcenter">
          <h3>Records</h3>
          <RecordsSVG />
        </Row>
      </Modal.Header>
      <Modal.Body>
        <Container className="modal-container d-flex flex-column justify-content-center align-items-center w-100 h-100">
          <Row sm={12} xs={12} className="justify-content-center align-items-center">
            <Col sm={12} xs={12}>
              <Row>
                <Col>Attacks</Col>
                <Col>Date, Time</Col>
              </Row>
            </Col>
            {
              userRecords.length
                ? userRecords.map((record) => (
                  <Col sm={12} xs={12} key={Date.now()}>
                    <Row>
                      <Col>{`${record.userAttacks}`}</Col>
                      <Col>{`${record.date}, ${record.time}`}</Col>
                    </Row>
                  </Col>
                ))
                : (
                  <Col sm={12} xs={12}>
                    No Records yet ...
                  </Col>
                )
            }
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
