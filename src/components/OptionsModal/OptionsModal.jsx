import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col, Row, Modal, Container,
} from 'react-bootstrap';
// import './OptionsModal.scss';
// import bg1 from '~images/wp1814937.jpg';
import OptionsSVG from '~components/OptionsSVG';
import {
  toggleOptionsModal,
} from '~store/game/actions';

export default function OptionsModal() {
  const dispatch = useDispatch();
  const isVisible = useSelector(({ game: { isOptionsVisible } }) => isOptionsVisible);

  function onOptions() {
    dispatch(toggleOptionsModal());
  }

  return (
    <Modal
      show={isVisible}
      className="options-modal"
      centered
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName="modal-100w"
      onHide={onOptions}
      closeButton
      // style={{
      //   background: `url(${bg1})`,
      // }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <span>Options</span>
          <OptionsSVG />
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
              Options...
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
