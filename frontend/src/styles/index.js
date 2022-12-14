import styled from 'styled-components';

const SHeader = styled.header`
  width: 100%;
  height: 15vh;
  display: flex;
  justify-content: space-between;
  padding: 24px 48px;
  background-image: linear-gradient(180deg, rgba(0, 202, 237,1),rgba(1, 202, 236,1),rgba(108, 216, 235,1) 24%,rgba(181, 227, 235,1) 53%,rgba(255, 255, 255,1) 76%);
  & nav {
    width: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & .link {
      text-decoration: none;
      color: var(--gray);
      font-size: 1.2rem;
      padding-bottom: 8px;

      &:hover {
        opacity: 0.9;
      }

      &:active {
        color: var(--accent);
      }
    }

    & .active {
      border-bottom: 1px solid var(--blue);
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
  background-image: linear-gradient(180deg, rgba(255, 255, 255,1) 31%,rgba(6, 106, 84,1) 90%,rgba(5, 106, 84,1) 90%);
  height: 15vh;
  color: var(--gray);
  text-align: center;

  & p {
    margin: 12px;
  }

  & a {
    text-decoration: none;
    color: black;
  }

  & a:hover {
    opacity: 0.8;
  }

  & a:active {
    color: var(--accent);
  }
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
  opacity:  0.7;
`;

const SForm = styled.form`
  width: 60%;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const SFormHorizontal = styled.form`
  width: 60%;
  margin: auto;
  display: flex;
  justify-content: space-around;
`;

const SInput = styled.input`
  width: 90%;
  text-align: center;
  margin: 16px auto;
  padding: 16px 8px;
  font-size: 1.2rem;
  border-radius: 8px;
  border: none;
  background-color: var(--lighter-gray);
  position: relative;
  color: var(--gray);
  &::placeholder {
    color: var(--gray);
  }
`;

const SInputHalf = styled.input`
  width: 40%;
  text-align: center;
  margin: 16px auto;
  padding: 16px 8px;
  font-size: 1.2rem;
  border-radius: 8px;
  border: none;
  background-color: var(--lighter-gray);
  position: relative;
  color: var(--gray);
  &::placeholder {
    color: var(--gray);
  }
`;

const SSelect = styled.select`
  width: 90%;
  text-align: center;
  margin: 16px auto;
  padding: 16px 8px;
  font-size: 1.2rem;
  border-radius: 8px;
  border: none;
  background-color: var(--lighter-gray);
  position: relative;
  color: var(--gray);
  &::placeholder {
    color: var(--gray);
  }
`;

const SButton = styled.button`
  background-color: var(--blue);
  width: 90%;
  margin: 16px auto;
  border: none;
  color: var(--lighter-gray);
  border-radius: 8px;
  padding: 16px;
  font-size: 1.2rem;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    background-color: var(--accent);
  }
  &:disabled {
    background-color: var(--light-gray);
    color: var(--gray);
    &:hover {
      opacity: 1;
    }
  }
`;

const STable = styled.table`
  border: 1px solid var(--gray);
  padding: 4px;
  margin: auto;
  text-align: center;

  & td, & th {
    padding: 8px;
  }

  & td {
    border-top: 1px solid var(--gray);
  }
`;

export {
  SHeader,
  SMain,
  SFooter,
  SLogo,
  SBanner,
  SInput,
  SForm,
  SInputHalf,
  SSelect,
  SButton,
  SFormHorizontal,
  STable,
}
