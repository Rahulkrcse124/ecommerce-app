import React, { useState,useContext, createContext,useEffect } from "react";

// Create the context
const CardContext = createContext();

// Create the provider component
export const CardProvider = ({ children }) => {
  const [card, setCard] = useState([]);

  useEffect(()=> {
    let existingCartItem = localStorage.getItem("cart");
    if(existingCartItem) {
      setCard(JSON.parse(existingCartItem))
    }
  },[])

  return (
    <CardContext.Provider value={[card, setCard]}>
      {children}
    </CardContext.Provider>
  );
};

// Custom hook to use Card context
export const UseCard = () => useContext(CardContext);

