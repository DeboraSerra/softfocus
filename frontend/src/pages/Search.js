import React, { useContext, useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import { Context } from '../context/Provider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from '../styles/Search.module.css';
import TableBrowser from '../components/TableBrowse';
import TableMobile from '../components/TableMobile';
import Loading from '../components/Loading';

const Search = () => {
  const [message, setMessage] = useState('');
  const [order, setOrder] = useState('');
  const { events, communications, getCommunications, changeLoading, setState, isMobile, loading } = useContext(Context);

  useEffect(() => {
    changeLoading();
    getCommunications();
  }, [])

  const handleDelete = async (id) => {
    changeLoading();
    const { data: { message } } = await axios({
      url: `https://softfocus.vercel.app/producer/delete/${id}`,
      method: 'delete',
    })
    setMessage(message);
    getCommunications();
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  const handleOrder = ({ target: { value } }) => {
    const newList = communications.sort((a, b) => value === 'asc'
      ? new Date(a.lastCrop) - new Date(b.lastCrop)
      : new Date(b.lastCrop) - new Date(a.lastCrop))
    setState((prevSt) => ({
      ...prevSt,
      communications: newList,
    }))
    setOrder(value);
  }

  const getEvent = (id) => events?.find((e) => e.id === id);
  const getDate = (date) => date.split('-').reverse().join('/');

  const renderBrowser = () => (
    <section>
      {message && <p className={ style.message }>{message}</p>}
      <SearchBar />
      <select className={ style.order } onChange={ handleOrder } value={ order }>
        <option disabled>Ordenar por</option>
        <option value="desc">Colheita mais recente</option>
        <option value="asc">Colheita mais antiga</option>
      </select>
      <TableBrowser
        getDate={ getDate }
        getEvent={ getEvent }
        handleDelete={ handleDelete }
      />
    </section>
  )

  const renderMobile = () => (
    <section>
      {message && <p className={ style.message }>{message}</p>}
      <section className={ style.search_sect }>
        <SearchBar />
        <select className={ style.order_mobile } onChange={ handleOrder } value={ order }>
          <option disabled>Ordenar por</option>
          <option value="desc">Colheita mais recente</option>
          <option value="asc">Colheita mais antiga</option>
        </select>
      </section>
      <TableMobile
        getDate={ getDate }
        getEvent={ getEvent }
        handleDelete={ handleDelete }
      />
    </section>
  )

  if (loading) return <Loading />
  return (
    <>
      {!isMobile ? renderBrowser() : renderMobile()}
    </>
  )
}

export default Search;
