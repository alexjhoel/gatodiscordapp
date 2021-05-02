var num = 0;
var juegos = {};
const keys = ['A1','A2','A3','B1','B2','B3','C1','C2','C3'];
const sim = ['◻','❌','⭕'];
var jugadores = {};
var count = 0;
module.exports = {
    name: 'gato',
    description: 'Jugar al gato!',
    execute(message,args,Discord){


        
        if(args[0] == 'start' && !(message.author in jugadores)){
            count++;
            juegos[count + ""] = {j1:message.author,j2:0,datos:[0,0,0,0,0,0,0,0,0],estado:0};
            jugadores[message.author] = count + "";
            return message.channel.send(message.author.username + ' ha empezado un TaTeTí, únete con !gato join ' + (count+""));
        }else if(args[0] == 'join' && !(message.author in jugadores) && args[1] != undefined && !parseInt(args[1]).isNaN && message.author != juegos[args[1]].j1 && juegos[args[1]].estado == 0){
            juegos[args[1]].j2 = message.author;
            var r = 1 + Math.round(Math.random());
            juegos[args[1]].estado = r;
            jugadores[message.author] = args[1];
            return message.channel.send(generarMensaje(juegos[args[1]]));
            
        }else if(message.author in jugadores &&
             keys.includes(args[0].toUpperCase()) &&
              juegos[jugadores[message.author]].datos[keys.indexOf(args[0].toUpperCase())] == 0 &&
              juegos[jugadores[message.author]].estado == 1 &&
               message.author == juegos[jugadores[message.author]].j1){
            juegos[jugadores[message.author]].datos[keys.indexOf(args[0].toUpperCase())] = 1;
            
            if(compruebaVictoria(juegos[jugadores[message.author]].datos,1)){
                return  message.channel.send(mensajeVictoria(juegos[jugadores[message.author]],message.author));
            }else{
                juegos[jugadores[message.author]].estado = 2;
                return message.channel.send(generarMensaje(juegos[jugadores[message.author]]));
            }
            
        }else if(message.author in jugadores &&
            keys.includes(args[0].toUpperCase()) &&
             juegos[jugadores[message.author]].datos[keys.indexOf(args[0].toUpperCase())] == 0 &&
             juegos[jugadores[message.author]].estado == 2 &&
              message.author == juegos[jugadores[message.author]].j2){
           juegos[jugadores[message.author]].datos[keys.indexOf(args[0].toUpperCase())] = 2;
           juegos[jugadores[message.author]].estado = 1;
           if(compruebaVictoria(juegos[jugadores[message.author]].datos,2)){
                 return  message.channel.send(mensajeVictoria(juegos[jugadores[message.author]],message.author));
           }else{
                juegos[jugadores[message.author]].estado = 1;
                 return message.channel.send(generarMensaje(juegos[jugadores[message.author]]));
            }
       }
    }
}
function compruebaVictoria(datos,jugador){
    return (datos[0] == jugador && datos[3] == jugador && datos[6] == jugador)||
    (datos[1] == jugador && datos[4] == jugador && datos[7] == jugador)||
    (datos[2] == jugador && datos[5] == jugador && datos[8] == jugador)||

    (datos[0] == jugador && datos[1] == jugador && datos[2] == jugador)||
    (datos[3] == jugador && datos[4] == jugador && datos[5] == jugador)||
    (datos[6] == jugador && datos[7] == jugador && datos[8] == jugador)||
    
    (datos[0] == jugador && datos[4] == jugador && datos[8] == jugador)||
    (datos[2] == jugador && datos[4] == jugador && datos[6] == jugador);
    
}

function mensajeVictoria(juego,ganador){
    var r = '';
    r += panel(juego.datos) + '\n';
    r+= 'Ganó <@'+ ganador + '>';
    jugadores = {};
    juegos = {};
    return r;
}
function generarMensaje(juego){
    var r = '';
    r += panel(juego.datos) + '\n';
    console.log(juego.datos);
    if(juego.estado == 1){
        r+= 'Turno de ' + '<@' + juego.j1 + '>';
    }else if(juego.estado == 2){
        r+= 'Turno de ' + '<@' +  juego.j2 + '>';
    }
    
    return r;
    
}
function panel(p){
    var r = '';
    var i = 0;
    for(const c of p){
        r+= sim[c] + ' ';
        
        i++;
        if(i % 3 == 0){
            r += '\n';
        }
        
    }
    return r;
}