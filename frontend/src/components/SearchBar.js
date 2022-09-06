import React, { useContext, useState } from 'react';
import { Context } from '../context/Provider';
import style from '../styles/SearchBar.module.css';

const SearchBar = () => {
  const [state, setState] = useState({
    cpf: '',
  });
  const [error, setError] = useState('');
  const { getCommunications, isMobile } = useContext(Context);

  const handleChange = ({ target }) => {
    let { value } = target;
    if (value.includes('.')) value = value.replace('.', '')
    if (value.includes('-')) value = value.replace('-', '');
    setState({
      cpf: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNaN(state.cpf)) {
      setError('CPF precisa conter apenas números')
      return;
    }
    if (state.cpf.length !== 11) {
      setError('CPF precisa conter exatamente 11 números')
      return;
    }
    setError('');
    getCommunications(state.cpf);
  }

  return (
    <form className={ isMobile ? style.form_mobile : style.form } onSubmit={ handleSubmit }>
      <label htmlFor="search">Pesquisar registro por CPF:
        <input
          className={ isMobile ? style.input_mobile : style.input }
          type="text"
          id="search"
          value={ state.search }
          onChange={ handleChange }
        />
      </label>
      <button className={ isMobile ? style.btn_mobile : style.button } type="submit">Pesquisar</button>
      {error && <p>{error}</p>}
    </form>
  )
}

export default SearchBar;
