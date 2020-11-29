// set address
b = NetAddr.new("127.0.0.1",NetAddr.langPort);
// create OSCdef (very similar syntax to SynthDef)
(
OSCdef(\dinger,
    {
    // a simple function that triggers an envelope
        {Pulse.ar(1000,rrand(0.01,0.5),0.3)!2 * EnvGen.ar(Env.perc,doneAction:2)}.play
}, '/ding')
)
// Send a message with no parameters. It'll trigger the function within the OSCdef.
b.sendMsg("/ding")