import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const Context = createContext();

const Provider = ({ children }) => {
  const [state, setState] = useState({
    events: [],
    communications: [],
    loading: true,
    isMobile: false,
  })

  useEffect(() => {
    getEvents();
    getCommunications();
  }, [])

  const changeLoading = () => {
    setState((prevSt) => ({
      ...prevSt,
      loading: !state.loading,
    }))
  }

  const getEvents = async () => {
    const data = await axios('https://softfocus.vercel.app/events')
    setState((prevSt) => ({
      ...prevSt,
      events: data.data,
      loading: false,
      isMobile: window.matchMedia('(max-width: 425px)').matches,
    }))
  }

  const getCommunications = async (cpf = '') => {
    let url = 'https://softfocus.vercel.app/producer';
    if (cpf) url += `/${cpf}`;
    const data = await axios(url)
    setState((prevSt) => ({
      ...prevSt,
      communications: data.data,
      loading: false,
    }))
  }

  const value = {
    ...state,
    getCommunications,
    changeLoading,
    setState,
  }
  return (
    <Context.Provider value={ value }>
      {children}
    </Context.Provider>
  )
}

export default Provider;
