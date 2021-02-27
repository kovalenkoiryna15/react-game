import * as React from 'react';
import { Row, Col } from 'react-bootstrap';
import './Footer.scss';

import GitHubLogoSVG from './GitHubLogoSVG';
import RSSLogoSVG from './RSSLogoSVG';

const Footer = () => (
  <Row lg={12} md={12} sm={12} xs={12} className="footer text-centerrotate w-100">
    <Col md={4} sm={4} xs={12} className="footer-col">
      Battleship Game, 2021
    </Col>
    <Col md={4} sm={4} xs={12} className="footer-col">
      <Row className="flex-grow-1">
        <Col>
          <a className="collaborator" href="https://github.com/kovalenkoiryna15" target="blank">
            &copy; Iryna Kavalenka
            &nbsp;
            <GitHubLogoSVG />
          </a>
        </Col>
      </Row>
    </Col>
    <Col md={4} sm={4} xs={12} className="footer-col">
      <RSSLogoSVG />
    </Col>
  </Row>
);

export default Footer;
