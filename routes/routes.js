const express = require("express");
const axios = require("axios");

const router = express.Router();

const rootURL = `https://rickandmortyapi.com/api/character/`

router.use(async (req,res,next)=>{
    const characters = [];
    try{
        const pagesRaw = await axios(rootURL);
        const {info:{pages}} = pagesRaw.data; 

        for (let index = 1; index <= pages; index++) {
            const charsRaw = await axios(`${rootURL}?page=${index}`);
            const {results} = charsRaw.data;

            const infoScrap = ["name","status","species","gender","origin","image"]  
            const filtredResults = results.map((char)=>infoScrap.reduce((prev, curr) => {
                    prev[curr] = char[curr];
                    return prev;
                },{})
            )

            characters.push(...filtredResults);        
        }
    }catch(error){
        res.status(404).json({error:"Fallo al conectar"});
    }
    res.locals.characters=characters;
    next();
})

router.get("/characters", (req,res)=>{
    const {characters} = res.locals;
    res.status(200).json(characters)
})

router.get("/characters/:name",(req,res)=>{
    const {characters} = res.locals;
    const charName = req.params.name;

    const character = characters.find((char)=>char.name.toLowerCase()===charName.toLowerCase());

    if(!character)res.status(404).json({error:"Personaje no encontrado"});
    else res.status(202).json(character);

})

router.get("/names",(req,res)=>{
    const {characters} = res.locals;

    const charNames = characters.map((char)=>char.name);

    res.status(202).json({chars:charNames});
})

module.exports = router;