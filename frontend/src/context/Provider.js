import React, { createContext, useEffect, useState } from 'react';

export const Context = createContext();

const url = process.env.REACT_APP_API;

const Provider = ({ children }) => {
  const [state, setState] = useState({
    events: [],
  })

  useEffect(() => {
    getEvents();
  }, [])

  const getEvents = async () => {
    const response = await fetch('http://localhost:8000/events');
    const data = await response.json();
    setState((prevSt) => ({
      ...prevSt,
      events: data,
    }))
  }

  const getCommunications = async () => {
    const response = await fetch('http://localhost:8000/producer')
    const data = await response.json();
    console.log(data)
  }

  const value = {
    ...state,
    getCommunications,
  }
  return (
    <Context.Provider value={ value }>
      {children}
    </Context.Provider>
  )
}

export default Provider;
