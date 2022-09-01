import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/Provider';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import { SButton, SForm, SInput, SInputHalf, SSelect } from '../styles';
import style from '../styles/Register.module.css';

const Register = () => {
  const [state, setState] = useState({
    fullName: '',
    email: '',
    cpf: '',
    type: '',
    lastCrop: '',
    event: 1,
    latitude: '',
    longitude: '',
  });
  const [registers, setRegisters] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState('');
  const { fullName, email, cpf, type, lastCrop, event, latitude, longitude } = state;
  const { events, communications } = useContext(Context);

  const navigate = useNavigate()

  const handleChange = ({ target }) => {
    const { name }  = target;
    let { value } = target;
    if (name === 'cpf') {
      value = value.includes('.') || value.includes('-')
        ? value.split('.').join('').split('-').join('') : value;
    }
    setState((prevSt) => ({
      ...prevSt,
      [name]: value,
    }))
  }

  useEffect(() => {
    const validFields = fullName && email && type && lastCrop && latitude && longitude;
    const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/g.test(email);
    const validCpf = cpf && cpf.length === 11;
    setDisabled(!validFields || !validEmail || !validCpf);
  }, [fullName, email, cpf, type, lastCrop, event, latitude, longitude])

  useEffect(() => {
    const filtered = communications.filter(({ lastCrop: date }) => date === lastCrop);
    setRegisters(filtered);
  }, [lastCrop])

  // https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2-lat1);  // deg2rad below
    const dLon = deg2rad(lon2-lon1);
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // Distance in km
    return d;
  }

  const deg2rad = (deg) => {
    return deg * (Math.PI/180)
  }

  useEffect(() => {
    const filtered = registers.filter(({ location }) => {
      const [lat, lon] = location.split(',');
      const distance = getDistanceFromLatLonInKm(latitude, longitude, lat, lon);
      return distance < 10;
    })
    const list = filtered.filter(({ event: eventId }) => event === eventId);
    setRegisters(list);
  }, [disabled])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const location = `${latitude},${longitude}`;
    const { latitude: lat, longitude: lon, ...info } = state;
    const data = await axios.post('http://localhost:8000/producer', { ...info, location });
    if (data.message) {
      setError(data.message);
      return;
    }
    navigate('/search');
  }

  const date = new Date().toISOString().split('T')[0];

  return (
    <SForm>
      {registers.length > 0 && (
        <section>
          <p>O evento informado está divergente dos registros abaixo:</p>
          {registers.map((reg) => (
            <section>
              <p>{reg.fullName}</p>
              <p>{reg.location}</p>
              <p>{events.find(({ id }) => id === reg.event).name}</p>
            </section>
          ))}
        </section>
      )}
      <ReactTooltip place="bottom" effect="solid" multiline={ true } id="location">
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
      <SInput
        type="date"
        name="lastCrop"
        value={ lastCrop }
        onChange={ handleChange }
        placeholder="Data da última colheita"
        aria-label="Data da última colheita"
        max={ date }
      />
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

export default Register;
