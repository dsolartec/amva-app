(
s.boot;
(
m= NetAddr("127.0.0.1", 57121);//IP y puerto por el que envio las cosas
o= NetAddr("127.0.0.1", 57121);
NetAddr.new("127.0.0.1",57120);
);
//Velocidad frame
(
v = 4000;
m.sendMsg("/uv_radiation/yesterday", v);
/*o.sendMsg("/sightings/last_week", v);*/
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
		r = msg[1].abs.explin(0.04,13,0.3,1);//Rojo
		g = msg[1].abs.explin(0.04,13,0.8,0.1); // Verde
		b = msg[1].abs.explin(0.04,13,0.1,0.8); // Azul
		d = msg[1].abs.explin(0.04,13,220,30); //Distancia Circulos
		a = msg[1].abs.explin(0.04,13,2,10);// Tamaño circulo
		n = msg[1].abs.explin(0.04,13,5,20);//cremiciento por radiación
		p = msg[2].abs.explin(6.1,6.3,1,3);//angulo rotación
		t = msg[1].abs.explin(0.04,13,6,20);
		e = msg[1].abs.explin(6.1,6.3,45,1);//RotarX
		f = msg[2].abs.explin(75,75.6,1,30);//RotarY
		i = msg[1].abs.explin(0.04,13,4,20);//Temblor de particulas
		c = msg[1].abs.explin(0.04,15,48,52);//nota uno
		k = msg[1].abs.explin(0.04,15,56,61);//nota dos
		h = msg[1].abs.explin(0.04,15,66,72);//nota tres
		j = msg[1].abs.explin(0.04,15,62,72);//nota tres
		/*w.set(\acordes,[c,k,h].midicps,\am,1);
		u.set(\acordes,[c,k,h].midicps*(24).midiratio);
		("Acorde que suena en notas midi es: " + c + "-" + k + "-" + h).postln*/ //modificar el audio de manera correcata


		//Modificaición de audio actual desordenada
		w.set(\acordes,[msg[1].abs.explin(0.04,15,48,56),msg[1].abs.explin(0.04,15,57,60),msg[1].abs.explin(0.04,15,60,69)].midicps*(24).midiratio,\am,1);
		u.set(\acordes2,[msg[1].abs.explin(0.04,8,62,70)].midicps);

	},
	'/uv_radiation' //ruta el nombre del mensaje que me envian

);

)

( // Particulas animadas
var particulasUV = { arg width, height, d, counter;
	(width/d).floor.do{arg ix;
		(height/d).floor.do{arg iy;
			var x,y; // Posición
			var color, radius, xoffset, yoffset;

			color = Color.new(r,g,b); // Poner color
			radius = a + n; // Radio del circulo
			xoffset = 0; // Mover  IZ o Dr
			yoffset = 0; // Mover Arriba o Abajo
			x = (d/2) + (ix * d) + xoffset; //Posición en x de las partiuclas
			y = (d/2) + (iy * d) + yoffset; //Posición en y de las partiuclas
			Pen.fillColor_(color);// Color de las particulas
			Pen.push;//Dibuje la particula
			Pen.rotate(i.rand,x + t,y+ t);//Rotacion de particula
			Pen.addArc(x@y,radius,3pi.rand + e,2pi.rand * t + f);
			Pen.fill;
			Pen.pop;
		};
	};
};

var window = Window("Radiacion_UV_Medallo", 1280@960).front;
var userView = UserView(window, 1280@960).background_(Color.gray(1,1)).animate_(true).frameRate_(30).drawFunc_({
	var counter = tan(userView.frame / 30).abs; // Contardor que no se uso
	particulasUV.value(1280,960,d,counter);  counter
});
)

(
SynthDef(\string , {|gate=1,acordes,am=1|
	var onda,envo;
	envo= EnvGen.kr(Env.dadsr(0.1,1,0.1,1,1,0.6,-4),gate,doneAction:1);
	onda= RLPF.ar(SinOsc.ar(acordes,0,SinOsc.ar(am,0,LFNoise0.kr(1,1),0)),LFNoise0.kr(12,3900,4100),LFNoise0.kr(6,0.4,0.4));
Out.ar(0,Pan2.ar(envo*onda,0,0.3))}).send(s);
w= Synth(\string);

SynthDef(\string2 , {|gate=1,acordes2,am=2|
	var onda,envo;
	envo= EnvGen.kr(Env.dadsr(0.01,0.9,0.1,0.2,0.8,0.6,-4),gate,doneAction:1);
	onda= RLPF.ar(SinOsc.ar(acordes2),LFNoise0.kr(12,3900,4100),LFNoise0.kr(6,0.3,0.3));
Out.ar(0,Pan2.ar(envo*onda,0,0.3))}).send(s);
u= Synth(\string2);
)