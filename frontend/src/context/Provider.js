import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const Context = createContext();

const Provider = ({ children }) => {
  const [state, setState] = useState({
    events: [],
    communications: [],
  })

  useEffect(() => {
    getEvents();
    getCommunications()
  }, [])

  const getEvents = async () => {
    const data = await axios('http://localhost:8000/events')
    setState((prevSt) => ({
      ...prevSt,
      events: data.data,
    }))
  }

  const getCommunications = async () => {
    const data = await axios('http://localhost:8000/producer')
    setState((prevSt) => ({
      ...prevSt,
      communications: data.data,
    }))
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
