import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SHeader, SLogo } from '../styles';
import Modal from 'react-modal';
import logo from '../images/Frame-2.png';
import { Context } from '../context/Provider';
import { GiHamburgerMenu } from 'react-icons/gi';
import style from '../styles/Header.module.css';

Modal.setAppElement('#root');

const Header = () => {
  const [modal, setModal] = useState(false);
  const { isMobile } = useContext(Context);

  const toggleModal = () => setModal(!modal);

  const closeModal = () => setModal(false);

  const renderBrowser = () => (
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

  const renderMobile = () => (
    <SHeader>
      <NavLink to="/">
        <SLogo className={ style.mobile_logo } src={ logo } alt="Logotipo da SoftFocus" />
      </NavLink>
      <GiHamburgerMenu className={ style.menu_icon } onClick={ toggleModal } />
      <Modal
        isOpen={ modal }
        onRequestClose={ closeModal }
        preventScroll={ true }
        className={ style.modal }
        overlayClassName={ style.overlay }
      >
        <nav>
          <Link
            className={ style.mobile_link }
            to="/register"
            onClick={ closeModal }
          >
            Comunicar um evento
          </Link>
          <Link
            className={ style.mobile_link }
            to="/search"
            onClick={ closeModal }
          >
            Buscar comunicações
          </Link>
        </nav>
      </Modal>
    </SHeader>
  )
  return (
    <>
      {!isMobile ? renderBrowser() : renderMobile()}
    </>
  )
}

export default Header;
