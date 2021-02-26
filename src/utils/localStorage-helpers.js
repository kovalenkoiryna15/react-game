export const setLocal = (state, id) => {
  localStorage.removeItem(`${id}-battleship`);
  localStorage.setItem(`${id}-battleship`, JSON.stringify(state));
};

export const getLocal = (id) => {
  const localState = localStorage.getItem(`${id}-battleship`);
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
      const textResponse = JSON.stringify({ game: { [id]: data } });
      const myBody = new Blob([textResponse]);
      const myResponse = new Response(myBody);
      resolve(myResponse);
    }, 0);
  });
};
