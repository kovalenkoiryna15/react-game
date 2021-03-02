// BG
import bg1 from '~images/wp1814937.jpg';
import bg2 from '~images/wp1814943.jpg';
import bg6 from '~images/wp1814971.jpg';
import bg11 from '~images/wallpaper1.jpg';

// AUDIO
import shipExplosion from '~audio/ship-explosion.wav';
import laser from '~audio/laser.mp3';
import playbackMusic from '~audio/BlueSky.mp3';

export const audioSrs = {
  laser,
  shipExplosion,
  playbackMusic,
};

// PLAYERS
export const PLAYER1_NAME = 'Guardians of the Galaxy';
export const PLAYER2_NAME = 'Ronan\'s flagship';
export const PLAYER1 = 0;
export const PLAYER2 = 1;

// GAME
export const MAX_LIFE = 100;
export const MAX_RECORDS_NUM = 10;
export const BOARD_SIZE = 10;
export const MAX_SHIP_COUNT = 10;
export const ATTACK_TIME = 2000;
export const GAME_STORAGE_KEY = 'battleship';
export const DEFAULT_BACKGROUND_IMAGE_URL = bg1;
export const BG_URLS = [bg1, bg2, bg6, bg11];

// SHIPS
export const DEFAULT_SHIP_COLOR = '#41E969';
export const NUM_MINI_SHIPS = 4;
export const NUM_SMALL_SHIPS = 3;
export const NUM_MEDIUM_SHIPS = 2;
export const NUM_BIG_SHIPS = 1;
export const NUM_CELLS_MINI_SHIPS = 1;
export const NUM_CELLS_SMALL_SHIPS = 2;
export const NUM_CELLS_MEDIUM_SHIPS = 3;
export const NUM_CELLS_BIG_SHIPS = 4;
export const TYPE_MINI_SHIP = 'MINI_SHIPS';
export const TYPE_SMALL_SHIP = 'SMALL_SHIPS';
export const TYPE_MEDIUM_SHIP = 'MEDIUM_SHIPS';
export const TYPE_BIG_SHIP = 'BIG_SHIPS';
export const VERTICAL = 'vertical';
export const HORIZONTAL = 'horizontal';
export const HERE_IS_SEE = 0;
export const HERE_IS_BUFFER = 1;
export const HERE_IS_SHIP = 2;
export const HERE_IS_FIRE = 3;
export const HERE_IS_LOSER = 4;
export const upperCaseAlp = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
