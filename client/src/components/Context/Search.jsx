import React, { useState,useContext, createContext } from "react";

// Create the context
const SearchContext = createContext();

// Create the provider component
export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState({
    keyword:"",
    results:[]
  });

  
  return (
    <SearchContext.Provider value={[search, setSearch]}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook to use Search context
export const UseSearch = () => useContext(SearchContext);

