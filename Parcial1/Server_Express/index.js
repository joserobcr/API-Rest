const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.sendfile(__dirname+'/public/index.html');
    next();

});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});