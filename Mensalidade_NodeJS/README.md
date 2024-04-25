# Mensalidade NodeJS

## Setup

Após dar fork no projeto ou baixar ele, execute o comando: 

```
npm i
````

- Para Instalar todos os `pacotes` e `dependências`

 Nesse projeto foi usado o **banco de dados** `PostgresSQL` para configuar ele adicione na pasta raiz  o arquivo **.env** e dentro dele insira:
````
DATABASE_URL="postgresql://USUARIO:SENHA@HOST:PORTA/DATABASE?schema=SCHEMA"
````
- Caso essa configuração não seja feita a aplicação **não irá funcionar**, por que ela precisa estar conectada com o banco de dados.

Quando você baixar o projeto seu banco de dados vai estar vazio para preencher ele com dados **falsos** use esse comando: 
````
npx prisma db seed
````

- Ele usa uma **API** (Faker.JS) que cria dados falsos para preencher o banco de dados

Logo Após pode executar o comando:

````
npm run start
````
- Para alimentar o [`Front-End`](https://github.com/R4NP3R/projeto_mensalidade/tree/main/Mensalidade_React) com dados fornecidos pelo nosso [`Back-End`](https://github.com/R4NP3R/projeto_mensalidade/tree/main/Mensalidade_NodeJS)

Comandos adicionais: 

````
npm run db:migrate
````
- Se tiver feito alguma alteração **schema.prisma** e quer que ela faça parte do projeto
````
npm run db:studio
````
- Caso queira ver as informações do banco de dados sem abrir o postgresSQL

## Documentação

Para ver a [documentação](http://localhost:3333/docs/) com swagger do [`Back-End`](https://github.com/R4NP3R/projeto_mensalidade/tree/main/Mensalidade_NodeJS) pode ser acessado pelo Link:

````
http://localhost:3333/docs/
````
