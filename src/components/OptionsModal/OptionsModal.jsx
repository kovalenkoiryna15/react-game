import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col, Row, Modal, Container, Button, Alert,
} from 'react-bootstrap';
import './OptionsModal.scss';

import bgImgUrl from '~images/wp1814971.jpg';

import OptionsSVG from '~components/OptionsSVG';
import NewGameSVG from '~components/NewGameSVG';
import RangeInput from '~components/RangeInput';
import ColorSelect from '~components/ColorSelect';

import * as c from '~constants';
import {
  setRandom, validateShipsNum, resetIsShipNumValid, resetIsPlaying,
} from '~store/game/actions';
import { toggleOptionsModal, clearAlertMessage } from '~store/app/actions';

export default function OptionsModal() {
  const dispatch = useDispatch();
  const isVisible = useSelector(({ app: { isOptionsVisible } }) => isOptionsVisible);
  const playersIDs = useSelector(({ game: { players } }) => players);
  const maxNumMiniShip = useSelector(({ game: { [c.TYPE_MINI_SHIP]: { max } } }) => max);
  const maxNumSmallShip = useSelector(({ game: { [c.TYPE_SMALL_SHIP]: { max } } }) => max);
  const maxNumMediumShip = useSelector(({ game: { [c.TYPE_MEDIUM_SHIP]: { max } } }) => max);
  const maxNumBigShip = useSelector(({ game: { [c.TYPE_BIG_SHIP]: { max } } }) => max);
  const numMiniShip = useSelector(({ game: { [c.TYPE_MINI_SHIP]: { num } } }) => num);
  const numSmallShip = useSelector(({ game: { [c.TYPE_SMALL_SHIP]: { num } } }) => num);
  const numMediumShip = useSelector(({ game: { [c.TYPE_MEDIUM_SHIP]: { num } } }) => num);
  const numBigShip = useSelector(({ game: { [c.TYPE_BIG_SHIP]: { num } } }) => num);
  const typeMiniShip = useSelector(({ game: { [c.TYPE_MINI_SHIP]: { type } } }) => type);
  const typeSmallShip = useSelector(({ game: { [c.TYPE_SMALL_SHIP]: { type } } }) => type);
  const typeMediumShip = useSelector(({ game: { [c.TYPE_MEDIUM_SHIP]: { type } } }) => type);
  const typeBigShip = useSelector(({ game: { [c.TYPE_BIG_SHIP]: { type } } }) => type);
  const isValid = useSelector(({ game: { isShipNumValid } }) => isShipNumValid);
  const alertMessage = useSelector(({ app: { alert } }) => alert);

  function onOptions() {
    dispatch(toggleOptionsModal());
  }

  function onStart() {
    dispatch(validateShipsNum(numMiniShip, numSmallShip, numMediumShip, numBigShip));
  }

  useEffect(() => {
    if (isValid) {
      playersIDs.forEach((player) => dispatch(
        setRandom(player, numMiniShip, numSmallShip, numMediumShip, numBigShip),
      ));
      dispatch(resetIsPlaying());
      dispatch(clearAlertMessage());
      dispatch(resetIsShipNumValid());
      dispatch(toggleOptionsModal());
    }
  }, [
    isValid,
    playersIDs,
    dispatch,
    numMiniShip,
    numSmallShip,
    numMediumShip,
    numBigShip,
  ]);

  return (
    <Modal
      show={isVisible}
      className="options-modal"
      centered
      animation={false}
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName="modal-100w"
      onHide={onOptions}
      style={{
        background: `center / cover no-repeat url(${bgImgUrl})`,
      }}
    >
      <Modal.Body>
        <Container className="modal-container d-flex flex-column justify-content-center align-items-center w-100 h-100">
          <Row md={12} sm={12} xs={12} className="justify-content-center align-items-center mx-1 px-1 w-100">
            <Col md={9} sm={12} xs={12}>
              <Row md={12} sm={12} xs={12} className="my-1">
                <Col md={12} sm={12} xs={12} className="text-center">
                  <h4 className="px-1">
                    Options
                    <span className="mx-1">
                      <OptionsSVG />
                    </span>
                  </h4>
                </Col>
              </Row>
              {
                isValid
                  ? null
                  : (
                    <Row md={12} sm={12} xs={12}>
                      <Col md={12} sm={12} xs={12} className="text-center">
                        <Alert className="mb-1">{alertMessage}</Alert>
                      </Col>
                    </Row>
                  )
              }
              <Row md={12} sm={12} xs={12} className="mb-4 justify-content-center align-items-center">
                <Col md={6} sm={12} xs={12}>
                  <Row md={12} sm={12} xs={12}>
                    <Col sm={6} xs={6} className="text-center">Ship color</Col>
                    <Col sm={6} xs={6}><ColorSelect /></Col>
                  </Row>
                </Col>
              </Row>
              <Row md={12} sm={12} xs={12} className="mb-1">
                <Col md={12} sm={12} xs={12}>
                  <Row md={12} sm={12} xs={12}>
                    <RangeInput
                      max={maxNumMiniShip}
                      ship={typeMiniShip}
                    />
                  </Row>
                </Col>
              </Row>
              <Row md={12} sm={12} xs={12} className="mb-1">
                <Col md={12} sm={12} xs={12}>
                  <Row md={12} sm={12} xs={12}>
                    <RangeInput
                      max={maxNumSmallShip}
                      ship={typeSmallShip}
                    />
                  </Row>
                </Col>
              </Row>
              <Row md={12} sm={12} xs={12} className="mb-1">
                <Col md={12} sm={12} xs={12}>
                  <Row md={12} sm={12} xs={12}>
                    <RangeInput
                      max={maxNumMediumShip}
                      ship={typeMediumShip}
                    />
                  </Row>
                </Col>
              </Row>
              <Row md={12} sm={12} xs={12} className="mb-1">
                <Col md={12} sm={12} xs={12}>
                  <Row md={12} sm={12} xs={12}>
                    <RangeInput
                      max={maxNumBigShip}
                      ship={typeBigShip}
                    />
                  </Row>
                </Col>
              </Row>
              <Row md={12} sm={12} xs={12} className="justify-content-center align-items-center">
                <Col md={4} sm={12} xs={12}>
                  <Button className="w-100 options btn-svg" onClick={onStart}>
                    <span>Save & Start</span>
                    <NewGameSVG />
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
