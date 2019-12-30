# Gympoint!
Aplicação desenvolvida para o Desafio final da RocketSeat, tendo como função o controle de uma academia pela plataforma web, e permitindo o usuário da academia, realizar check-ins e fazer pedidos de ajuda pelo mobile.
Tecnologias utilizadas: NodeJS, ReactJS e React Native.

## Requisitos pré-projeto

 - Node instalado
 - Yarn instalado (também pode ser o npm)
 - Git 
 - Criar um banco de dados postgre na sua máquina( se quiser use o docker: *docker run --name my-postgre -e "POSTGRES_PASSWORD=root"  -p 5432:5432 -d postgres*)
- Criar uma instância do banco redis na máquina ( se quiser utilizar o docker: *docker run --name some-redis -p 6379:6379 -d redis )*


## Configurações iniciais dos projetos

 - Realizar clone do projeto
 - Rodar o comando yarn dentro das pastas **backend, mobile e frontend** ( esse comando irá fazer a instalação das libs necessárias, pode demorar um  tempo)
 - Criar um arquivo  **.env** com todas as propriedades existentes no **.env.example** nas pastas: **backend, mobile e frontend**

## Backend
 - Necessário os bancos de dados (postgres e redis) estarem funcionando.
 - Preencher os dados referentes ao banco de dados na sua máquina e os dados do redis no arquivo **.env** criado
 - Preencher o **.env** com dados de e-mail (pode se usar o mailtrap) para utilizar o serviço de envio de e-mail.
 - Rodar o comando: **yarn sequelize db:migrate** (Comando irá criar as tabelas utilizadas pela aplicação)
 - Rodar o comando: **yarn sequelize db:seed:all** 
 - Comando acima criará: 
	 -  1 usuário administrador/senha: admin@gympoint.com/123456
	 -  3 Planos default: Gold, Start, Diamond.
	 -  1 Estudante da academia: Test Student.
 - Rodar o comando **yarn dev**.
 - Abrir outro console e rodar o  comando **yarn queue**.

## Frontend

 -  **Deve se estar com o projeto backend rodando para que seja possível buscar e enviar dados**.
 - Caso o backend esteja rodando em outra porta ou ip do que estava no **.env.example**. Alterar a propriedade *REACT_APP_API_URL* com o endereço do backend no **.env**.
 - Rodar **yarn start**.

## Mobile

 - **Mobile somente testado no Android**
 - **Deve se estar com o projeto backend rodando para que seja possível buscar e enviar dados**.
 - Caso o backend esteja rodando em outra porta ou ip do que estava no **.env.example**. Alterar a propriedade *API_URL* com o endereço do backend no .env. (Manter o */students* como sufixo da propriedade, pois todas as rotas de estudante utilizam esse complemento de rota.
 - Para utilizar o reactotron, alterar o *host* no arquivo **ReactotronConfig** dentro de src/config.
 - Rodar o comando: **yarn android** com um emulador ou um celular para rodar a aplicação conectado.
 - Caso feche o console que se conecta com o emulador/celular, rodar o comando **yarn start**



## Dados para Contato:

 - Nome: Gabriel Moraes Baptista
 - E-mail: gabriel.m.baptista@gmail.com


