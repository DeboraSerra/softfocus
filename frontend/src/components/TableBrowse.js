import React, { useContext } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/Provider';
import { STable } from '../styles';
import style from '../styles/Search.module.css';

const TableBrowser = ({ getDate, getEvent, handleDelete }) => {
  const { loading, communications } = useContext(Context);
  const navigate = useNavigate();
  return (
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
  )
}

export default TableBrowser;
