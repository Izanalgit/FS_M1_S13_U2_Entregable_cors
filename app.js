const express = require("express");
const axios = require("axios");
const cors = require("cors");

const routes = require("./routes/routes");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use("/",routes);


app.listen(PORT,()=>console.log(`Server on http://localhost:${PORT}`));