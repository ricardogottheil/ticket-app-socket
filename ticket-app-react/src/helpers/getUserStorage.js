const getUserStorage = () => {
  return {
    agent: localStorage.getItem('agent'),
    desktop: localStorage.getItem('desktop'),
  };
};

export { getUserStorage };
