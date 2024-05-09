const charSelct = document.getElementById('charNameSelect');
const charInfo = document.getElementById('character');

fetch(`http://localhost:4000/names`)
    .then((response)=>response.json())
    .then((data)=>{
        const characters = data.chars;
        let optionList = charSelct.options;

        characters.forEach((char) => optionList.add(new Option(char, char)));
        
    }).catch((error)=>console.log("Server Error ! ",error))


function getCharInfo(ALL){
    const charNmInp = document.getElementById('charName');
    const charName = charNmInp.value.toLowerCase() || charSelct.value.toLowerCase();

    charInfo.innerHTML='';

    if(ALL){
        fetch(`http://localhost:4000/characters/`)
            .then((response)=>response.json())
            .then((data)=>data.forEach((char)=>newCharDOM(char)))
            .catch((error)=>charInfo.innerHTML=`<p>FATAL ERROR</p>`)
    }else{
        fetch(`http://localhost:4000/characters/${charName}`)
            .then((response)=>response.json())
            .then((data)=>newCharDOM(data))
            .catch((error)=>charInfo.innerHTML=`<p>Personaje no encontrado!</p>`)
    }

}


function newCharDOM (char){
    const {name,status,species,gender,origin,image} = char;
      
    let newChar = document.createElement("div");
    newChar.innerHTML=`
        <h2>${name}</h2>
        <img src="${image}" alt="${name}"/>
        <p><strong>Status</strong> : ${status}</p>
        <p><strong>Specie</strong> : ${species}</p>
        <p><strong>Gender</strong> : ${gender}</p>
        <p><strong>Origin</strong> : ${origin.name}</p>  
    `
    charInfo.appendChild(newChar);
}