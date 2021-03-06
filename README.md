# Cheguei-API

API desenvolvida do projeto "cheguei" para a disciplina de Linguagem de programação IV da FTT

- Utilizamos o framework NestJS para desenvolver a API.

## Deploy :earth_americas:

> API está publicada no serviço AppService da *azure*, para o banco de dados, utilizamos o free tier da [elephantSQL](https://www.elephantsql.com/) que oferece um serviço de pgSQL gerenciado.

- **[Swagger da API](https://cheguei-api.azurewebsites.net/docs/)** ***`PROD`***
- **[Swagger da API](https://cheguei-api-dev.azurewebsites.net/docs/)** ***`DEV`***
## Rodando o Projeto localmente :scroll:

### APP
- Instale as dependências do projeto com `npm install`
- Rode o projeto com `npm run start:dev`

### Database

- Se não tiver uma instância pgsql rodando localmente com o acesso e database conhecido, uma opção é criar com docker:
  
  `docker run --name cheguei-account-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=postgres -p 5432:5432 -d postgres:alpine`

- Crie e preencha o arquivo **.env**, de acordo com o *.env.schema* 
  >:warning: Sem as envs setadas ocorrerá erro ao tentar rodar as migrations/seeds :warning: 
- Execute as migrations e as seeds do banco de dados com:
  - **`npm run knex:migrate`**
  - **`npm run knex:seed:run`** (opcional)

---

## Instruções

O banco de dados foi populado de acordo com os scripts em `database/seeds`, usuário raíz para testar a rota de login(também pode ser criado via API):

```
{
  "username": "252.902.417-01",
  "password": "superadmin"
}
```

```
{
  "username": "103.011.320-38",
  "password": "admin"
}
```

```
{
  "username": "786.921.150-88",
  "password": "monitor"
}
```

```
{
  "username": "023.286.220-62",
  "password": "pai"
}
```

Para os demais endpoints, basta utilizar o **CNPJ** de alguma escola que pode ser obtido com um GET em `/school`

## Considerações

A API ainda está em desenvolvimento, faltam alguns endpoints e adicionar autenticação.

O "core" do nosso produto ira acontecer no dominio **`Notification`** que ainda será desenvolvido ao longo do semestre.

O step de deploy no nosso processo de CI/CD está configurado para atualizar a imagem docker (armazenada no registry da azure) que por sua vez dispara a publicação no serviço AppService (também da azure).

Optamos pelo elephantSQL como plataforma para publicar nosso banco por ser free(limitado mas free)