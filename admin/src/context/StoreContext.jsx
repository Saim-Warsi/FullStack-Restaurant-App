import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const backendUrl = "https://little-lemon-restaurant.up.railway.app";

  const contextValue = {
    showPopup,
    setShowPopup,
    url: backendUrl,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
