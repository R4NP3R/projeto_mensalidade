# Projeto de Mensalidade

## **Ideia Inicial**

Fiz esse programa baseado em um projeto da Rocketseat feito em uma NLW, porém decidir mudar algumas lógicas de negócio e adicionar coisas na base do projeto, a idéia que eu tive foi:
**"Como o professor de uma academia sabe se o aluno pagou a mensalidade, sendo que ele não tem nenhum tipo de controle"**, então decidi criar esse site para controle de mensalidade de clientes, baseado na ideia de ajudar no gerenciamento de pagamentos atrasados, é um projeto simples, e por enquanto manual mas futuramente podendo escalar para algo mais automatizado.

## **Tecnologias**

### [`Front-End`](https://github.com/R4NP3R/projeto_mensalidade/tree/main/Mensalidade_React)
- **React**
- **React Query**
- **Axios**
- **TailwindCSS**
- **Motion-Framer**
- **React Hook Forms**
- **Zod**

A parte do `Front-End` foi feita com `React` usei essa **Biblioteca**, porquê além de ser usada no projeto do evento da NLW é a que eu tenho mais conhecimento dentro do desenvolvimento `Front-End`. E para gerenciamento de requisições **REST** eu decidi usar o `React Query` e o `Axios`, na estilização do projeto decidi usar o `TailwindCSS` por que não é necessário criar arquivos de css separado para estilização e é bem fácil de entender, em animações simples usei a biblioteca `Motion Framer`, no gerenciamento dos formulários usei `React-Hook-forms` e `Zod` para validação dos dados

### [`Back-End`](https://github.com/R4NP3R/projeto_mensalidade/tree/main/Mensalidade_NodeJS)

- **Node.JS**
- **Fastify**
- **Prisma**
- **Zod**


O `Back-End` foi feito com `Node.JS` no começo pretendia usar `Java`, porém vi que o desenvolvimento com `Node.JS` é mais rápido então decidi usar essa ferramenta para o desenvolvimento da aplicação. E como **Framework** decidi usar o `Fastify` pela facilidade de criar rotas no `Back-End`, no começo estava pensando em fazer uma aplicação com driver nativo, só que meu conhecimento em **SQL** é básico então eu teria que aprender a desenvolver em `Node.JS` e melhorar meu conhecimento em **SQL** e no momento eu precisava de agilidade e como no projeto base da rocketseat foi usado a **ORM** Prisma, eu optei por usar também para facilitar na criação do `Back-End`. Para validação de dados também usei o `zod` no `Back-End`
