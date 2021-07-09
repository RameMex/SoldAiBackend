import fetch from 'node-fetch';
const statsList = ['HP', 'Ataque', 'Defensa', 'Ataque Especial', 'Defensa Especial', 'Velocidad'];
const topics = {
    estadisticas:'Estadisticas',
    habilidades: 'Habilidades',
    movimientos: 'Movimientos',
    peso: 'Peso',
    altura: 'Altura',
    tipos:'Tipos' 
}
export const botService = async (message) =>{
    try {
        const res = await fetch('https://beta.soldai.com/bill-cipher/askquestion?session_id=1903135173030124&key=a118b5e9f5cb222d8c0d174b2602048e000bed5f&log=1&question='+message);
        const response = await res.json()
        const intentName = response.current_response.intent_name;
        const name = response.current_response.parameters.entities;
        const messageServer = response.current_response.message;

    return {intentName,name,messageServer};
        
    } catch (error) {
        const messageServerError = 'Problemas con el api o la informacion hacia el bot'
        console.log(error)
        return messageServerError
    }
    
    
}
export const pokemonService = async (pokemonData,pokemonName,mensaje,multiplePokemons) =>{
    let data = '';

    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonName)
                    .then(res => res.json());
    if(pokemonData == topics.estadisticas){
        const stats = response.stats;
        data = mappingValue(stats,topics.estadisticas);
        if(multiplePokemons) mensaje ='';
        const messageResponse  = mensaje + data;
        const topic = topics.estadisticas;
        
        return {messageResponse,topic}
    }
    if(pokemonData == topics.habilidades){
        const abilities = response.abilities;
        data = mappingValue(abilities,topics.habilidades);
        if(multiplePokemons) mensaje ='';
        const messageResponse  = mensaje + data;
        const topic = topics.habilidades;

        return {messageResponse,topic}
    }
    if(pokemonData == topics.movimientos){
        const moves = response.moves;
        data = mappingValue(moves,topics.movimientos);
        if(multiplePokemons) mensaje ='';
        const messageResponse  = mensaje + data;
        const topic = topics.movimientos;

        return {messageResponse,topic}
    
    }
    if(pokemonData == topics.peso){
        const weight = response.weight;
        if(multiplePokemons) mensaje ='';
        const messageResponse  = mensaje + weight;
        const topic = topics.peso;

        return {messageResponse,topic}
    
    }
    if(pokemonData == topics.altura){
        const height = response.height;
        if(multiplePokemons) mensaje ='';
        const messageResponse  = mensaje + height;
        const topic = topics.altura;

        return {messageResponse,topic}
    
    }
    if(pokemonData == topics.tipos){
        const types = response.types;
        data = mappingValue(types,topics.tipos);
        if(multiplePokemons) mensaje ='';
        const messageResponse  = mensaje + data;
        const topic = topics.tipos;

        return {messageResponse,topic}
    
    }
    return 'Hay un problema';
    
}

export const mappingValue= (obj,dataType) =>{
    let data = '';
    if(dataType == topics.estadisticas){
        for(let i = 0; i < obj.length; i++ ){
            data = data + ((obj.length - 1) == i  ? ' y ' : '') + statsList[i] + ' : ' + obj[i].base_stat + ((obj.length - 2) == i  || (obj.length - 1) == i ? '' : ', ');
        }
    }
    if(dataType == topics.habilidades){
        for(let i = 0; i < obj.length; i++ ){
            data = data + ((obj.length - 1) == i  ? ' y ' : '')  + obj[i].ability.name + ((obj.length - 2) == i  || (obj.length - 1) == i ? '' : ', ');
        }
    }
    if(dataType == topics.movimientos){
        for(let i = 0; i < obj.length; i++ ){
            data = data + ((obj.length - 1) == i  ? ' y ' : '')  + obj[i].move.name + ((obj.length - 2) == i  || (obj.length - 1) == i ? '' : ', ');
        }
    }
    if(dataType == topics.tipos){
        for(let i = 0; i < obj.length; i++ ){
            data = data + ((obj.length - 1) == i  ? ' y ' : '')  + obj[i].type.name + ((obj.length - 2) == i  || (obj.length - 1) == i ? '' : ', ');
        }
    }
    return data
}

export const multiplePokemonsNames = () =>{

}

export const messageToClient = async (bot) =>{

    let message = '';
    let pokemonNames = [];
    const multiplePokemons = bot.name.length > 1
    for (const key in bot.name) {
        console.log(bot.name[key].name)
        pokemonNames.push(bot.name[key].name.toLowerCase());
        const pokeApi = await pokemonService(bot.intentName,pokemonNames[key],bot.messageServer,multiplePokemons);
        message = message + pokeApi.messageResponse;
    }
    if(multiplePokemons){
        if(topics.estadisticas == bot.intentName  ) message = 'Las estadisticas son '  + message;
        if(topics.habilidades == bot.intentName )  message = 'Las habilidades son '  + message;
        if(topics.movimientos == bot.intentName )  message = 'Los movimientos son '  + message;
        if(topics.peso == bot.intentName )  message = 'Los pesos son '  + message;
        if(topics.altura == bot.intentName )  message = 'Las alturas son '  + message;
        if(topics.tipos == bot.intentName )  message = 'Los tipos son '  + message;
    }

    return {message,pokemonNames}
}
