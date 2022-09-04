import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../context/Provider';
import axios from 'axios';
import style from '../styles/Register.module.css';
import FormBrowser from '../components/FormBrowser';
import FormMobile from '../components/FormMobile';
import Loading from '../components/Loading';

const Register = () => {
  const [state, setState] = useState({
    fullName: '',
    email: '',
    cpf: '',
    type: '',
    lastCrop: '',
    event: '',
    latitude: '',
    longitude: '',
  });
  const [registers, setRegisters] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState('');
  const { fullName, email, cpf, type, lastCrop, event, latitude, longitude } = state;
  const { events, communications, getCommunications, isMobile, changeLoading, loading } = useContext(Context);

  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = ({ target }) => {
    setError('');
    const { name }  = target;
    let { value } = target;
    if (name === 'cpf') {
      value = value.includes('.') || value.includes('-')
        ? value.split('.').join('').split('-').join('')
        : value;
    }
    setState((prevSt) => ({
      ...prevSt,
      [name]: value,
    }))
  }

  useEffect(() => {
    getComs();
  }, [])

  const getComs = async () => {
   await getCommunications();
   if (id) {
    const com = communications?.find((comm) => comm.id === +id);
    setState((prevSt) => ({
      ...prevSt,
      fullName: com.fullName,
      email: com.email,
      cpf: com.cpf,
      event: com.event,
      lastCrop: com.lastCrop,
      latitude: com.location.split(',')[0].replace('.', ','),
      longitude: com.location.split(',')[1].replace('.', ','),
      type: com.type,
    }))
   }
  }

  // https://www.devmedia.com.br/validar-cpf-com-javascript/23916
  const validateCpf = () => {
    let sum = 0;
    let rest = 0;
    if (cpf === '00000000000') return false;
    for (let i = 1; i <= 9; i += 1) {
      sum += parseInt(cpf.substring(i-1, i)) * (11 - i);
    }
    rest = (sum * 10) % 11;
    if ((rest === 10) || (rest === 11)) rest = 0;
    if (rest !== parseInt(cpf.substring(9, 10))) return false;
    sum = 0
    for (let i = 1; i <= 10; i += 1) {
      sum = sum + parseInt(cpf.substring(i-1, i)) * (12 - i);
    }
    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf.substring(10, 11))) return false;
    return true;
  }

  useEffect(() => {
    const validFields = fullName && email && type && lastCrop && latitude && longitude && event;
    const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/g.test(email);
    const validCpf = cpf && validateCpf();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    changeLoading();
    const filtered = registers.filter(({ location }) => {
      const [lat, lon] = location.split(',');
      const distance = getDistanceFromLatLonInKm(+latitude.replace(',', '.'), +longitude.replace(',', '.'), +lat, +lon);
      return distance <= 10;
    })
    const list = filtered.filter(({ event: eventId }) => event === eventId);
    if (list.length !== 0) {
      setRegisters(list);
      changeLoading();
      return;
    }
    const location = `${latitude.replace(',', '.')},${longitude.replace(',', '.')}`;
    const { latitude: lat, longitude: lon, ...info } = state;
    let url = 'https://softfocus.vercel.app/producer';
    if (id) url += `/get/${+id}`;
    const data = await axios({
      url,
      method: id ? 'put' : 'post',
      data: { ...info, location },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    if (data.data.message) {
      setError(data.data.message);
      return;
    }
    getCommunications();
    navigate('/search');
  }

  const renderBrowser = () => (
    <section>
      {!!error && <p>{error}</p>}
      {events?.find((ev) => ev.id !== event) && registers.length > 0 && (
        <section className={ style.warning }>
          <p>Nesse dia foram reportados os seguintes eventos:</p>
          <section className={ style.card_sect }>
            {registers.map((reg) => (
              <section className={ style.card } key={ reg.id }>
                <p>{reg.fullName}</p>
                <p>{reg.location}</p>
                <p>{events.find(({ id }) => id === reg.event).name}</p>
              </section>
            ))}
          </section>
        </section>
      )}
      <FormBrowser
        handleSubmit={ handleSubmit }
        handleChange={ handleChange}
        {...state}
        disabled={ disabled }
      />
    </section>
  )

  const renderMobile = () => (
    <section>
      {!!error && <p>{error}</p>}
      {events?.find((ev) => ev.id !== event) && registers.length > 0 && (
        <section className={ style.warning }>
          <p>Nesse dia foram reportados os seguintes eventos:</p>
          <section className={ style.card_sect }>
            {registers.map((reg) => (
              <section className={ style.card } key={ reg.id }>
                <p>{reg.fullName}</p>
                <p>{reg.location}</p>
                <p>{events.find(({ id }) => id === reg.event).name}</p>
              </section>
            ))}
          </section>
        </section>
      )}
      <FormMobile
        handleSubmit={ handleSubmit }
        handleChange={ handleChange}
        {...state}
        disabled={ disabled }
      />
    </section>
  )

  if (loading) return <Loading />
  return (
    <section>
      {!isMobile ? (
        renderBrowser()
      ) : renderMobile()}
    </section>
  )
}

export default Register;
