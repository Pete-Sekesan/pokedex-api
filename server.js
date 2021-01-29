const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = 8080;
const POKEDEX = require("./pokedex.json");
const validTypes = [
  `Bug`,
  `Dark`,
  `Dragon`,
  `Electric`,
  `Fairy`,
  `Fighting`,
  `Fire`,
  `Flying`,
  `Ghost`,
  `Grass`,
  `Ground`,
  `Ice`,
  `Normal`,
  `Poison`,
  `Psychic`,
  `Rock`,
  `Steel`,
    `Water`,
];


app.use(morgan('dev'));
app.use(validateBearerToken);
app.use(cors());
app.use(helmet());

 app.get('/types', handleGetTypes);
app.get("/pokemon", handleGetPokemon);



function validateBearerToken(req, res, next) {
    const authToken = req.get("Authorization");
    const apiToken = process.env.API_TOKEN;
    
    if (!authToken || authToken.split(" ")[1] !== apiToken) {
        return res.status(401).json({error: 'Unauthorized Request'});
    }
    next();
}
  
function handleGetTypes(req, res) {
    res.json(validTypes);

}

function handleGetPokemon(req, res) {
    let response = POKEDEX.pokemon;

    if (req.query.name) {
        response = response.filter(pokemon => {
           return pokemon.name.toLowerCase().includes(req.query.name.toLowerCase())
        })
    }

    if (req.query.type) {
      response = response.filter(pokemon => {
        return pokemon.type.includes(req.query.type);
      });
    }

    res.json(response);
}

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
});



