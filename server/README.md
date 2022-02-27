# Chronicle API

## Installation

Create an `.env` file in the `/server` directory with the following properties:

```
DATABASE_URL="mongodb://<username:<password>@<host>:<port>/<database>"
```

TODO: Add `docker-compose up` step once pipeline is complete

Then simply install and start the app

```bash
yarn
yarn start
```

To view the database in your browser:

```
npx prisma studio
```
