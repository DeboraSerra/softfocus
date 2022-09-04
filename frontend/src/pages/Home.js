import React, { useContext } from 'react';
import { SBanner } from '../styles';
import { Context } from '../context/Provider';
import farm from '../images/banner-21.jpg';
import style from '../styles/Home.module.css'

const Home = () => {
  const { isMobile } = useContext(Context);

  const renderBrowser = () => (
    <section className={ style.banner }>
      <SBanner src={ farm } alt="Foto de uma fazenda" />
      <section>
        <h2>Proagro Fácil</h2>
        <p>Esta plataforma é dedicada para cadastro de comunicação de perda ocorrida para exonerar o produtor rural de obrigações financeiras relativas a operações de crédito.</p>
        <p>Tenha em mãos os seguintes dados sobre o produtor:</p>
        <ul>
          <li>Nome completo</li>
          <li>E-mail</li>
          <li>CPF</li>
          <li>Latitude e longitude da lavoura</li>
          <li>O tipo da lavoura (milho, soja, trigo, etc)</li>
          <li>A data da última colheita</li>
          <li>O evento ocorrido</li>
        </ul>
        <p>Com esses dados em mãos, clique no link acima para comunicar o evento.</p>
      </section>
    </section>
  )

  const renderMobile = () => (
    <section className={ style.mobile_banner }>
      <SBanner src={ farm } alt="Foto de uma fazenda" />
      <section>
        <h2>Proagro Fácil</h2>
        <p>Esta plataforma é dedicada para cadastro de comunicação de perda ocorrida para exonerar o produtor rural de obrigações financeiras relativas a operações de crédito.</p>
        <p>Tenha em mãos os seguintes dados sobre o produtor:</p>
        <ul>
          <li>Nome completo</li>
          <li>E-mail</li>
          <li>CPF</li>
          <li>Latitude e longitude da lavoura</li>
          <li>O tipo da lavoura (milho, soja, trigo, etc)</li>
          <li>A data da última colheita</li>
          <li>O evento ocorrido</li>
        </ul>
        <p>Com esses dados em mãos, clique no link acima para comunicar o evento.</p>
      </section>
    </section>
  )
  return (
    <>
      {isMobile ? renderMobile() : renderBrowser()}
    </>
  )
}

export default Home;
