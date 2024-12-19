'use client'

import React, { createContext, useState, useContext } from 'react';

const SignalContext = createContext();

export const SignalProvider = ({ children }) => {
  const [cartSignal, setCartSignal] = useState(false);

  const triggerCartAnimation = () => {
    setCartSignal(true);
    setTimeout(() => setCartSignal(false), 1000);
  };

  return (
    <SignalContext.Provider value={{ cartSignal, triggerCartAnimation }}>
      {children}
    </SignalContext.Provider>
  );
};

export const useSignal = () => useContext(SignalContext);
