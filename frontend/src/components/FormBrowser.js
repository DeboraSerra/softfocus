import React, { useContext } from 'react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import ReactTooltip from 'react-tooltip';
import { Context } from '../context/Provider';
import Loading from './Loading';
import { SButton, SForm, SInput, SInputHalf, SSelect } from '../styles';
import style from '../styles/Register.module.css';

const FormBrowser = ({ handleSubmit, handleChange, fullName, email, latitude, longitude, cpf, type, lastCrop, event, disabled }) => {
  const { events, loading } = useContext(Context);

  const date = new Date().toISOString().split('T')[0];
  if (loading) return <Loading />
  return (
    <SForm onSubmit={ handleSubmit }>
      <ReactTooltip
        place="right"
        effect="float"
        multiline={ true }
        id="location"
        isCapture={ false }
      >
        <p>Para achar a localização da sua lavoura, <br />acesse o google maps, clique com o botão direito <br />sobre o local da sua lavoura e copie os dois números que<br /> aparecem na posição inferior da tela. <br /> O primeiro é a latitude e o segundo é a longitude.</p>
      </ReactTooltip>
      <SInput
        type="text"
        name="fullName"
        value={ fullName }
        onChange={ handleChange }
        placeholder="Nome completo do produtor"
        aria-label="Nome completo do produtor"
      />
      <SInput
        type="email"
        name="email"
        value={ email }
        onChange={ handleChange }
        placeholder="E-mail do produtor"
        aria-label="E-mail do produtor"
      />
      <SInput
        type="text"
        name="cpf"
        value={ cpf }
        onChange={ handleChange }
        placeholder="CPF do produtor"
        aria-label="CPF do produtor"
      />
      <SInput
        type="text"
        name="type"
        value={ type }
        onChange={ handleChange }
        placeholder="Tipo da lavoura"
        aria-label="Tipo da lavoura"
      />
      <label htmlFor="date" style={{ width: '100%', textAlign: 'center' }}>
        Data da última colheita
        <SInput
          id="date"
          type="date"
          name="lastCrop"
          value={ lastCrop }
          onChange={ handleChange }
          placeholder="Data da última colheita"
          aria-label="Data da última colheita"
          max={ date }
        />
      </label>
      <section className={ style.sect }>
        <SInputHalf
          type="text"
          name="latitude"
          value={ latitude }
          onChange={ handleChange }
          placeholder="Latidude da lavoura"
          aria-label="Latidude da lavoura"
        />
        <SInputHalf
          type="text"
          name="longitude"
          value={ longitude }
          onChange={ handleChange }
          placeholder="Longitude da lavoura"
          aria-label="Longitude da lavoura"
        />
        <AiOutlineQuestionCircle
          data-tip
          data-for="location"
        />
      </section>
      <SSelect name="event" onChange={ handleChange } value={ event }>
        <option value="" disabled>Selecione o evento</option>
        {events.map(({ id, name }) => (
          <option key={ id } value={ id }>{name}</option>
        ))}
      </SSelect>
      <SButton
        type="submit"
        disabled={ disabled }
      >
        Cadastrar
      </SButton>
    </SForm>
  )
}

export default FormBrowser;
