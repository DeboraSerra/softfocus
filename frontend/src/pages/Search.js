import React, { useContext, useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import { Context } from '../context/Provider';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { STable } from '../styles';
import style from '../styles/Search.module.css';

const Search = () => {
  const [message, setMessage] = useState('');
  const [order, setOrder] = useState('');
  const { loading, events, communications, getCommunications, changeLoading, setState } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    changeLoading();
    getCommunications();
  }, [])

  const handleDelete = async (id) => {
    changeLoading();
    const { data: { message } } = await axios({
      url: `http://localhost:8000/producer/delete/${id}`,
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

  return (
    <section>
      {message && <p className={ style.message }>{message}</p>}
      <SearchBar />
      <select className={ style.order } onChange={ handleOrder } value={ order }>
        <option disabled>Ordenar por</option>
        <option value="desc">Colheita mais recente</option>
        <option value="asc">Colheita mais antiga</option>
      </select>
      <STable>
        <thead>
          <tr>
            <th>Nome completo</th>
            <th>Email do produtor</th>
            <th>CPF do produtor</th>
            <th>Data da última colheita</th>
            <th>Tipo da lavoura</th>
            <th>Latitude da lavoura</th>
            <th>Longitude da lavoura</th>
            <th>Evento ocorrido</th>
            <th>Editar</th>
            <th>Deletar</th>
          </tr>
        </thead>
        <tbody>
          {!loading && (
            communications.map((item) => (
              <tr key={ item.id }>
                <td>{item.fullName}</td>
                <td>{item.email}</td>
                <td>{item.cpf}</td>
                <td>{getDate(item.lastCrop)}</td>
                <td>{item.type}</td>
                <td>{item.location.split(',')[0]}</td>
                <td>{item.location.split(',')[1]}</td>
                <td>{getEvent(item.event)?.name}</td>
                <td>
                  <FaRegEdit
                    className={ style.edit_btn }
                    onClick={ () => navigate(`/register/${item.id}`) }
                  />
                </td>
                <td>
                  <RiDeleteBinLine
                    className={ style.delete_btn }
                    onClick={ () => handleDelete(item.id) }
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </STable>
    </section>
  )
}

export default Search;
