import { useContext, useEffect } from 'react';
import { UiContext } from '../context/UiContext';

const useHideSidebar = (hide = false) => {
  const { showSidebar, hideSidebar } = useContext(UiContext);

  useEffect(() => {
    if (hide) {
      hideSidebar();
    } else {
      showSidebar();
    }
  }, [hide, showSidebar, hideSidebar]);
};

export default useHideSidebar;
