export const getLastTickets = async () => {
  const resp = await fetch('http://localhost:8080/lasts');
  const data = await resp.json();
  return data.lasts;
};
