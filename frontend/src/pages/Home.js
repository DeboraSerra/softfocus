import React from 'react';
import { SBanner } from '../styles';
import farm from '../images/banner-21.jpg';
import style from '../styles/Home.module.css'

const Home = () => {
  return (
    <section className={ style.banner }>
      <SBanner src={ farm } alt="Foto de uma fazenda" />
      <section>
        <h2>Bem vindo à SoftFocus</h2>
        <p>Quer saber mais sobre a gente?</p>
        <a href="https://softfocus.com.br/" target="_black">Clique aqui</a>
      </section>
    </section>
  )
}

export default Home;
