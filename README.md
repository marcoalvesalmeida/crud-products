<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo.png" alt="Logo" width="200">
  </a>

  <h3 align="center">NodeJS/React CRUD</h3>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Sumário</summary>
  <ol>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>


<!-- GETTING STARTED -->
## Getting Started
Esse projeto foi realizado utilizando: NodeJS, ReactJS, Yarn, StyledComponents, Jsonwebtoken, Squelize, Mysql, Yup, Rocketseat Unform, Bcrypt e Vercel.

Para usar a plataforma faça seu cadastro e após faça seu login usando as crendenciais cadastradas. Na Dashboard será possível visualizar todos os produtos e categoria, cadastrar novos, editar e remover.

Para acessar a Documentação da API: https://node-react-crud.vercel.app/ 

### Prerequisites

Para começar a utilizar é necessário ter o Node instalado e também é necessário ter uma instância de banco de dados para informar no arquivo .env do seu backend. Também é necessário instalar o Yarn: 
* npm
  ```sh
  npm install --global yarn
  ```

### Installation

1. Clone o repositório
   ```sh
   git clone https://github.com/marcoalvesalmeida/crud-products-node-react.git
   ```
2. Instale os pacotes em ambas as pastas: /backend e /frontend
   ```sh
   yarn 
   ```
3. Preencha as infotmações de ambiente nos arquivos `.env` (Que devem ser criados baseando se no .env-example)
   ```JS
   KEY_EXAMPLE=EXAMPLE;
   ``