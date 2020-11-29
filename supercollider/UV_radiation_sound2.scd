(
s.boot;
(
m= NetAddr("127.0.0.1", 57121);//IP y puerto por el que envio las cosas
o= NetAddr("127.0.0.1", 57121);
NetAddr.new("127.0.0.1",57120);
);
//Velocidad frame
(
v = 5000;
m.sendMsg("/uv_radiation/yesterday", v);
/*o.sendMsg("/sightings/last_week", v);*/

play{CombN.ar(SinOscFB.ar(Duty.ar(4,0,Dseq(4+[c,h,k,j],inf)).midicps*[1,1.5],LFNoise0.ar(i!2,1/i,1/2),1/i),1,1/2,i)};

play{CombN.ar(SinOsc.ar(Duty.ar(4,0,Dseq(4+[c,h,k,j],inf)).midicps*[1,1.5],LFNoise0.ar(1,1),0.3),0.4,1/2,i)};

)
)

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
		i = msg[1].abs.explin(0.04,13,4,10);//velocidad notas
		c = msg[1].abs.explin(0.04,15,48,52);//nota uno
		k = msg[1].abs.explin(0.04,15,56,61);//nota dos
		h = msg[1].abs.explin(0.04,15,66,72);//nota tres
		j = msg[1].abs.explin(0.04,15,62,72);//nota cuatro


	},
	'/uv_radiation' //ruta el nombre del mensaje que me envian

);

)

(



)
