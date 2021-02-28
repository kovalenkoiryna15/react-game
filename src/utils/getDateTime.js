const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function addZero(n) {
  if (typeof n === 'number') {
    return (n < 10 ? '0' : '') + n;
  }
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

export default function getDateTime() {
  const today = new Date();
  const date = today.getDate();
  const time = `${today.getHours()}:${addZero(today.getMinutes())}`;
  const month = months[today.getMonth()];
  return {
    date: `${date} ${month}`,
    time,
  };
}
