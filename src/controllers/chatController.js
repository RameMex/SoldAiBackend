import chatServices, { botService,messageToClient,pokemonService } from "../services/chatServices";
import {routes} from '../routes/chat'

module.exports = (io,socket) =>{
    const Message = async (ctxPokemon,ctxTopic,payload,callback) =>{
        try {
            const bot = await botService(payload.message);
            if(bot.intentName == 'ContextoTopicos') bot.intentName = ctxTopic;
            const {message,pokemonNames} = await messageToClient(bot,ctxPokemon,ctxTopic);
            callback( pokemonNames[0],bot.intentName,{
                id: Date.now,
                userName: 'BotSoldAI',
                message: message,
                pokemon: pokemonNames,
            })
        } catch (error) {
            const messageServerError = 'Problemas con el api o la informacion hacia el bot'
            callback( '','',{
                id: Date.now,
                userName: 'BotSoldAI',
                message: messageServerError,
                pokemon: '',
            })
        }
        

        
        
        
    }

    const Disconnect = (payload) =>{
        console.log('Desconectado');
    }
    // routes del socket io
    socket.on(routes.Disconnect,Disconnect);
    socket.on(routes.MessageRoute,Message);
}
