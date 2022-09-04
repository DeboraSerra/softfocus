import React from 'react';
import style from '../styles/Loading.module.css';

const Loading = () => (
  <section className={ style.loading }>
    <section className={ style.load_bar } />
    <section className={ style.load_bar } />
    <section className={ style.load_bar } />
    <section className={ style.load_bar } />
    <section className={ style.load_bar } />
  </section>
)

export default Loading;
