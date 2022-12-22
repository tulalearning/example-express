const express = require('express');
const { connect, sync } = require('./config/database');
const usersRouter = require('./routes/users');

const app = express();

const port = process.env.PORT || 9000;
const API_VERSION = process.env.API_VERSION || '/api/v1.0';

//Setup Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Setup Routers
app.use(`${API_VERSION}/users`, usersRouter);

//Connect Database
async function initializeDatabase() {
  await connect();
  await sync();
}
initializeDatabase();

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
