Hola!
Te voy a contar como ejecutar el codigo llamado visuales_animate.scd o UV_radiation_sound2.scd

Cuando abras cualquiera de los dos codigos lo mas importante es ejecutar de primero el siguinte 
fragmento:

(
s.boot;
(
m= NetAddr("127.0.0.1", 57121);//IP y puerto por el que envio las cosas
o= NetAddr("127.0.0.1", 57121);
NetAddr.new("127.0.0.1",57120);//IP y puerto por el que recibo las cosas
);


Estos nos ayuda a ejecutar el servidor, es decir prender superocllider para que suene
puedes verificar viendo en la parte inferior de SC uno numeros en verde que antes estaban blancos.
Tambien los sirve para crear el canal y puerto de comunicaicon OSC, es importate saber
por cual recibimos y por cual enviamos información.


Luego de ejecutar el bloque , lo siguiente que debes ejecutar es la definicion de OSC

(
OSCdef.new(
	\radiation,//nombre de mi boton
	{

		arg msg, time, addr, port;
		/*[msg, time, addr, port].postln;*/
		[msg[0]].postln;
		[msg[1]].postln;
		[msg[2]].postln;
		[msg[3]].postln; 

	},
	'/uv_radiation' //ruta el nombre del mensaje que me envian(recibo)

);

Este bloque es importane para reconocer las vairables que nos entrar por OSC
en este lugar es donde asiganmos a una variable lo que viene por OSC, podemos mapearla usando algunso metodos como
explin, expexp entreo otros
ejemplo:
r = msg[1].abs.explin(0.04,13,0.3,1);


Luego de tener estas dos cosas ejecutadas debemos ejecutar esto : 

el bloque de las visuales y el bloque del sonidos.

SynthDef y var window = Window("Radiacion_UV_Medallo"


y por ultimos vamos a pedir los datos  de la sigueinte manera :

(
v = 4000;//Velocidad frame
m.sendMsg("/uv_radiation/yesterday", v);//Mensaje para consultar los datos
/*o.sendMsg("/sightings/last_week", v);*/
)

Al instante empieza a sonar !!