## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# run postgres and pgadmin docker container
$ docker compose up

# run migrations 
$ npx prisma migrate deploy

# run application
$ npm run start:dev
```
