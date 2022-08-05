# TODO app - server API

### Start

Linux:

1. install **Postgresql**: `sudo apt install postgresql`
2. switch to a **postgres** user: `sudo -iu postgres` (or `su postgres` under the **root**)
3. connect to the CMD: `psql`
4. create a new database: `CREATE DATABASE todo_db;`
5. connect to this db: `\c todo_db;`
6. initialize db data following `src/db/init.sql` (skip **CREATE DATABASE** instruction)
7. exit from CMD
8. copy `.env.example` content to `.env` and fill missing values (change default values if necessary)
9. start the server: `npm run start`

### Routes

- POST `users/login`: user login. Only admin available
- POST `users/auth`: authentitication
- GET `tasks/all`: return an array of all tasks (sorted by tasks id)
- GET `tasks/:id`: return a task with `:id`
- POST `tasks/new`: create a new task
- PATCH `tasks/:id`: update a task with `:id`
- DELETE `tasks/:id`: delete a task with `:id`

### TODO

- [ ] improve response formats
- [ ] save users session, so the user don't need to login every time
- [ ] correct EMAIL regexp to block emails with length more than 255 chars
