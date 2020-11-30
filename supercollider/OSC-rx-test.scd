b = NetAddr("127.0.0.1", 57121);
b.sendMsg("/get/bike_loans", 10, 11, 2020, 11, 11, 2020);

(
~listener = {|msg|
	if (msg[0] == "/error", {
		("Request error: " + msg[1]).postln;
	});

	if (msg[0] == "/bike_loans", {
		("First bike loan: " + msg[1] + " (Loan Latitude), " + msg[2] + " (Loan Length), " + msg[3] + " (Return Latitude), " + msg[4] + " (Return Length)").postln;

	});
};
)

//			{ HenonC.ar(500, LFNoise2.kr([1, 3], 0.2, 1.4), 0.14) * 0.2 }.play(s);

(
OSCdef(\dinger,
    {
        |msg|
        {Pulse.ar(msg[1],rrand(0.01,0.5),0.3)!2 * EnvGen.ar(Env.perc,doneAction:2)}.play
}, '/ding')
)
//make a 900Hz ding
b.sendMsg("/ding",900);
//make a ding at a random pitch
b.sendMsg("/ding",rrand(100,2000))