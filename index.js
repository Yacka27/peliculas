const express = require("express")
const {getConection} = require("./db/db-connect-mongo")
const cors = require('cors');
require('dotenv').config();

const app = express()
const port = process.env.PORT;

function fixJsonString(str) {
  const fixedStr = str.replace(/'/g, '"').replace(/(\w+):/g, '"$1":');
  return JSON.parse(fixedStr);
 }
app.use(cors());

getConection();

app.use(express.json());

app.use("/tipo", require ('./router/tipo'));
app.use("/director", require ('./router/director'));
app.use('/genero', require ('./router/genero'));





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })