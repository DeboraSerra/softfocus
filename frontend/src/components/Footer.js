import React from 'react';
import { SFooter } from '../styles';

const Footer = () => {
  return (
    <SFooter>
      <section>
        <p>Quer saber mais sobre a SoftFocus?</p>
        <a href="https://softfocus.com.br/" target="_black">Clique aqui</a>
      </section>
      <p>
        Desenvolvido por
        {' '}
        <a href="https://github.com/DeboraSerra">
          Débora Serra
        </a>
      </p>
    </SFooter>
  )
}

export default Footer;
