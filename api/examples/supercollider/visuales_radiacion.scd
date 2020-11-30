s.boot//iniciar supercollider

OSCdef.all//habilitar entrads OSC
//hacer el request
m= NetAddr("127.0.0.1", 57121);//IP y puerto por el que envio las cosas

m.sendMsg("/uv_radiation/today", 2526);

m.sendMsg("/uv_radiation/yesterday", 10104);

//recibir OSC
NetAddr.new("127.0.0.1",57120);//IP y puerto por el que me van a llegar las cosas

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
		x.set(\freq,msg[1].asFloat*100 + 200);

		l = msg[1];
		r = msg[1];
		k = msg[2];
		j = msg[3];

	},
	'/uv_radiation' //ruta el nombre del mensaje que me envian

);
)

(

var particleEngine = {arg width, height, distance, counter;
	(width/distance + l).floor.do{arg ix;
		(height/distance + l).floor.do{arg iy;
			var x,y;
			var color, radius, xoffset, yoffset;
			color = Color(sin(counter+r+50).abs,cos(counter+r-50).abs,sin(counter + r+10).abs);
			radius = sin((ix+1) * (iy+1) * (counter/20+l)).abs * 8 + l;
			xoffset = cos((ix) * (iy) * (counter/19*k)).abs * 157;
			yoffset = sin((ix) * (iy) * (counter/8*l)).abs * 78;
			x = (distance/2+l) + (ix * distance) + xoffset + k;
			y = (distance/2+l) + (iy * distance) + yoffset - j;
			Pen.fillColor_(color);
			Pen.push;
			Pen.rotate(2pi.rand,x+l,y);
			Pen.addArc(x@y,radius,9pi.rand + k,8pi.rand2 + l);
			Pen.fill;
			Pen.pop;

		};

	};

};

var windows = Window("UV_radiation_MED", 640@640).front;
var userView = UserView(windows,640@640).background_(Color.black).animate_(true).frameRate_(60).drawFunc_({
	var counter = tan(userView.frame / 7578 + k +l).abs;
	particleEngine.value(640+l,640+l,70,counter + l );
});

)

(
SynthDef(\melodi,{|gate=1,freq=40| //aca se ponen los argumentos que se pueden modificar por OSC
	//Esta es la creacion del sinte puede ser algo mas sencillo dependiendo
	var envo,onda,noti;
	envo= (EnvGen.kr(Env.perc(0,240),gate,doneAction:2));
	noti= Pulse.ar(freq,0.3,0.5);
	onda =(RLPF.ar(noti,LFNoise0.kr(12,3900,4100),LFNoise0.kr(6,0.3,0.3)));
Out.ar(0,Pan2.ar(envo*onda,SinOsc.kr(1),0.5))}).send(s);

SynthDef(\ondas,{|freq,volumen|
	var onda,envo;
	onda=SinOsc.ar(freq,mul:volumen);
	envo=EnvGen.kr(Env.perc(0.01,1,volumen));
	(Out.ar(0,Pan2.ar(onda*envo,0,volumen)));
}).send(s);

Tdef(\rray).quant_(4).play;
x=Synth(\melodi,[\freq]);

)


Synth(\ondas)

(
p=[69,60,62,64,67,69,60,62,64,67,69,72];
v=[0.3,0.5,0.7,0.9,1];
Tdef(\rray,{
	inf.do{
		(p.size).do{Synth(\ondas,[\freq,p.midicps.choose*[l,k,j+87].choose,\volumen,v.choose]);
			1.wait};
		(p.size).do{Synth(\ondas,[\freq,p.midicps.choose*[l,k,j+87].choose,\volumen,v.choose]);
			0.5.wait};
		(p.size).do{Synth(\ondas,[\freq,p.midicps.choose*[l,k,j+87].choose,\volumen,v.choose]);
			0.25.wait};
		(p.size).do{Synth(\ondas,[\freq,p.midicps.choose*[l,k,j+87].choose,\volumen,v.choose]);
			0.125.wait};
}})
)


Tdef(\rray).stop


 //le doy play al sinte

x.free // paro el sinte