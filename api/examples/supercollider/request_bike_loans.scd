b = NetAddr("127.0.0.1", 57121);
b.sendMsg("/get/bike_loans/last_day", 120000);

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