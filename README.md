# altisima_scoreboard
keep your altisima's games tracked

App developed with React for the frontend, Express for the backend and MongoDB.

[![wakatime](https://wakatime.com/badge/user/52fea420-cbe4-4ed2-96b9-796155f63dad/project/3ea4383e-6d64-4062-8572-48ae39fbeca9.svg)](https://wakatime.com/badge/user/52fea420-cbe4-4ed2-96b9-796155f63dad/project/3ea4383e-6d64-4062-8572-48ae39fbeca9)

## TODO

- Evitar que se repita username y email cuando se van a registrar. backend
- Displayear ui y cablear todo lo de "asociar jugador".  backend/frontend
- Encriptar contraseñas. backend
- Cablear los botones del anotador con el global state de cada ronda. frontend
	- Una vez terminado esto hay que ver lo de guardar ronda en db. backend
		- Y una vez terminado esto clablear todo lo necesario para la finalizacion del 		juego. backend/frontend
- Modal(tranqui) para mostrar player details. frontend
- Proteger determinadas rutas de quienes no estan logueados. backend
- Mejorar el manejo de errores en register y login. backend/frontend
- Cablear "recordar usuario". frontend
- No hay nada en la pagina de todas las partidas. 
	- Displayear lista de todas las partidas frontend
	- Modal para mostrar detalles de la partida frontend 

## Asociar jugador
- Si el mail del usuario ya esta registrado devolves 400
- Si el jugador no existe devolver error
- Else, caso correcto, proceder:
  - Guardar los datos del player en una variable 
  - Crear el usuario con los datos que me pasan + los datos del player
  - Una vez creado el user, borrar player.
  - Devolver 204

## Encriptar contraseñas

## Traer el anotador

## Modal juagadores y usuarios

## Consideraciones
- no se tiene que repetir ni el username ni el mail
- el identificador del usuario y del player va a ser el username

## Anotador
- el estado se va a mantener en la base de datos
  - cuando inicia la partida se crea el documento en la base de datos
  - al final de cada ronda se actualiza el estado del Game.
  - al finalizar el juego se actualiza el Game, se setea el atributo finalizado y se asignan los puntos a cada jugador. 

  - El game va a tener un id, el POST inicial tiene que devolver un id. En cada ronda vos tenes que mandar ese id.

  https://app.swaggerhub.com/apis/IVANLP10N2_1/altisima2/1.0.0#/