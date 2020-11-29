s.boot//iniciar supercollider
OSCdef.all//habilitar entrads OSC
//hacer el request
m= NetAddr("127.0.0.1", 57121);//IP y puerto por el que envio las cosas
m.sendMsg("/uv_radiation/today", 100);
/m.sendMsg("/uv_radiation/yesteerday", 120);/
//recibir OSC
NetAddr.new("127.0.0.1",57120);//IP y puerto por el que me van a llegar las cosas
OSCdef.freeAll// soltar todos los OSC


//Creo una definicion de OSC
(
OSCdef.new(
	\prueba,//nombre de mi boton
	{

		arg msg, time, addr, port;

		/[msg, time, addr, port].postln;/
		[msg[0]].postln;
		[msg[1]].postln;
		[msg[2]].postln;
		[msg[3]].postln;//imprimo lo que me llega para ir viendo, pero esto se puede comentar

		x.set(\freq,msg[1].asFloat*1000); //parametro a modificar del sinte, en este caos es freq;
	},
	'/uv_radiation' //ruta el nombre del mensaje que me envian

);
)

//creo un sinte
(
SynthDef(\melodi,{|gate=1,freq=40| //aca se ponen los argumentos que se pueden modificar por OSC
	//Esta es la creacion del sinte puede ser algo mas sencillo dependiendo
	var envo,onda,noti;
	envo= (EnvGen.kr(Env.perc(0,240),gate,doneAction:2));
	noti= Pulse.ar(freq,0.3,0.5);
	onda =(RLPF.ar(noti,LFNoise0.kr(12,3900,4100),LFNoise0.kr(6,0.3,0.3)));
Out.ar(0,Pan2.ar(envo*onda,SinOsc.kr(1),0.5))}).send(s);
)

x=Synth(\melodi,[\freq]); //le doy play al sinte

x.free // paro el sinte