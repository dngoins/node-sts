const express = require('express');
const bodyParser = require('body-parser');
const OAuth2Server = require('oauth2-server');
const apiRoutes = require('./routes/api');
const swaggerSetup = require('./swagger');

const dotenv = require('dotenv');
const port = 3001;

// Other middleware and routes
dotenv.config();

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', apiRoutes);

swaggerSetup(app);

app.get('/', (req, res) => {
  res.send('<div><h1>Node-STS-OAuth2 Server</h1><p>This is a local weak implementation of OAuth2 Server for demonstration purposes only</p></div>');
});


app.listen(port, () => {
    console.log(`Oauth2 Server is running on http://localhost:${port}`);
  });
  