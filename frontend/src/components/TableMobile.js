import React, { useContext } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/Provider';
import Loading from './Loading';
import style from '../styles/Search.mobile.module.css';

const TableBrowser = ({ getDate, getEvent, handleDelete }) => {
  const { loading, communications } = useContext(Context);
  const navigate = useNavigate();
  if (loading) return <Loading />
  return (
    <section className={ style.card_sect }>
      {!loading && (
        communications.map((item) => (
          <section className={ style.card } key={ item.id }>
            <h3>{`${item.fullName}`}</h3>
            <p>{`Email: ${item.email}`}</p>
            <p>{`CPF: ${item.cpf}`}</p>
            <p>{`Última colheita: ${getDate(item.lastCrop)}`}</p>
            <p>{`Tipo da lavoura: ${item.type}`}</p>
            <p>{`Latitude: ${item.location.split(',')[0]}`}</p>
            <p>{`Longitude: ${item.location.split(',')[1]}`}</p>
            <h4>{`Evento: ${getEvent(item.event)?.name}`}</h4>
            <FaRegEdit
              className={ style.edit_btn }
              onClick={ () => navigate(`/register/${item.id}`) }
              aria-label="Editar registro"
            />
            <RiDeleteBinLine
              className={ style.delete_btn }
              onClick={ () => handleDelete(item.id) }
              aria-label="Deletar registro"
            />
          </section>
        ))
      )}
      </section>
  )
}

export default TableBrowser;
