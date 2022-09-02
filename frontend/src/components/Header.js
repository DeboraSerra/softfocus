import React from 'react';
import { Link } from 'react-router-dom';
import { SHeader, SLogo } from '../styles';
import logo from '../images/Frame-2.png';

const Header = () => {
  return (
    <SHeader>
      <Link to="/">
        <SLogo src={ logo } alt="Logotipo da SoftFocus" />
      </Link>
      <nav>
        <Link to="/register">Comunicar um evento</Link>
        <Link to="/search">Buscar comunicações</Link>
      </nav>
    </SHeader>
  )
}

export default Header;
