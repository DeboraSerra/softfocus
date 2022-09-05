# Processo seletivo desenvolvedor júnior fullstack Softfocus

Projeto desenvolvido como parte do processo seletivo para o cargo de desenvolvedor web júnior full stack. Esse projeto consiste em uma API construída em Python que acessa um banco de dados relacional postgreSQL hospedado no supabase. O front dessa aplicação foi construído em React utilizando Context API para gerenciamento do estado global da aplicação.

<br />

A documentação da API se encontra nesse [link](https://softfocus.docs.apiary.io/#reference/0/eventos);

<br />

Para ver a aplicação em funcionando acesse esse [link](https://proagro.vercel.app/)

## Sumário
- [Processo seletivo desenvolvedor júnior fullstack Softfocus](#processo-seletivo-desenvolvedor-júnior-fullstack-softfocus)
  - [Sumário](#sumário)
  - [Estrutura de pastas](#estrutura-de-pastas)
  - [Funcionalidades](#funcionalidades)
    - [Backend](#backend)
      - [GET /events](#get-events)
      - [GET /producer](#get-producer)
      - [GET /producer/:cpf](#get-producercpf)
      - [POST /producer](#post-producer)
      - [PUT /producer/get/:id](#put-producergetid)
      - [DELETE /producer/delete/:id](#delete-producerdeleteid)
    - [Frontend](#frontend)
  - [Tecnologias utilizadas](#tecnologias-utilizadas)
  - [Rodando o projeto](#rodando-o-projeto)

## Estrutura de pastas

<details>
  <summary>Estrutura de pastas do projeto</summary>

```
.
├── backend
│   ├── backend
│   │   ├── asgi.py
│   │   ├── __init__.py
│   │   ├── __pycache__
│   │   │   ├── __init__.cpython-38.pyc
│   │   │   ├── settings.cpython-38.pyc
│   │   │   ├── urls.cpython-38.pyc
│   │   │   └── wsgi.cpython-38.pyc
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── lossCommunication
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── __init__.py
│   │   ├── migrations
│   │   │   ├── 0001_initial.py
│   │   │   ├── 0002_alter_producer_cpf_alter_producer_email.py
│   │   │   ├── 0003_alter_producer_cpf_alter_producer_email.py
│   │   │   ├── __init__.py
│   │   │   └── __pycache__
│   │   │       ├── 0001_initial.cpython-38.pyc
│   │   │       ├── 0002_alter_producer_cpf_alter_producer_email.cpython-38.pyc
│   │   │       ├── 0003_alter_producer_cpf_alter_producer_email.cpython-38.pyc
│   │   │       └── __init__.cpython-38.pyc
│   │   ├── models.py
│   │   ├── __pycache__
│   │   │   ├── admin.cpython-38.pyc
│   │   │   ├── apps.cpython-38.pyc
│   │   │   ├── __init__.cpython-38.pyc
│   │   │   ├── models.cpython-38.pyc
│   │   │   ├── serializers.cpython-38.pyc
│   │   │   ├── urls.cpython-38.pyc
│   │   │   └── views.cpython-38.pyc
│   │   ├── serializers.py
│   │   ├── tests.py
│   │   ├── urls.py
│   │   └── views.py
│   ├── manage.py
│   └── requirements.txt
├── frontend
│   ├── package.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── README.md
│   ├── src
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── components
│   │   │   ├── Content.js
│   │   │   ├── Footer.js
│   │   │   ├── Header.js
│   │   │   └── SearchBar.js
│   │   ├── context
│   │   │   └── Provider.js
│   │   ├── images
│   │   │   ├── banner-21.jpg
│   │   │   ├── Frame-2.png
│   │   │   └── softfocus.svg
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── logo.svg
│   │   ├── pages
│   │   │   ├── Home.js
│   │   │   ├── Register.js
│   │   │   └── Search.js
│   │   ├── reportWebVitals.js
│   │   ├── setupTests.js
│   │   └── styles
│   │       ├── Home.module.css
│   │       ├── index.js
│   │       ├── Register.module.css
│   │       ├── SearchBar.module.css
│   │       └── Search.module.css
│   └── yarn.lock
└── README.md
```
</details>

## Funcionalidades

### Backend

  O backend está dividido nas rotas abaixo:

  #### GET /events

  Busca os eventos cadastrados no banco de dados.

  #### GET /producer

  Busca os registros de comunicação de perda existentes no banco.

  #### GET /producer/:cpf

  Busca os registros de comunicação de perda existentes no banco com base no CPF do produtor.

  #### POST /producer

  Adiciona um novo registro de perda ao banco de dados.

  Espera receber o corpo da requisição com o formato:
  ```
  {
    fullName: string,
    email: string,
    cpf: string,
    lastCrop: 'YYYY-MM-DD',
    location: 'latitude,longitude',
    type: string,
    event: foreignKey,
  }
  ```

  #### PUT /producer/get/:id

  Atulaliza a comunicação de perda com base no id do registro.

  Espera receber o corpo da requisição com o formato:
  ```
  {
    fullName: string,
    email: string,
    cpf: string,
    lastCrop: 'YYYY-MM-DD',
    location: 'latitude,longitude',
    type: string,
    event: foreignKey,
  }
  ```

  #### DELETE /producer/delete/:id

  Remove o registro de comunicação de perda com base no id do mesmo.

### Frontend

Ao iniciar a aplicação a página principal possui um link que redireciona o usuário à página principal da Softfocus.
<br />
<br />
No header da aplicação existem três links, no primeiro a pessoa usuária é redirecionada para a página principal da aplicação. O segundo é utilizado para cadastrar uma comunicação de perda. O terceiro é utilizado para que a pessoa usuária possa visualizar os registros cadastrados e filtrar os registros com base no cpf do produtor além de editar e deletar os registros.
<br />
<br />
Na página de registro, a pessoa usuária não consegue realizar um cadastro com um email de formato inválido nem com um número de cpf inválido.
<br />
Se forem reportados mais de uma comunicação de perda ocorrida em um mesmo dia e em um raio de 10km cujos eventos forem divergentes, a pessoa usuária receberá um aviso informando o registro existente, a localização e o evento registrado.

## Tecnologias utilizadas

* Python
* Django
* React
* Context API
* Styled components
* PostgreSQL

## Rodando o projeto

Para rodar a aplicação localmente, inicialmente faça o clone da aplicação:

```
git clone git@github.com:DeboraSerra/softfocus.git
```

Em seguida, vá até o diretório do frontend:
```
cd ./frontend
```

E rode os comandos abaixo:
```
yarn install
yarn start
```

Ou acesse o [link](https://proagro.vercel.app/)

Pronto! A aplicação está funcionando e já podem ser cadastradas as comunicações de perda!
