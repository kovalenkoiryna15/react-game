/* eslint-disable no-nested-ternary */

// Source: https://github.com/Darth-Knoppix/example-react-fullscreen

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import useFullscreenStatus from '~utils/useFullscreenStatus';
import ExpandSVG from './ExpandSVG';

export default function FullScreen({ children }) {
  const isPlay = useSelector(({ game: { isPlaying } }) => isPlaying);
  const fullScreenElement = React.useRef(null);
  let isFullscreen;
  let setIsFullscreen;
  let errorMessage;

  try {
    [isFullscreen, setIsFullscreen] = useFullscreenStatus(fullScreenElement);
  } catch (e) {
    errorMessage = 'Fullscreen not supported';
    isFullscreen = false;
    setIsFullscreen = undefined;
  }

  const handleExitFullscreen = () => document.exitFullscreen();

  return (
    <div
      ref={fullScreenElement}
      className={`fullscreen-container ${
        isFullscreen ? 'fullscreen' : 'default'
      }`}
    >
      <div className="fullscreen-content">{children}</div>
      <div className="fullscreen-actions">
        {errorMessage ? (
          <button
            type="button"
            onClick={() => new Error(
              'Fullscreen is unsupported by this browser, please try another browser.',
            )}
          >
            {errorMessage}
          </button>
        ) : isFullscreen ? (
          <button
            type="button"
            onClick={handleExitFullscreen}
            className="my-button"
            style={isPlay ? { display: 'block' } : null}
          >
            <ExpandSVG />
          </button>
        ) : (
          <button
            type="button"
            onClick={setIsFullscreen}
            className="my-button"
            style={isPlay ? { display: 'block' } : null}
          >
            <ExpandSVG />
          </button>
        )}
      </div>
    </div>
  );
}

FullScreen.propTypes = {
  children: PropTypes.node.isRequired,
};
