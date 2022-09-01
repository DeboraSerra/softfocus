import styled from 'styled-components';

const SHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 24px 48px;
  background-image: linear-gradient(180.99093543743027deg, rgba(0, 202, 237,1) -0.18723628691983119%,rgba(1, 202, 236,1) -0.18723628691983119%,rgba(108, 216, 235,1) 24.003823839662445%,rgba(181, 227, 235,1) 53.00105485232067%,rgba(255, 255, 255,1) 76.71149789029536%);
  & nav {
    width: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & a {
      text-decoration: none;
      color: var(--gray);
      font-size: 1.2rem;

      &:hover {
        opacity: 0.9;
      }

      &:active {
        color: var(--blue);
      }
    }
  }
`;

const SMain = styled.main`
  width: 100%;
  min-height: 70vh;
`;

const SFooter = styled.footer`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-image: linear-gradient(179.52243830414005deg, rgba(255, 255, 255,1) 30.925632911392405%,rgba(6, 106, 84,1) 89.25896624472574%,rgba(5, 106, 84,1) 89.25896624472574%);
  height: 125px;
  color: var(--gray);
`

const SLogo = styled.img`
  width: 10%;
`;

const SBanner = styled.img`
  width: 100vw;
  height: 700px;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity:  0.8;
`;

export {
  SHeader,
  SMain,
  SFooter,
  SLogo,
  SBanner
}
