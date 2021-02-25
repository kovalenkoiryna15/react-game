export const saveLocal = (newState, player) => {
  localStorage.removeItem(`${player}`);
  const board = [];
  board.push(newState);
  localStorage.setItem(`${player}`, JSON.stringify(board));
  return new Promise((resolve) => {
    setTimeout(() => {
      const textResponse = JSON.stringify({ board: newState });
      const myBody = new Blob([textResponse]);
      const myResponse = new Response(myBody);
      resolve(myResponse);
    }, 0);
  });
};

export const getLocal = (player) => {
  const localState = localStorage.getItem(`${player}`);
  if (!localState) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('You have not any started game. Please start new game.'));
      }, 0);
    });
  }
  const data = JSON.parse(localState);
  return new Promise((resolve) => {
    setTimeout(() => {
      const textResponse = JSON.stringify({ board: data });
      const myBody = new Blob([textResponse]);
      const myResponse = new Response(myBody);
      resolve(myResponse);
    }, 0);
  });
};
