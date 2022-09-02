import React from 'react';
import { NavLink } from 'react-router-dom';
import { SHeader, SLogo } from '../styles';
import logo from '../images/Frame-2.png';

const Header = () => {
  return (
    <SHeader>
      <NavLink to="/">
        <SLogo src={ logo } alt="Logotipo da SoftFocus" />
      </NavLink>
      <nav>
        <NavLink
          className={ ({ isActive }) => isActive ? 'link active' : 'link'}
          to="/register"
        >
          Comunicar um evento
        </NavLink>
        <NavLink
          className={ ({ isActive }) => isActive ? 'link active' : 'link'}
          to="/search"
        >
          Buscar comunicações
        </NavLink>
      </nav>
    </SHeader>
  )
}

export default Header;
