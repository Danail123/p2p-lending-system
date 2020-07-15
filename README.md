A plce where people who want to lend money meet people who want to borrow!

## Setup

*  create a database in MySQL Workbench. The default name is **tick42** and if you would like to rename it it, you must change it the .env config file

1. Create **.env** file.   

        PORT=3000
        DB_TYPE=mysql
        DB_HOST=localhost
        DB_PORT=3306
        DB_USERNAME=root
        DB_PASSWORD=likliklik
        DB_DATABASE_NAME=tick42
        JWT_SECRET=!likliklik!

2. Install dependencies.

        $ npm install


3. Create **ormconfig.json**.
```
{
    "syncronize": false,
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "likliklik",
    "database": "tick42",
    "entities": [
        "src/database/entities/**/*.ts"
    ],
    "migrations": [
        "src/database/migration/**/*.ts"
    ],
    "cli": {
        "entitiesDir": "src/database/entities",
        "migrationsDir": "src/database/migration"
    }
}
```
4. Start the server in **/api** directory

        $ npm run start:dev 

5. Start the client in **/cliend** directory  

         $ ng serve

