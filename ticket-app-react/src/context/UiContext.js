import React, { createContext, useState } from 'react';

const UiContext = createContext();

const UiProvider = ({ children }) => {
  const [isSidebarClose, setIsSidebarClose] = useState(false);

  const showSidebar = () => {
    setIsSidebarClose(false);
  };

  const hideSidebar = () => {
    setIsSidebarClose(true);
  };

  return (
    <UiContext.Provider value={{ isSidebarClose, showSidebar, hideSidebar }}>
      {children}
    </UiContext.Provider>
  );
};

export { UiContext, UiProvider };
