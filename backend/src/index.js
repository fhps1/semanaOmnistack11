const express = require('express');
const routes = require('./routes')
const cors = require('cors');
//criando aplicativo express
const app = express();

app.use(cors);
app.use(express.json());
app.use(routes);

//porta, abrir no navegador localhost:3333
app.listen(3333);

