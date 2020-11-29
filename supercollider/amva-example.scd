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

thisProcess.addOSCRecvFunc(~listener);
)