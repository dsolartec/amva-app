/*n = NetAddr("127.0.0.1", 57121);
n.sendMsg("/uv_radiation/today", 120);

(
~listener = {|msg|
	if (msg[0] == "/error", {
		("Request error: " + msg[1]).postln;
	});

	if (msg[0] == "/uv_radiation", {
		("First bike loan: " + msg[1] + " (Loan Latitude), " + msg[2] + " (Loan Length), " + msg[3] + " (Return Latitude), " + msg[4] + " (Return Length)").postln;
	});
};

thisProcess.addOSCRecvFunc(~listener);
)*/

/*OSC_SERVER_HOST=127.0.0.1
OSC_SERVER_PORT=57121

OSC_CLIENT_HOST=127.0.0.1
OSC_CLIENT_PORT=57120

API_HOST=127.0.0.1
API_PORT=5000*/




s.boot//iniciar supercollider
OSCdef.all//habilitar entrads OSC
//hacer el request
m= NetAddr("127.0.0.1", 57121);//IP y puerto por el que envio las cosas

m.sendMsg("/uv_radiation/today", 3000);

m.sendMsg("/uv_radiation/yesterday", 3000);

m.sendMsg("/sightings/today", 3000);

m.sendMsg("/sightings/yesterday", 3000);

m.sendMsg("/sightings/last_week", 300);





//recibir OSC
NetAddr.new("127.0.0.1",57120);//IP y puerto por el que me van a llegar las cosas
OSCdef.freeAll// soltar todos los OSC


//Creo una definicion de OSC
(
OSCdef.new(
	\radiation,//nombre de mi boton
	{

		arg msg, time, addr, port;

		/*[msg, time, addr, port].postln;*/
		[msg[0]].postln;
		[msg[1]].postln;
		[msg[2]].postln;
		[msg[3]].postln;//imprimo lo que me llega para ir viendo, pero esto se puede comentar

		/*x.set(\freq,msg[1].asFloat*1000);*/ //parametro a modificar del sinte, en este caos es freq;
	},
	'/uv_radiation' //ruta el nombre del mensaje que me envian

);

OSCdef.new(
	\sightings,//nombre de mi boton
	{

		arg msg, time, addr, port;

		/*[msg, time, addr, port].postln;*/
		[msg[0]].postln;
		[msg[1]].postln;
		[msg[2]].postln;
//imprimo lo que me llega para ir viendo, pero esto se puede comentar

		x.set(\freq,msg[1].asFloat*1000); //parametro a modificar del sinte, en este caos es freq;
	},
	'/sightings' //ruta el nombre del mensaje que me envian

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